package com.example.grievancecell.controller;

import com.example.grievancecell.entity.User;
import com.example.grievancecell.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginDetails) {
        User user = userRepository.findByEmail(loginDetails.getEmail());
        if (user != null && user.getPasswordHash().equals(loginDetails.getPasswordHash())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.save(user));
    }
}