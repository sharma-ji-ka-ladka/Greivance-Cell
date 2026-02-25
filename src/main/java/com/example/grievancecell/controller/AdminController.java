package com.example.grievancecell.controller;

import com.example.grievancecell.entity.Grievance;
import com.example.grievancecell.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @GetMapping("/grievances/all")
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    @PutMapping("/grievance/{id}/assign/{facultyId}")
    public ResponseEntity<Grievance> assignGrievance(@PathVariable Integer id, @PathVariable Integer facultyId) {
        Optional<Grievance> optGrievance = grievanceRepository.findById(id);
        if (optGrievance.isPresent()) {
            Grievance grievance = optGrievance.get();
            grievance.setTargetFacultyId(facultyId);
            return ResponseEntity.ok(grievanceRepository.save(grievance));
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/grievance/{id}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable Integer id) {
        grievanceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}