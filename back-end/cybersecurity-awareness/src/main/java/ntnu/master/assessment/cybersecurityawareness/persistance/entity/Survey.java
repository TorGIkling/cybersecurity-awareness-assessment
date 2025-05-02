package ntnu.master.assessment.cybersecurityawareness.persistance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Survey_ID")
    private int surveyId;
    @NotEmpty(message = "Survey name is required")
    @Column(name = "survey_name")
    private String name;
    @Column(name = "Organization_ID", nullable = true)
    private Integer organizationId;
    @Column(name = "is_active")
    private boolean isActive;
}
