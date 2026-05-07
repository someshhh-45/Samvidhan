package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // ENABLE CORS
                .cors(Customizer.withDefaults())

                // DISABLE CSRF
                .csrf(csrf -> csrf.disable())

                // JWT STATELESS SESSION
                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // AUTH RULES
                .authorizeHttpRequests(auth -> auth

                        // =================================
                        // PUBLIC AUTH APIs
                        // =================================

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // =================================
                        // CASE APIs
                        // =================================

                        .requestMatchers(
                                "/cases/**",
                                "/api/cases/**",
                                "/cases/upload",
                                "/api/cases/upload",
                                "/cases/process/**",
                                "/api/cases/process/**"
                        ).permitAll()

                        // =================================
                        // DASHBOARD APIs
                        // FIXED HERE
                        // =================================

                        .requestMatchers(
                                "/api/dashboard/**"
                        ).permitAll()

                        // =================================
                        // REVIEW VERIFY / REJECT
                        // =================================

                        .requestMatchers(
                                "/api/reviews/verify/**",
                                "/api/reviews/reject/**"
                        ).permitAll()

                        // =================================
                        // REVIEW APIs
                        // =================================

                        .requestMatchers(
                                "/api/reviews/**"
                        ).permitAll()

                        // =================================
                        // ALL OTHER APIs
                        // =================================

                        .anyRequest()
                        .authenticated()
                )

                // JWT FILTER
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // =========================================
    // AUTH MANAGER
    // =========================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }

    // =========================================
    // GLOBAL CORS CONFIG
    // =========================================

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(
                    CorsRegistry registry
            ) {

                registry.addMapping("/**")

                        .allowedOrigins(
                                "http://localhost:3000",
                                "http://localhost:3001",
                                "http://localhost:5173",
                                "http://localhost:8083"
                        )

                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "PATCH",
                                "DELETE",
                                "OPTIONS"
                        )

                        .allowedHeaders("*")

                        .allowCredentials(false);
            }
        };
    }
}