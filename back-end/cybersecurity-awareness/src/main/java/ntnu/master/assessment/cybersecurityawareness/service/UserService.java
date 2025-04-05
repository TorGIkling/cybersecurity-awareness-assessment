package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


}
