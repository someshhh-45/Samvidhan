package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditService;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElse(null);

        if (
                user == null
                        ||
                        !user.getPassword().equals(
                                request.getPassword()
                        )
        ) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid credentials");
        }

        // AUDIT LOG
        auditService.logAction(

                AuditAction.LOGIN,

                user.getEmail(),

                "User logged into system"
        );

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return ResponseEntity.ok(

                new AuthResponse(

                        token,

                        user
                )
        );
    }

    // CURRENT USER
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(

            @RequestHeader("Authorization")
            String authHeader
    ) {

        try {

            String token =
                    authHeader.replace(
                            "Bearer ",
                            ""
                    );

            String email =
                    jwtService.extractEmail(
                            token
                    );

            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .badRequest()
                        .body("User not found");
            }

            return ResponseEntity.ok(user);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid token");
        }
    }
}