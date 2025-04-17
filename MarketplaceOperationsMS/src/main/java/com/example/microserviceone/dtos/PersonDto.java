package com.example.microserviceone.dtos;

import com.example.microserviceone.domain.Person;
import com.example.microserviceone.domain.Role;

import java.util.stream.Collectors;

public record PersonDto(String login, Role role) {
    public static PersonDto toDto(Person person){
        PersonDto personDto = new PersonDto(person.getLogin(), person.getRole());
        return personDto;
    }
}
