package com.example.grievancecell.controller;

import com.example.grievancecell.entity.Grievance;
import com.example.grievancecell.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @PostMapping("/grievance")
    public Grievance createGrievance(@RequestBody Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    @GetMapping("/grievances/{studentId}")
    public List<Grievance> getStudentGrievances(@PathVariable Integer studentId) {
        return grievanceRepository.findAll().stream()
                .filter(g -> "PUBLIC".equals(g.getType()) || studentId.equals(g.getStudentId()))
                .collect(Collectors.toList());
    }

    @PutMapping("/grievance/{id}/resolve")
    public ResponseEntity<String> resolveGrievance(@PathVariable Integer id, @RequestParam Integer studentId) {
        Optional<Grievance> optGrievance = grievanceRepository.findById(id);
        if (optGrievance.isPresent()) {
            Grievance grievance = optGrievance.get();
            if (grievance.getStudentId().equals(studentId)) {
                grievance.setStatus("RESOLVED");
                grievanceRepository.save(grievance);
                return ResponseEntity.ok("RESOLVED");
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/grievance/{id}/upvote")
    public ResponseEntity<Grievance> upvoteGrievance(@PathVariable Integer id) {
        Optional<Grievance> optGrievance = grievanceRepository.findById(id);
        if (optGrievance.isPresent()) {
            Grievance grievance = optGrievance.get();
            if ("PUBLIC".equals(grievance.getType())) {
                grievance.setUpvotes(grievance.getUpvotes() + 1);
                return ResponseEntity.ok(grievanceRepository.save(grievance));
            }
        }
        return ResponseEntity.badRequest().build();
    }
}