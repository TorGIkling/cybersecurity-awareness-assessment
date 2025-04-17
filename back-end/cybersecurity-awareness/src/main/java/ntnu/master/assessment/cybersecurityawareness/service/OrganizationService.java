package ntnu.master.assessment.cybersecurityawareness.service;

import ntnu.master.assessment.cybersecurityawareness.persistance.entity.Organization;
import ntnu.master.assessment.cybersecurityawareness.persistance.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> getAllOrgs() {
        return organizationRepository.findAll();
    }

    public Organization getOrgById(int id) {
        return organizationRepository.getOrganizationByOrganizationId(id);
    }

    public Organization getOrgByName(String name) {
        return organizationRepository.findByName(name);
    }

    public Organization addOrg(Organization org) {
        return organizationRepository.save(org);
    }

}
