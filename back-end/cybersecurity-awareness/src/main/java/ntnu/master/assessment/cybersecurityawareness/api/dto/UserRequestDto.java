package ntnu.master.assessment.cybersecurityawareness.api.dto;

import lombok.Builder;

@Builder
public class UserRequestDto {
    private int user_id;
    private String email;
    private String username;
    private String password;
    private int organization_id;
    private String role;
    private boolean hasAnswered;
}
