import { Component, OnInit } from "@angular/core";
import { GoogleChartService } from "../service/google-chart.service";
import { HttpClient } from '@angular/common/http';
import { Root } from "../model/data.model";

@Component({
  selector: "app-table-chart",
  templateUrl: "./table-chart.component.html",
  styleUrls: ["./table-chart.component.css"],
})
export class TableChartComponent implements OnInit {
  private gLib: any;

  public dataList : Root[] =[] ;

  constructor(private gChartService: GoogleChartService, private http: HttpClient) {
    this.gLib = this.gChartService.getGoogle();

    this.gLib.charts.load("current", { packages: ["corechart", "table"] });

    this.loadData();

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
    const chart = new this.gLib.visualization.Table(
      document.getElementById("divTableChart")
    );
    const data = new this.gLib.visualization.DataTable();

    data.addColumn("number", "End Year");
    data.addColumn("string", "Topic");
    data.addColumn("string", "Region");
    data.addColumn("number", "Likelihood");

    for(let j=0 ; j<20 ; j++){
      data.addRows([
        [this.dataList[j].end_year , this.dataList[j].topic , this.dataList[j].region , this.dataList[j].likelihood],
      ]);
    }

    const options = {
      title: "Sales Tabular Data",
      width: "100%",
      height: "100%",
    };
    chart.draw(data, options);
  }
}
