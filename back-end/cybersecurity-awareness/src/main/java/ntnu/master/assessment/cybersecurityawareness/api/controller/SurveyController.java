package ntnu.master.assessment.cybersecurityawareness.api.controller;

import ntnu.master.assessment.cybersecurityawareness.api.dto.updateSurveyDTO;
import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Survey;
import ntnu.master.assessment.cybersecurityawareness.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyController {

    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping("/surveys")
    public ResponseEntity<List<Survey>> getSurveys() {
        try {
            List<Survey> surveys = surveyService.getAllSurveys();
            return ResponseEntity.ok(surveys);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getSurvey/{id}")
    public ResponseEntity<Survey> getSurvey(@PathVariable int id) {
        try {
            Survey survey = surveyService.getSurveyById(id);
            return ResponseEntity.ok(survey);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("getSurveyByOrgId/{orgId}")
    public ResponseEntity<List<Survey>> getSurveyByOrgId(@PathVariable int orgId) {
        try {
            List<Survey> surveys = surveyService.getSurveysByOrgId(orgId);
            return ResponseEntity.ok(surveys);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getSurvey/{name}")
    public ResponseEntity<Survey> getSurveyByName(@PathVariable String name) {
        try {
            Survey survey = surveyService.getSurveyByName(name);
            return ResponseEntity.ok(survey);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addSurvey")
    public ResponseEntity<Survey> createSurvey(@Valid @RequestBody Survey survey) {
        try {
            Survey newSurvey = surveyService.addSurvey(survey);
            return ResponseEntity.ok(newSurvey);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/updateSurvey/{id}")
    public ResponseEntity<Survey> updateSurveyOrgId(@PathVariable int id, @RequestBody updateSurveyDTO surveyDTO) {
        try {
            Integer orgIdValue = surveyDTO.getOrganizationId();
            boolean isActive = surveyDTO.isActive();
            Survey updatedSurvey = surveyService.updateSurveyOrgId(id, orgIdValue , isActive);
            return ResponseEntity.ok(updatedSurvey);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
