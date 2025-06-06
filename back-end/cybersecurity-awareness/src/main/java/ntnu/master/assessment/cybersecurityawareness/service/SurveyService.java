package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Survey;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Arrays.stream;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;

    @Autowired
    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public List<Survey> getAllSurveys() {
        return (List<Survey>) surveyRepository.findAll();
    }

    public Survey getSurveyById(int id) {
        return surveyRepository.getSurveyBySurveyId(id);
    }

    public List<Survey> getSurveysByOrgId(int orgId) {
        return surveyRepository.getSurveysByOrganizationId(orgId);
    }

    public List<Survey> getActiveSurveysByOrgId(int orgId) {
        List<Survey> surveys = surveyRepository.getSurveysByOrganizationId(orgId);

        return surveys.stream()
                .filter(Survey::isActive)
                .toList();
    }

    public Survey getSurveyByName(String name) {
        return surveyRepository.getSurveyByName(name);
    }

    public Survey addSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    public Survey updateSurveyOrgId(int id, Integer orgId, boolean isActive) {
        Survey survey = surveyRepository.getSurveyBySurveyId(id);
        if (survey != null) {
            survey.setOrganizationId(orgId);
            survey.setActive(isActive);
            return surveyRepository.save(survey);
        }
        return null;

    }
}
