package ntnu.master.assessment.cybersecurityawareness.controller;

import ntnu.master.assessment.cybersecurityawareness.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String getAllUsers() {
        return "Hello World";
    }

    @PostMapping("/addUser")
    public addUser() {

    }
}
