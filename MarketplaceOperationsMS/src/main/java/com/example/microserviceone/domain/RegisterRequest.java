package com.example.microserviceone.domain;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RegisterRequest {
    private String login;
    private String password;
    private Role role;
}
