import { Component, OnInit } from "@angular/core";
import { GoogleChartService } from "../service/google-chart.service";
import { HttpClient } from '@angular/common/http';
import { Root } from "../model/data.model";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit {

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
  /*private gLib: any;

  public dataList : Root[] =[] ;

  constructor(private gChartService: GoogleChartService , private http: HttpClient) {
    this.gLib = this.gChartService.getGoogle();

    // Load the Visualization API and the controls package.
    this.gLib.charts.load("current", { packages: ["corechart", "table"] });

    this.loadData();

    // Set a callback to run when the Google Visualization API is loaded.
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit() {}

  loadData(){
    this.http.get("http://localhost:8080/api/v1/dashboard/get").subscribe((resultData: any)=>
      {
        this.dataList = resultData ;
      });
  }

  // method using the Google Charts library using the gLib variable
  // create a new chart using the LineChart method, passing in the container div to show the line chart.
  /*
  private drawChart() {


    const data = this.gLib.visualization.arrayToDataTable([
      ["Year", "Sales", "Expenses"],
      ["2004", 1000, 400],
      ["2005", 1170, 460],
      ["2006", 660, 1120],
      ["2007", 1030, 540],
    ]);

    const options = {
      title: "Company Performance",
      curveType: "function",
      legend: { position: "bottom" },
    };

    const chart = new this.gLib.visualization.LineChart(
      document.getElementById("divLineChart")
    );

    chart.draw(data, options);
  }

  private drawChart() {
    const chart = new this.gLib.visualization.LineChart(
      document.getElementById("divLineChart")
    );
    const data = new this.gLib.visualization.DataTable();
    data.addColumn("number", "Start Year");
    data.addColumn("number", "Impact");
    data.addColumn("number", "Releavance");
    for(let i=0 ; i<10 ; i+=2){
      data.addRows([
        [this.dataList[i].start_year,this.dataList[i].impact,this.dataList[i].relavance]
      ]);
    }


    const options = {
      title: "Company Performance",
      curveType: "function",
      legend: { position: "bottom" },
    };

    chart.draw(data, options);
  }*/
}
