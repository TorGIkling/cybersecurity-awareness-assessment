package ntnu.master.assessment.cybersecurityawareness.persistance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Question_ID")
    private int questionID;
    @Column(name = "Survey_ID")
    private int surveyID;
    @Column(name = "question_Text")
    private String questionText;
    @Column(name = "high_text")
    private String highText;
    @Column(name = "low_text")
    private String lowText;
    @Column(name = "category")
    private String category;
    @Column(name = "middle_text")
    private String middleText;
}
