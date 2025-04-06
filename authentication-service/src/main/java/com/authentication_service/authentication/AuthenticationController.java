package com.authentication_service.authentication;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/registerUser")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/unauthenticate")
    public ResponseEntity<String> logout(@RequestBody JwtRequest request) {
        if(service.logout(request.getJwt())) return ResponseEntity.ok("Logout successful");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Logout failed");
    }

    @PostMapping("/verify_jwt")
    public ResponseEntity<String> verifyJwt(@RequestBody String jwt) {
        if(service.isTokenValid(jwt)) return ResponseEntity.ok("Token is valid");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Token is not valid");
    }
}
