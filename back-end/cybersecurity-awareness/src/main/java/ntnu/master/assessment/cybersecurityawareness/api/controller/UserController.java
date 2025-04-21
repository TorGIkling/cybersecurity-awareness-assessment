package ntnu.master.assessment.cybersecurityawareness.api.controller;

import ntnu.master.assessment.cybersecurityawareness.api.dto.LoginRequestDTO;
import ntnu.master.assessment.cybersecurityawareness.persistance.entity.User;
import ntnu.master.assessment.cybersecurityawareness.service.TokenService;
import ntnu.master.assessment.cybersecurityawareness.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {


    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public UserController(UserService userService , TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<User>> getAllUsersByOrgId(@PathVariable int id) {
        try {
            List<User> users = userService.getUsersByOrgId(id);
            return ResponseEntity.ok(users);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.EMPTY_LIST);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.EMPTY_LIST);
        }
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getUserByEmail/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User addedUser = userService.addUser(user);
            return ResponseEntity.ok(addedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            User user = new User();
            user.setEmail(loginRequest.getEmail());
            user.setPassword(loginRequest.getPassword());
            User userLogin = userService.loginUser(user);

            String token = tokenService.generateToken(userLogin.getEmail(), userLogin.getUsername(), userLogin.getOrganizationId(), userLogin.getRole());
            String refreshToken = tokenService.generateToken(user.getEmail(), user.getUsername(), user.getOrganizationId(), user.getRole());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "refreshToken", refreshToken
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String,String>> refreshToken(@RequestBody Map<String, String> token) {
        try {
            String oldToken = token.get("token");
            String email = tokenService.getEmailFromToken(oldToken);
            User user = userService.getUserByEmail(email);

            String newToken = tokenService.generateToken(user.getEmail(), user.getUsername(), user.getOrganizationId(), user.getRole());
            return ResponseEntity.ok(Collections.singletonMap("token", newToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PutMapping("/{id}/updatePassword")
    public ResponseEntity<User> updatePassword(@PathVariable int id, @RequestBody Map<String, String> password) {
        try {
            String newPassword = password.get("newPassword");
            String oldPassword = password.get("oldPassword");

            User user = userService.updatePassword(id, newPassword, oldPassword);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/hasAnswered")
    public ResponseEntity<User> hasAnswered(@PathVariable int id, @RequestBody boolean isUpdated) {
        try {
            User user = userService.updateHasAnswered(id, isUpdated);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
