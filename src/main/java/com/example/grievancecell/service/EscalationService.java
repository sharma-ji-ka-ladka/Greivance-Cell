package com.example.grievancecell.service;

import com.example.grievancecell.entity.Grievance;
import com.example.grievancecell.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EscalationService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void escalateOverdueGrievances() {
        LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(3);

        List<Grievance> overdueGrievances = grievanceRepository
                .findByStatusAndCreatedAtBefore("PENDING", threeDaysAgo);

        for (Grievance grievance : overdueGrievances) {
            grievance.setStatus("ESCALATED");
            grievanceRepository.save(grievance);

        }
    }
}