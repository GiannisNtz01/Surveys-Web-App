package com.example.authdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String getAdminDashboardData() {
        return "Welcome, Admin! This is your dashboard data.";
    }

    @GetMapping("/users")
    public String getAllUsers() {
        return "List of all users (Admin view).";
    }
}