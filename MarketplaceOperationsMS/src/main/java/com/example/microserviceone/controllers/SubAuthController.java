package com.example.microserviceone.controllers;

import com.example.microserviceone.domain.Person;
import com.example.microserviceone.domain.RegisterRequest;
import com.example.microserviceone.domain.Role;
import com.example.microserviceone.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.reactive.function.BodyInserters;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SubAuthController {
   private final AuthenticationService authenticationService;

    @PostMapping("/registerUser")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request){
        authenticationService.registerUser(request);
        return ResponseEntity.ok("User is saved");
    }

    @PostMapping("/registerUserWithRole")
    public ResponseEntity<String> registerUserWithRole(@RequestBody RegisterRequest request){
        authenticationService.registerUserWithRole(request);
        return ResponseEntity.ok("User is saved");
    }

}
