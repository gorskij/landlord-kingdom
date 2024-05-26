package pl.lodz.p.it.ssbd2024.mok.mappers;

import pl.lodz.p.it.ssbd2024.model.User;
import pl.lodz.p.it.ssbd2024.mok.dto.UpdateUserDataRequest;
import pl.lodz.p.it.ssbd2024.mok.dto.DetailedUserResponse;
import pl.lodz.p.it.ssbd2024.mok.dto.UserResponse;
import pl.lodz.p.it.ssbd2024.util.TimezoneMapper;

import java.util.List;

public class UserMapper {
    public static UserResponse toUserResponse(User user) {
        String timezone = user.getTimezone() != null ?
                user.getTimezone().getName() : null;

        return new UserResponse(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getLogin(),
                user.getLanguage(),
                user.isBlocked(),
                timezone);
    }

    public static DetailedUserResponse toDetailedUserResponse(User user, List<String> roles) {
        String timezone = user.getTimezone() != null ?
                user.getTimezone().getName() : "UTC";

        String lastSuccessfulLogin = null;
        String lastFailedLogin = null;

        if (user.getLastSuccessfulLogin() != null) {
            lastSuccessfulLogin = TimezoneMapper.convertUTCToAnotherTimezoneSimple(user.getLastSuccessfulLogin(), timezone, user.getLanguage());
        }

        if (user.getLastFailedLogin() != null) {
            lastFailedLogin = TimezoneMapper.convertUTCToAnotherTimezoneSimple(user.getLastFailedLogin(), timezone, user.getLanguage());
        }

        return new DetailedUserResponse(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getLogin(),
                user.getLanguage(),
                lastSuccessfulLogin,
                lastFailedLogin,
                user.getLastSuccessfulLoginIp(),
                user.getLastFailedLoginIp(),
                timezone,
                user.isBlocked(),
                user.isVerified(),
                user.isActive(),
                roles,
                user.getTheme().toString());
    }

    public static User toUser(UpdateUserDataRequest userRequest) {
        User user = new User();
        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        user.setLanguage(userRequest.language());
        return user;
    }
}
