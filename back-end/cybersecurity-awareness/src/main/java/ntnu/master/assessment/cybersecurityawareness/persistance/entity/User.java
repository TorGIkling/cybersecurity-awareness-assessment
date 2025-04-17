package ntnu.master.assessment.cybersecurityawareness.persistance.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_ID")
    private int userId;
    @Column(name = "Organization_ID")
    private int organizationId;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "has_answered")
    private boolean hasAnswered;
    @Column(name = "role")
    private String role;
    @Column(name = "has_temp_password")
    private boolean hasTempPassword;

}
