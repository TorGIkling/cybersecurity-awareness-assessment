package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {


    Question getQuestionsByQuestionID(int id);

    List<Question> getQuestionsBySurveyID(int surveyID);
}
