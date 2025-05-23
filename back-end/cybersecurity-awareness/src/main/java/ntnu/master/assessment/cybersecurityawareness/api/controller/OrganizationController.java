package ntnu.master.assessment.cybersecurityawareness.api.controller;


import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Organization;
import ntnu.master.assessment.cybersecurityawareness.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizationController {

    private final OrganizationService organizationService;

    @Autowired
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping("/orgs")
    public ResponseEntity<List<Organization>> getOrganizations() {
        try {
            List<Organization> organizations = organizationService.getAllOrgs();
            return ResponseEntity.ok(organizations);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("getOrg/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable("id") int id) {
        try {
            Organization organization = organizationService.getOrgById(id);

            return ResponseEntity.ok(organization);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getOrg/{name}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable String name) {
        try {
            Organization organization = organizationService.getOrgByName(name);
            return ResponseEntity.ok(organization);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addOrg")
    public ResponseEntity<Organization> addOrganization(@Valid @RequestBody Organization organization) {
        try {
            Organization newOrg = organizationService.addOrg(organization);
            return ResponseEntity.ok(newOrg);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
