package com.example.grievancecell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GrievanceCellApplication {
    public static void main(String[] args) {
        SpringApplication.run(GrievanceCellApplication.class, args);
    }
}