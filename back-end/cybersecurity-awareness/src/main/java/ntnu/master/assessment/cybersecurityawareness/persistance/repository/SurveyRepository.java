package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer> {
    Survey getSurveyBySurveyId(int id);

    List<Survey> getSurveysByOrganizationId(int orgId);

    Survey getSurveyByName(String name);
}
