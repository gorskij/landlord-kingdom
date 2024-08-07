package pl.lodz.p.it.ssbd2024.mol.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.p.it.ssbd2024.exceptions.*;
import pl.lodz.p.it.ssbd2024.exceptions.handlers.ErrorCodes;
import pl.lodz.p.it.ssbd2024.messages.ApplicationExceptionMessages;
import pl.lodz.p.it.ssbd2024.messages.LocalExceptionMessages;
import pl.lodz.p.it.ssbd2024.messages.RentExceptionMessages;
import pl.lodz.p.it.ssbd2024.messages.UserExceptionMessages;
import pl.lodz.p.it.ssbd2024.model.*;
import pl.lodz.p.it.ssbd2024.model.Application;
import pl.lodz.p.it.ssbd2024.model.Rent;
import pl.lodz.p.it.ssbd2024.mol.repositories.TenantMolRepository;
import pl.lodz.p.it.ssbd2024.mol.repositories.ApplicationRepository;
import pl.lodz.p.it.ssbd2024.mol.repositories.FixedFeeRepository;
import pl.lodz.p.it.ssbd2024.mol.repositories.LocalRepository;
import pl.lodz.p.it.ssbd2024.mol.repositories.RentRepository;
import pl.lodz.p.it.ssbd2024.model.Tenant;
import pl.lodz.p.it.ssbd2024.mol.services.ApplicationService;
import pl.lodz.p.it.ssbd2024.mol.services.MolEmailService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final RentRepository rentRepository;
    private final LocalRepository localRepository;
    private final FixedFeeRepository fixedFeeRepository;
    private final TenantMolRepository tenantRepository;
    private final MolEmailService emailServiceImpl;

    @Override
    @PreAuthorize("hasRole('OWNER')")
    public List<Application> getLocalApplications(UUID localId, UUID ownerId) {
        return applicationRepository.findByLocalIdAndLocal_OwnerId(localId, ownerId);
    }

    @Override
    @PreAuthorize("hasRole('TENANT')")
    public List<Application> getUserApplications(UUID id) throws NotFoundException {
        Tenant tenant = tenantRepository.findByUserId(id).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        return applicationRepository.findByTenantId(tenant.getId());
    }

    @Override
    @PreAuthorize("hasRole('TENANT')")
    public Application getUserApplication(UUID userId, UUID localId) throws NotFoundException {
        return applicationRepository.findByTenantUserIdAndLocalId(userId, localId).orElseThrow(() -> new NotFoundException(ApplicationExceptionMessages.NOT_FOUND, ErrorCodes.APPLICATION_NOT_FOUND));
    }

    @Override
    @PreAuthorize("hasRole('OWNER')")
    public Rent acceptApplication(UUID applicationId, UUID ownerUserId, LocalDate endDate) throws NotFoundException, InvalidLocalState, WrongEndDateException {
        LocalDate currentDate = LocalDate.now();
        if (endDate.isBefore(currentDate)
                || !endDate.getDayOfWeek().equals(DayOfWeek.SUNDAY) || endDate.equals(currentDate)) {
            throw new WrongEndDateException(RentExceptionMessages.WRONG_END_DATE, ErrorCodes.WRONG_END_DATE);
        }

        Application application = applicationRepository.findApplicationForOwner(applicationId, ownerUserId).orElseThrow(() -> new NotFoundException(ApplicationExceptionMessages.NOT_FOUND, ErrorCodes.APPLICATION_NOT_FOUND));
        List<Application> restApplications = applicationRepository.findByLocalId(application.getLocal().getId());
        Tenant tenant = application.getTenant();
        Owner owner = application.getLocal().getOwner();
        Local local = application.getLocal();
        User user = tenant.getUser();

        if (local.getState() != LocalState.ACTIVE) {
            throw new InvalidLocalState(LocalExceptionMessages.LOCAL_NOT_ACTIVE, ErrorCodes.LOCAL_NOT_ACTIVE, LocalState.ACTIVE, local.getState());
        }

        local.setState(LocalState.RENTED);
        localRepository.saveAndFlush(local);

        LocalDate nearestSunday = currentDate.with(TemporalAdjusters.next(DayOfWeek.SUNDAY));

        BigDecimal rentalFee = local.getRentalFee();
        BigDecimal marginFee = local.getMarginFee();
        rentalFee = rentalFee.divide(BigDecimal.valueOf(7), 2, RoundingMode.UP).multiply(BigDecimal.valueOf(nearestSunday.toEpochDay() - currentDate.toEpochDay()));
        marginFee = marginFee.divide(BigDecimal.valueOf(7), 2, RoundingMode.UP).multiply(BigDecimal.valueOf(nearestSunday.toEpochDay() - currentDate.toEpochDay()));

        Rent rent = new Rent(local, tenant, owner, currentDate, endDate, BigDecimal.ZERO.subtract(rentalFee.add(marginFee)));
        rent = rentRepository.saveAndFlush(rent);

        FixedFee fixedFee = new FixedFee(rentalFee, marginFee, currentDate, rent);
        fixedFeeRepository.saveAndFlush(fixedFee);

        for (Application appl : restApplications) {
            applicationRepository.delete(appl);
        }

        emailServiceImpl.sendApplicationAcceptedEmail(user.getEmail(), user.getFirstName(), local.getName(), user.getLanguage());
        return rent;
    }

    @Override
    @PreAuthorize("hasRole('OWNER')")
    public void rejectApplication(UUID applicationId, UUID ownerUserId) throws NotFoundException {
        Application application = applicationRepository.findApplicationForOwner(applicationId, ownerUserId).orElseThrow(() -> new NotFoundException(ApplicationExceptionMessages.NOT_FOUND, ErrorCodes.APPLICATION_NOT_FOUND));
        User user = application.getTenant().getUser();
        Local local = application.getLocal();

        applicationRepository.delete(application);

        emailServiceImpl.sendApplicationRejectedEmail(user.getEmail(), user.getFirstName(), local.getName(), user.getLanguage());
    }

    @Override
    @PreAuthorize("hasRole('TENANT')")
    public Application createApplication(UUID localId, UUID userId) throws NotFoundException, InvalidLocalState, CreationException {
        if (applicationRepository.findByTenantUserIdAndLocalId(userId, localId).isPresent()) {
            throw new CreationException(ApplicationExceptionMessages.EXISTS, ErrorCodes.APPLICATION_EXISTS);
        }

        Tenant tenant = tenantRepository.findByUserId(userId).orElseThrow(() -> new NotFoundException(UserExceptionMessages.NOT_FOUND, ErrorCodes.USER_NOT_FOUND));
        Local local = localRepository.findById(localId).orElseThrow(() -> new NotFoundException(LocalExceptionMessages.LOCAL_NOT_FOUND, ErrorCodes.LOCAL_NOT_FOUND));

        if (local.getState() != LocalState.ACTIVE) {
            throw new InvalidLocalState(LocalExceptionMessages.LOCAL_NOT_ACTIVE, ErrorCodes.LOCAL_NOT_ACTIVE, LocalState.ACTIVE, local.getState());
        }

        Application application = new Application(tenant, local);
        return applicationRepository.saveAndFlush(application);
    }

    @Override
    @PreAuthorize("hasRole('TENANT')")
    public void removeApplication(UUID localId, UUID userId) throws NotFoundException {
        Application application = applicationRepository.findByTenantUserIdAndLocalId(userId, localId).orElseThrow(() -> new NotFoundException(ApplicationExceptionMessages.NOT_FOUND, ErrorCodes.APPLICATION_NOT_FOUND));

        applicationRepository.delete(application);
    }


}