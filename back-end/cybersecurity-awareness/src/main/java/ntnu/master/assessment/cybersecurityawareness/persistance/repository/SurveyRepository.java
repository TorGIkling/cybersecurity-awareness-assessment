package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Survey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends CrudRepository<Survey, Integer> {
    Survey getSurveyBySurveyId(int id);

    List<Survey> getSurveysByOrganizationId(int orgId);

    Survey getSurveyByName(String name);
}
