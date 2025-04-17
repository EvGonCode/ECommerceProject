package com.example.microserviceone.services;

import com.example.microserviceone.domain.RegisterRequest;

public interface AuthenticationService {
    void registerUser(RegisterRequest request);
    void registerUserWithRole(RegisterRequest request);

    void authMicroserviceRegisterRequest(String login, String password);
}
