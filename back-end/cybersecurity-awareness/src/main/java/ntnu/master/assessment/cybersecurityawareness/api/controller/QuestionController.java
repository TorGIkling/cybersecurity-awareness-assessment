package ntnu.master.assessment.cybersecurityawareness.api.controller;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Question;
import ntnu.master.assessment.cybersecurityawareness.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/getQuestion/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable int id) {
        try {
            Question question = questionService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/getQuestionBySurveyID/{id}")
    public ResponseEntity<List<Question>> getQuestionBySurveyID(@PathVariable int id) {
        try {
            List<Question> questions = questionService.getQuestionsBySurveyId(id);
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/addQuestion")
    public ResponseEntity<Question> addQuestion(@Valid @RequestBody Question question) {
        try {
            Question newQuestion = questionService.addQuestion(question);
            return ResponseEntity.ok(newQuestion);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
