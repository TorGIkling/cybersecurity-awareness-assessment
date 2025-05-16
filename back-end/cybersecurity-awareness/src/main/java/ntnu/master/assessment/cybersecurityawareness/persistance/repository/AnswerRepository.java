package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    Answer getAnswerByAnswerId(int answerId);

    List<Answer> getAnswersByQuestionId(int questionId);

    List<Answer> getAnswersByOrganizationId(int organizationId);
}
