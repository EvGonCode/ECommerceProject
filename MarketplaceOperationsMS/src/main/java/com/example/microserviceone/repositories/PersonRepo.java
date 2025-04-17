package com.example.microserviceone.repositories;

import com.example.microserviceone.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepo extends JpaRepository<Person, Integer> {
    Optional<Person> findByLogin(String login);
    Boolean existsByLogin(String login);
}
