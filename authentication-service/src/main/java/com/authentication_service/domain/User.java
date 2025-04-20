package com.authentication_service.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@Builder
@Entity
@AllArgsConstructor
@Table(name="Users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @Column(unique = true)
    private String login;
    private String password;

    @Builder.Default
    @Column(nullable = false)
    private String role = "USER";

    public User(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(int customerId) {
        this.id = customerId;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
