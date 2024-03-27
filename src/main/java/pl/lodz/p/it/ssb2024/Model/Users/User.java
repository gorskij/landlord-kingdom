package pl.lodz.p.it.ssb2024.Model.Users;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
@Table(name = "users")
@Getter
@SecondaryTable(name = "personal_data", pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id"))
@NoArgsConstructor
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", name = "id")
    private UUID id;

    @Setter
    @Column(name = "first_name", table = "personal_data", nullable = false)
    private String firstName;
    @Setter
    @Column(name = "last_name", table = "personal_data", nullable = false)
    private String lastName;
    @Setter
    @Column(name = "email", table = "personal_data", nullable = false, unique = true)
    private String email;



    @Setter
    @Column(nullable = false, unique = true)
    private String login;
    @Setter
    @Column(nullable = false)
    private String password;

    @Setter
    @Column(name = "login_attempts", nullable = false)
    private int loginAttempts = 0;

    @Setter
    @Column(name = "last_successful_login")
    private LocalDate lastSuccessfulLogin;

    @Setter
    @Column(name = "last_failed_login")
    private LocalDate lastFailedLogin;

    @Setter
    private boolean blocked = false;
    @Setter
    private boolean verified = false;

    public User(String firstName,
                String lastName,
                String email,
                String login,
                String password,
                int loginAttempts,
                LocalDate lastSuccessfulLogin,
                LocalDate lastFailedLogin,
                boolean blocked,
                boolean verified) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.login = login;
        this.password = password;
        this.loginAttempts = loginAttempts;
        this.lastSuccessfulLogin = lastSuccessfulLogin;
        this.lastFailedLogin = lastFailedLogin;
        this.blocked = blocked;
        this.verified = verified;
    }
}
