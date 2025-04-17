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
        return userRepository.findAllByOrganizationId(id);
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

    public User updatePassword(int id, String newPassword, String oldPassword) {
        String currentPassword = userRepository.getUserByUserId(id).getPassword();
        User user = userRepository.getUserByUserId(id);


        if (!currentPassword.equals(oldPassword)) {
            throw new IllegalArgumentException("Old password is incorrect.");
        } else {
            user.setPassword(newPassword);
            return userRepository.save(user);
        }
    }

    public User updateHasAnswered(int id, boolean hasAnswered) {
        User user = userRepository.getUserByUserId(id);
        user.setHasAnswered(hasAnswered);
        return userRepository.save(user);
    }

}
