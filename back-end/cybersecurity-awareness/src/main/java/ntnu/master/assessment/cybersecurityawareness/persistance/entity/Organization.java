package ntnu.master.assessment.cybersecurityawareness.persistance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Setter
@Getter
@Entity
@RequiredArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Organization_ID")
    private int organizationId;
    @Column(name = "name")
    @NotEmpty(message = "Organization name is required")
    private String name;
}
