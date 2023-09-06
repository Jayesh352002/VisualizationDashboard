package com.example.visualizationDashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.visualizationDashboard.entity.DashboardEntity;
import com.example.visualizationDashboard.service.DashboardService;

@RestController
@RequestMapping("api/v1/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class Dashboard {

	@Autowired
	private DashboardService dashboardService ; 
	
	@GetMapping(path = "/get")
	public List<DashboardEntity> getData(){
		return dashboardService.getData();
	}
	
	@GetMapping(path = "/getone")
	public DashboardEntity getOneRecord(){
		return dashboardService.getOneRecord(2);
	}
	
}
