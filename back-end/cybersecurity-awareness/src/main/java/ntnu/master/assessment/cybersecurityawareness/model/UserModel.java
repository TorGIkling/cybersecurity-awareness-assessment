package ntnu.master.assessment.cybersecurityawareness.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_ID")
    private int user_id;
    @Column(name = "Email")
    private String email;
    @Column(name = "UserName")
    private String username;
    @Column(name = "Organization_ID")
    private int organization_id;
    @Column(name = "Role")
    private String role;
    @Column(name = "Has_Answered")
    private boolean hasAnswered;
}
