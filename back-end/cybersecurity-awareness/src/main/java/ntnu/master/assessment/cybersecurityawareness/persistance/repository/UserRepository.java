package ntnu.master.assessment.cybersecurityawareness.persistance.repository;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {


    User getUserByUserId(int id);

    List<User> findAll();

    User getUsersByEmail(String email);

    List<User> findAllByOrganizationId(int id);


}
