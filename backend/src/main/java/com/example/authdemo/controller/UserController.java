package com.example.authdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/dashboard")
    public String getUserDashboardData() {
        return "Welcome, User! This is your dashboard data.";
    }

    @GetMapping("/profile")
    public String getUserProfile() {
        return "User profile information.";
    }
}