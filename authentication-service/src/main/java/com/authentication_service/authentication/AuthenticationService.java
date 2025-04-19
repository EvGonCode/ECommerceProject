package com.authentication_service.authentication;

import com.authentication_service.config.JwtService;
import com.authentication_service.domain.User;
import com.authentication_service.exception.DuplicateUserException;
import com.authentication_service.exception.NoSuchUserException;
import com.authentication_service.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthenticationResponse register(RegisterRequest request) {
        if(userRepo.findByLogin(request.getLogin()).isPresent()){
            throw new DuplicateUserException(request.getLogin());
        }
        var user = User.builder()
                .login(request.getLogin())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepo.findByLogin(request.getLogin())
                .orElseThrow(() -> new NoSuchUserException(request.getLogin()));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public Boolean logout(String jwt){
        return jwtService.updateTokenRevokeData(AuthenticationResponse.builder().token(jwt).build().getToken(), true);
    }

    public boolean isTokenValid(String jwt){
        return jwtService.isTokenValid(jwt);
    }
}
