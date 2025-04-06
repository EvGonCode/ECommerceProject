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

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String SECRET_KEY = "QaD4MUT11zs58b11OWFRiJWSx6TW7DTI5PqsT3b+OaDTH/jYsj9qfhxMTd0+z1Yp";
    private final RedisService redisService;

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }


    public String generateToken(User user){
        return generateToken(new HashMap<>(), user);
    }

    public String generateToken(Map<String, Object> extraClaims, User user){
        String token = Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getLogin())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
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

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody() ;
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
