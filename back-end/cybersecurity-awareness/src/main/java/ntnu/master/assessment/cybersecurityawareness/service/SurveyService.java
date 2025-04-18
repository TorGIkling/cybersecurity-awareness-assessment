package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Survey;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;

    @Autowired
    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public Survey getSurveyById(int id) {
        return surveyRepository.getSurveyBySurveyID(id);
    }

    public List<Survey> getSurveysByOrgId(int orgId) {
        return surveyRepository.getSurveysByOrganizationID(orgId);
    }

    public Survey getSurveyByName(String name) {
        return surveyRepository.getSurveyByName(name);
    }

    public Survey addSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }
}
