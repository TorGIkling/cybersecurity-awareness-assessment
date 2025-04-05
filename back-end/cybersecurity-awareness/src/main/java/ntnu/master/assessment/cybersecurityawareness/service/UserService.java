package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.api.dto.UserRequestDto;
import ntnu.master.assessment.cybersecurityawareness.persistance.entity.User;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public UserRequestDto getUserDtoById(int id) {
        User userEntity = userRepository.getUserByUserId(id);

        return UserRequestDto.builder()
                .user_id(userEntity.getUserId())
                .email(userEntity.getEmail())
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .organization_id(userEntity.getOrganization_id())
                .role(userEntity.getRole())
                .hasAnswered(userEntity.isHasAnswered())
                .build();
    }

}
