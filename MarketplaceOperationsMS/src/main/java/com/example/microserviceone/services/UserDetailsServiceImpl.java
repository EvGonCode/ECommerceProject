package com.example.microserviceone.services;

import com.example.microserviceone.domain.Person;
import com.example.microserviceone.repositories.PersonRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("MyUserDetailsService")
@Primary
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final PersonRepo personRepo;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return personRepo.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(login + " not found"));
    }
}
