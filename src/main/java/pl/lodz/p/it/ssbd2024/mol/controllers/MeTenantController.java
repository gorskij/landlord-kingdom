package pl.lodz.p.it.ssbd2024.mol.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.ssbd2024.exceptions.NotFoundException;
import pl.lodz.p.it.ssbd2024.exceptions.RoleRequestAlreadyExistsException;
import pl.lodz.p.it.ssbd2024.exceptions.UserAlreadyHasRoleException;
import pl.lodz.p.it.ssbd2024.model.RoleRequest;
import pl.lodz.p.it.ssbd2024.mol.dto.*;
import pl.lodz.p.it.ssbd2024.mol.mappers.RentMapper;
import pl.lodz.p.it.ssbd2024.mol.mappers.RoleRequestMapper;
import pl.lodz.p.it.ssbd2024.mol.services.RentService;
import pl.lodz.p.it.ssbd2024.mol.services.RoleService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/me")
@RequiredArgsConstructor
@Scope("prototype")
@Transactional(propagation = Propagation.NEVER)
public class MeTenantController {
    private final RoleService roleService;
    private final RentService rentService;

    @PostMapping("/role-request")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<GetRoleRequestResponse> requestRole() {
        try {
            RoleRequest roleRequest = roleService.requestRole();
            return ResponseEntity.ok(RoleRequestMapper.toRoleResponse(roleRequest));
        } catch (RoleRequestAlreadyExistsException e) {
            throw new RuntimeException(e);
        } catch (UserAlreadyHasRoleException e) {
            throw new RuntimeException(e);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/role-request")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<GetRoleRequestResponse> getRoleRequest() throws NotFoundException {
        RoleRequest roleRequest = roleService.get();
        return ResponseEntity.ok(RoleRequestMapper.toRoleResponse(roleRequest));
    }

    @GetMapping("/current-rents")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<List<RentForTenantResponse>> getCurrentRents() {
        UUID userId = UUID.fromString(((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getSubject());
        return ResponseEntity.ok(rentService.getCurrentTenantRents(userId).stream().map(RentMapper::rentForTenantResponse).toList());
    }

    @GetMapping("/rents/{id}")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<List<RentResponse>> getRent(@PathVariable UUID id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @GetMapping("/rents/archival")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<List<RentResponse>> getArchivalRents() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<List<ApplicationResponse>> getApplications() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @PostMapping("/rents/{id}/variable-fee")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<VariableFeeResponse> enterVariableFee(@PathVariable UUID id, @RequestBody VariableFeeRequest variableFeeRequest) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
