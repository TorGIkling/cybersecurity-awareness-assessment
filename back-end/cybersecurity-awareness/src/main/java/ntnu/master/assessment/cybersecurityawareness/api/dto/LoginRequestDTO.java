package ntnu.master.assessment.cybersecurityawareness.api.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class LoginRequestDTO {
    @Email(message = "Invalid email format")
    @NotEmpty(message = "Email is Required")
    private String email;
    @NotEmpty(message = "Password is Required")
    private String password;
}
