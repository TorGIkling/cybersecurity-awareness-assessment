package ntnu.master.assessment.cybersecurityawareness.api.configuration;

import ntnu.master.assessment.cybersecurityawareness.persistance.repository.UserRepository;
import ntnu.master.assessment.cybersecurityawareness.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())// Disable CSRF protection
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/").permitAll() // Allow all requests to /api/v1/auth/**
                        .anyRequest().permitAll() // All other requests require authentication
                );
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean UserDetailsService userDetailsService(UserRepository userRepository) {
        return new CustomUserDetailsService(userRepository);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config, UserDetailsService userDetailsService) throws Exception {
        return authentication -> {
            UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());
            if (passwordEncoder().matches(authentication.getCredentials().toString(), userDetails.getPassword())) {
                ;
                return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            }else {
                throw new RuntimeException("Invalid credentials");
            }
        };
    }
}
