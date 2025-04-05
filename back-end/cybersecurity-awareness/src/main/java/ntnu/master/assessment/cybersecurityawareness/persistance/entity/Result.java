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
    @Column(name = "User_ID")
    private int userId;
    @Column(name = "Phishing_score")
    private double phishingScore;
    @Column(name = "BestPractice_score")
    private double bestPracticeScore;
    @Column(name = "SocialEngineering_score")
    private double socialEngineeringScore;
    @Column(name = "PhysicalSecurity_score")
    private double physicalSecurityScore;
    @Column(name = "Organization_ID")
    private int organizationId;

}
