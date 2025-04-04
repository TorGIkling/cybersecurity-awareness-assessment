package ntnu.master.assessment.cybersecurityawareness.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class QuestionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Question_ID")
    private int questionID;
    @Column(name = "Survey_ID")
    private int surveyID;
    @Column(name = "Question_Text")
    private String questionText;
    @Column(name = "High_Text")
    private String highText;
    @Column(name = "Low_Text")
    private String lowText;
    @Column(name = "Middle_Text")
    private String middleText;
    @Column(name = "Category")
    private String category;
}
