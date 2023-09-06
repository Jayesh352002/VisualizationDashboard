package com.example.visualizationDashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.visualizationDashboard.entity.DashboardEntity;
import com.example.visualizationDashboard.repo.DashboardRepo;

@Service
public class DashboardService {

	private DashboardRepo dashboardRepo ; 
	
	@Autowired
	public DashboardService(DashboardRepo dashboardRepo) {
		super();
		this.dashboardRepo = dashboardRepo;
	}

	public List<DashboardEntity> getData() {
		return dashboardRepo.findAll();
	}
	
	public DashboardEntity getOneRecord(int id) {
		
		return dashboardRepo.getDataById(id);
	}

}
