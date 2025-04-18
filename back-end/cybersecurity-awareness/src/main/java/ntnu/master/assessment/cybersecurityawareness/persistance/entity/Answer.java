package ntnu.master.assessment.cybersecurityawareness.persistance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@RequiredArgsConstructor
@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private int answerId;

    @Column(name = "Question_ID")
    private int questionId;

    @Column(name = "answer")
    private double answer;

    @Column(name = "Survey_ID")
    private int surveyId;
}
