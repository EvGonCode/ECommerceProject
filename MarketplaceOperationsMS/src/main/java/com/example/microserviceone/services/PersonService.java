package com.example.microserviceone.services;

import com.example.microserviceone.domain.Person;

public interface PersonService {
    void addPerson(Person person);
    Boolean isExist(Person person);

    Person findByLogin(String login);
}
