package com.example.grievancecell.repository;

import com.example.grievancecell.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface GrievanceRepository extends JpaRepository<Grievance, Integer> {
    List<Grievance> findByStatusAndCreatedAtBefore(String status, LocalDateTime date);
}