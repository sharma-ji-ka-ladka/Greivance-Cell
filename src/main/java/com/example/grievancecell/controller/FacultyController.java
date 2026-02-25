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
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @GetMapping("/grievances/department/{departmentName}")
    public List<Grievance> getDepartmentGrievances(@PathVariable String departmentName) {
        return grievanceRepository.findAll().stream()
                .filter(g -> departmentName.equals(g.getTargetDepartment()))
                .collect(Collectors.toList());
    }

    @PutMapping("/grievance/{id}/resolve")
    public ResponseEntity<String> resolveGrievance(@PathVariable Integer id) {
        Optional<Grievance> optGrievance = grievanceRepository.findById(id);
        if (optGrievance.isPresent()) {
            Grievance grievance = optGrievance.get();
            grievance.setStatus("RESOLVED");
            grievanceRepository.save(grievance);
            return ResponseEntity.ok("RESOLVED");
        }
        return ResponseEntity.badRequest().build();
    }
}