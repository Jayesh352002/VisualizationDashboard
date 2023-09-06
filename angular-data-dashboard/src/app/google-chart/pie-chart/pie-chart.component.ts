import { Component, OnInit } from "@angular/core";
import { GoogleChartService } from "../service/google-chart.service";
import { HttpClient } from '@angular/common/http';
import { Root } from "../model/data.model";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit {
  private gLib: any;

  public dataList : Root[] =[] ;

  constructor(private gChartService: GoogleChartService , private http: HttpClient) {
    this.gLib = this.gChartService.getGoogle();

    // Load the Visualization API and the controls package.
    this.gLib.charts.load("current", { packages: ["corechart", "table"] });

    this.loadData();

    // Set a callback to run when the Google Visualization API is loaded.
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit() {

  }

  loadData(){
    this.http.get("http://localhost:8080/api/v1/dashboard/get").subscribe((resultData: any)=>
      {
        this.dataList = resultData ;
      });
  }

  private drawChart() {
    const chart = new this.gLib.visualization.PieChart(
      document.getElementById("divPieChart")
    );
    const data = new this.gLib.visualization.DataTable();
    data.addColumn("string", "Topic");
    data.addColumn("number", "Intensity");
    for(let i=0 ; i<12 ; i+=2){
      data.addRows([
        [this.dataList[i].topic,this.dataList[i].intensity]
      ]);
    }


    const options = { title: "Sales Info" };

    chart.draw(data, options);
  }
}
