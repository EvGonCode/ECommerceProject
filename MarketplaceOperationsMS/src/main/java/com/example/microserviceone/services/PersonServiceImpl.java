package com.example.microserviceone.services;

import com.example.microserviceone.domain.Person;
import com.example.microserviceone.exception.DuplicateUserException;
import com.example.microserviceone.repositories.PersonRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PersonServiceImpl implements PersonService{
    private final PersonRepo personRepo;

    @Override
    public Person findByLogin(String login) {
        return personRepo.findByLogin(login).get();
    }

    @Override
    public void addPerson(Person person) {
        if(isExist(person)){
            throw new DuplicateUserException(person.getLogin());
        }
        personRepo.save(person);
    }

    @Override
    public Boolean isExist(Person person) {
        return personRepo.existsByLogin(person.getLogin());
    }

}
