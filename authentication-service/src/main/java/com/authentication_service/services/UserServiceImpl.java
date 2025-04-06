package com.authentication_service.services;

import com.authentication_service.domain.User;
import com.authentication_service.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    public User findById(Integer id){
        return userRepo.findById(id).get();
    }
}
