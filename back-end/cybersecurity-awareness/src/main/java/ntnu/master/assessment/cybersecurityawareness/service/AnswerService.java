package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Answer;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer getAnswerById(int id) {
        return answerRepository.getAnswerByAnswerId(id);
    }

    public List<Answer> getAnswersByQuestionId(int questionId) {
        return answerRepository.getAnswersByQuestionId(questionId);
    }

    public List<Answer> getAnswersByOrgId(int surveyId) {
        return answerRepository.getAnswersByOrganizationId(surveyId);
    }

    public List<Answer> addAnswer(List<Answer> answer) {
        return (List<Answer>) answerRepository.saveAll(answer);
    }

}
