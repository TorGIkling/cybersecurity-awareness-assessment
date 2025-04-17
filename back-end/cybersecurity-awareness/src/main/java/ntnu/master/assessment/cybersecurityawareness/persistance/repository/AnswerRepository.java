package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Integer> {

    Answer getAnswerByAnswerId(int answerId);

    List<Answer> getAnswersByQuestionId(int questionId);

    List<Answer> getAnswersBySurveyId(int surveyId);
}
