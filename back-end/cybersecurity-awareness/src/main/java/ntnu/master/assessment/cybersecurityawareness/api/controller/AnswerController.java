package ntnu.master.assessment.cybersecurityawareness.api.controller;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Answer;
import ntnu.master.assessment.cybersecurityawareness.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/getAnswer/{id}")
    public ResponseEntity<Answer> getAnswer(@PathVariable int id) {
        try {
            Answer answer = answerService.getAnswerById(id);
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/getAnswerByQId/{id}")
    public ResponseEntity<List<Answer>> getAnswerByQId(@PathVariable int id) {
        try {
            List<Answer> answers = answerService.getAnswersByQuestionId(id);
            return ResponseEntity.ok(answers);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/getAnswerBySId/{id}")
    public ResponseEntity<List<Answer>> getAnswerBySId(@PathVariable int id) {
        try {
            List<Answer> answers = answerService.getAnswersBySurveyId(id);
            return ResponseEntity.ok(answers);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/addAnswer")
    public ResponseEntity<Answer> addAnswer(@RequestBody Answer answer) {
        try {
            Answer newAnswer = answerService.addAnswer(answer);
            return ResponseEntity.ok(newAnswer);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

}
