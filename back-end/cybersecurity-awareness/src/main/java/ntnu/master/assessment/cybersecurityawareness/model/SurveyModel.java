package ntnu.master.assessment.cybersecurityawareness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class SurveyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Survey_ID")
    private int surveyID;
    @Column(name = "Survey_name")
    private String surveyName;
    @Column(name = "Organization_ID")
    private int organizationID;

}
