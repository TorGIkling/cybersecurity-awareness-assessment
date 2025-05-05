package ntnu.master.assessment.cybersecurityawareness.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Service
public class TokenService {

    private SecretKey secretKey;
    private Date expirationDate;

    public TokenService() {
        initializeSecretKey();
    }

    private void initializeSecretKey() {
        if (secretKey == null || isKeyExpired())  {
            generateNewSecretKey();
        }
    }

    private void generateNewSecretKey() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            keyGenerator.init(256);
            this.secretKey = keyGenerator.generateKey();
            this.expirationDate = new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(30)); // 1 hour expiration
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate secret key", e);
        }
    }

    public String generateToken(String email, String Username, int orgId, int userId ,String role, boolean hasAnswered) {
        return Jwts.builder()
                .setSubject(email)
                .claim("username", Username)
                .claim("organizationId", orgId)
                .claim("userId", userId)
                .claim("role", role)
                .claim("hasAnswered", hasAnswered)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(30))) // 1 hour expiration
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractClaim(token, claims -> claims.get("username", String.class));
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    private boolean isKeyExpired() {
        return expirationDate == null || new Date().after(expirationDate);
    }

    public String getEncodedSecretKey() {
        initializeSecretKey();
        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }
}
