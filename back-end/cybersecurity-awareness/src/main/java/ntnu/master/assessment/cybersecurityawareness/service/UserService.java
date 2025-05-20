package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.User;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder =  passwordEncoder;
        this.authenticationManager = authenticationManager;

   }

    public List<User> getUsersByOrgId(int id) {
        return userRepository.findAllByOrganizationId(id);
    }

    public User getUserById(int id) {
        return userRepository.getUserByUserId(id);
    }

    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    public User addUser(User user) {

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    public User loginUser(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        if (authentication.isAuthenticated()) {
            System.out.println("Logging in user: " + user.getEmail());
            return userRepository.getUserByEmail(user.getEmail());
        } else {
            throw new RuntimeException("Email not found");
        }
    }

    public User updatePassword(int id, String newPassword, String oldPassword) {
        User user = userRepository.getUserByUserId(id);
        String currentPassword = user.getPassword();


        if (!passwordEncoder.matches(oldPassword, currentPassword)) {
            throw new IllegalArgumentException("Old password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);

    }

    public User updateHasAnswered(int id, boolean hasAnswered) {
        User user = userRepository.getUserByUserId(id);
        user.setHasAnswered(hasAnswered);
        return userRepository.save(user);
    }

}
