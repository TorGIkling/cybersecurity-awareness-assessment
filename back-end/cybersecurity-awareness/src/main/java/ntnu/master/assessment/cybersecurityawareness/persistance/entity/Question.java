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
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Question_ID")
    private int questionID;
    @Column(name = "Survey_ID")
    private int surveyID;
    @NotEmpty(message = "Question text is required")
    @Column(name = "question_Text")
    private String questionText;
    @NotEmpty(message = "High text is required")
    @Column(name = "high_text")
    private String highText;
    @NotEmpty(message = "Low text is required")
    @Column(name = "low_text")
    private String lowText;
    @NotEmpty(message = "Category is required")
    @Column(name = "category")
    private String category;
    @NotEmpty(message = "Middle text is required")
    @Column(name = "middle_text")
    private String middleText;
}
