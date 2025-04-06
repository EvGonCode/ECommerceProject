package com.authentication_service.services;

import com.authentication_service.domain.User;

import java.util.List;

public interface UserService{
    List<User> findAll();

    User findById(Integer id);
}
