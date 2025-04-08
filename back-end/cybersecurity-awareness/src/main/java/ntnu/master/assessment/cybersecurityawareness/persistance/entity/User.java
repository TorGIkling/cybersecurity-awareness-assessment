package ntnu.master.assessment.cybersecurityawareness.persistance.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_ID")
    private int userId;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "Organization_ID")
    private int organizationId;
    @Column(name = "has_answered")
    private boolean hasAnswered;
    @Column(name = "role")
    private String role;

}
