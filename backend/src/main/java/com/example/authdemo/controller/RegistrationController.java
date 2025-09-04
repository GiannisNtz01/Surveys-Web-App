package com.example.authdemo.controller;

import com.example.authdemo.model.User;
import com.example.authdemo.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        try {
            User user = registrationService.registerUser(
                    request.getUsername(),
                    request.getPassword(),
                    request.getRole()
            );

            return ResponseEntity.ok().body(
                    new RegistrationResponse(true, "User registered successfully", user.getUsername())
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    new RegistrationResponse(false, e.getMessage(), null)
            );
        }
    }

    // Request and Response DTOs
    public static class RegistrationRequest {
        private String username;
        private String password;
        private String role;

        // Getters and Setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class RegistrationResponse {
        private boolean success;
        private String message;
        private String username;

        public RegistrationResponse(boolean success, String message, String username) {
            this.success = success;
            this.message = message;
            this.username = username;
        }

        // Getters
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getUsername() { return username; }
    }
}