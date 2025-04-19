package com.authentication_service.config;

import com.authentication_service.domain.User;
import com.authentication_service.services.RedisService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String SECRET_KEY = "a-string-secret-at-least-256-bits-long";
    private final RedisService redisService;

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }


    public String generateToken(User user){
        return generateToken(new HashMap<>(), user);
    }

    public String generateToken(Map<String, Object> extraClaims, User user){
        String token = null;
            token = Jwts.builder().setIssuer("Stormpath")
                    .setSubject("msilverman")
                    .claim("login", user.getLogin())
                    .claim("role", user.getRole())
                    // Fri Jun 24 2016 15:33:42 GMT-0400 (EDT)
                    .setIssuedAt(Date.from(Instant.ofEpochSecond(1466796822L)))
                    // Sat Jun 24 2116 15:33:42 GMT-0400 (EDT)
                    .setExpiration(Date.from(Instant.ofEpochSecond(4622470422L)))
                    .signWith(
                            getSigningKey()
                    )
                    .compact();
        redisService.saveTokenRevokeData(token, false);
        return token;
    }

    public boolean isTokenValid(String jwt){
        return !isTokenExpited(jwt) && !isTokenRevoked(jwt);
    }

    public boolean isTokenRevoked(String token){
        boolean isRevoked;
        return redisService.getTokenRevokeData(token);
    }

    public boolean updateTokenRevokeData(String token, Boolean newData){
        if(redisService.getTokenRevokeData(token) == null){
            return false;
        }
        redisService.saveTokenRevokeData(token, newData);
        return true;
    }

    private boolean isTokenExpited(String token){
        return extractExpirationDate(token).before(new Date());
    }

    private Date extractExpirationDate(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public static String extractLogin(String jwt){
        return extractAllClaims(jwt).get("login", String.class);
    }

    private static Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody() ;
    }

    private static Key getSigningKey() {
        byte[] keyBytes = new byte[0];
        try {
            keyBytes = SECRET_KEY.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
