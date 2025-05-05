package ntnu.master.assessment.cybersecurityawareness.api.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://10.22.90.124:3000", "http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

}
