package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {


    User getUserByUserId(int id);

    List<User> findAll();

    User getUserByEmail(String email);

    List<User> findAllByOrganizationId(int id);


}
