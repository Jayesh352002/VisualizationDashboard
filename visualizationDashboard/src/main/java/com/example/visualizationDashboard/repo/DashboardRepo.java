package com.example.visualizationDashboard.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.visualizationDashboard.entity.DashboardEntity;

@EnableJpaRepositories
@Repository
public interface DashboardRepo extends JpaRepository<DashboardEntity , Integer> {

	DashboardEntity getDataById(int id);
}
