package ntnu.master.assessment.cybersecurityawareness.api.controller;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Result;
import ntnu.master.assessment.cybersecurityawareness.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping("/getResult/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable int id) {
        try {
            Result result = resultService.getResultById(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/getSurveyResult/{id}")
    public ResponseEntity<Result> getSurveyResultById(@PathVariable int id) {
        try {
            Result result = resultService.getResultBySurveyId(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/addResult")
    public ResponseEntity<Result> addResult(@RequestBody Result result) {
        try {
            Result newResult = resultService.addResult(result);
            return ResponseEntity.ok(newResult);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
