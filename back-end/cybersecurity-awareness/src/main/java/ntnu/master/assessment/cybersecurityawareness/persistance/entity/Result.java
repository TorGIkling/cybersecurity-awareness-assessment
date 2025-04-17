package ntnu.master.assessment.cybersecurityawareness.persistance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "Result_ID")
    private int resultId;
    @Column(name = "Survey_ID")
    private int surveyId;
    @Column(name = "phishing")
    private double phishingScore;
    @Column(name = "best_practice")
    private double bestPracticeScore;
    @Column(name = "social_engineering")
    private double socialEngineeringScore;
    @Column(name = "physical_security")
    private double physicalSecurityScore;
}
