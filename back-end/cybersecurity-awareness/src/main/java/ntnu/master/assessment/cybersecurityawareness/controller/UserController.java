package ntnu.master.assessment.cybersecurityawareness.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public String getAllUsers() {
        return "Hello World";
    }
}
