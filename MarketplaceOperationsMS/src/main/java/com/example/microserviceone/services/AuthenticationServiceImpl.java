package com.example.microserviceone.services;

import com.example.microserviceone.config.AuthServiceProperties;
import com.example.microserviceone.domain.Person;
import com.example.microserviceone.domain.RegisterRequest;
import com.example.microserviceone.domain.Role;
import com.example.microserviceone.exception.NotEnoughAuthoritiesException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    private final WebClient webClient;
    private final PersonService personService;
    AuthServiceProperties authServiceProperties;

    @Override
    public void authMicroserviceRegisterRequest(String login, String password) {
        Map<String, String> bodyMap = new HashMap();
        bodyMap.put("login",login);
        bodyMap.put("password",password);

        webClient.post()
                .uri(authServiceProperties.getUrl() + "/registerUser")
                .body(BodyInserters.fromValue(bodyMap))
                .retrieve()
                .onStatus(HttpStatus.BAD_REQUEST::equals,
                        response -> response.bodyToMono(String.class).map(RuntimeException::new))
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public void registerUser(RegisterRequest request) {
        authMicroserviceRegisterRequest(request.getLogin(), request.getPassword());
    }

    @Override
    public void registerUserWithRole(RegisterRequest request) {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        String requestOwnerName = (String) requestAttributes.getAttribute("PersonName", RequestAttributes.SCOPE_REQUEST);
        Person requestOwner = personService.findByLogin(requestOwnerName);
        if(requestOwner.getRole().equals(Role.USER) || requestOwner.getRole().equals(Role.MANAGER)){
            throw new NotEnoughAuthoritiesException();
        }

        if(requestOwner.getRole().equals(Role.SELLER)){
            if(request.getRole().equals(Role.SELLER)){
                throw new NotEnoughAuthoritiesException();
            }
            if(request.getRole().equals(Role.ADMIN)){
                throw new NotEnoughAuthoritiesException();
            }
            if(request.getRole().equals(Role.USER)){
                throw new NotEnoughAuthoritiesException();
            }
        }

        authMicroserviceRegisterRequest(request.getLogin(), request.getPassword());
        Person person = new Person(request.getLogin(), request.getRole());
        personService.addPerson(person);
    }
}
