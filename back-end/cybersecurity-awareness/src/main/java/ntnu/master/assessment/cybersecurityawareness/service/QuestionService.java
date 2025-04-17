package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Question;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question getQuestionById(int id) {
        return questionRepository.getQuestionsByQuestionID(id);
    }

    public List<Question> getQuestionsBySurveyId(int id) {
        return questionRepository.getQuestionsBySurveyID(id);
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }
}
