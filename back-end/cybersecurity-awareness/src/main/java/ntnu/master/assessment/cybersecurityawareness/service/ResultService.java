package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Result;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultService {

    private final ResultRepository resultRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public Result getResultById(int id) {
        return resultRepository.findByResultId(id);
    }

    public Result getResultBySurveyId(int surveyId) {
        return resultRepository.getResultBySurveyId(surveyId);
    }

    public Result addResult(Result result) {
        return resultRepository.save(result);
    }
}
