package ntnu.master.assessment.cybersecurityawareness.repository;

import ntnu.master.assessment.cybersecurityawareness.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Long> {

}
