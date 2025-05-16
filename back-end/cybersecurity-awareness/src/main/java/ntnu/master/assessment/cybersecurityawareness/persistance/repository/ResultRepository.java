package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {

    Result findByResultId(int resultId);

    Result getResultBySurveyId(int surveyId);
}
