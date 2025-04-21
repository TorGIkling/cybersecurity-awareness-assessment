package ntnu.master.assessment.cybersecurityawareness.persistance.entity;


import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Setter
@Getter
public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String email;
    private final String password;
    private final int orgId;
    private final String role;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String username,String email,String password , int orgId, String role, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.orgId = orgId;
        this.role = role;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
