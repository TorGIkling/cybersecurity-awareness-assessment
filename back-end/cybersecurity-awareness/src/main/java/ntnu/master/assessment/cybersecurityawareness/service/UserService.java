package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.User;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsersByOrgId(int id) {
        List<User> users = userRepository.findAllByOrganizationId(id);
        return users;
    }

    public User getUserById(int id) {
        return userRepository.getUserByUserId(id);
    }

    public User getUserByEmail(String email) {
        return userRepository.getUsersByEmail(email);
    }

    public User addUser(User newUser) {
        return userRepository.save(newUser);
    }

}
