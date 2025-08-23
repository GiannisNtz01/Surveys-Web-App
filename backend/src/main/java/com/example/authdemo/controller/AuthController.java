package com.example.authdemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    @GetMapping("/status")
    public ResponseEntity<?> getAuthStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String && authentication.getPrincipal().equals("anonymousUser"))) {
            String role = authentication.getAuthorities().stream()
                    .filter(a -> a.getAuthority().startsWith("ROLE_"))
                    .map(a -> a.getAuthority().substring(5).toLowerCase())
                    .findFirst()
                    .orElse("user");

            return ResponseEntity.ok().body(
                    "{\"authenticated\": true, \"username\": \"" + authentication.getName() + "\", \"role\": \"" + role + "\"}"
            );
        }
        return ResponseEntity.ok().body("{\"authenticated\": false}");
    }
}