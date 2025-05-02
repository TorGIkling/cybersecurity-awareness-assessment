package ntnu.master.assessment.cybersecurityawareness.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class updateSurveyDTO {
    private Integer organizationId;
    private boolean isActive;

}
