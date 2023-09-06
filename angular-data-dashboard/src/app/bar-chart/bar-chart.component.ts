import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Root } from '../google-chart/model/data.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {

  data! : Root ;

  public dataList : Root[] =[] ;

  public goodsData: Root[] = [] ;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.http.get("http://localhost:8080/api/v1/dashboard/get").subscribe((resultData: any)=>
      {
        this.dataList = resultData ;

        this.createSvg();
        this.drawBars(this.dataList);

      });
  }

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.city))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([10, 120])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.city))
    .attr("y", (d: any) => y(d.intensity))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.intensity))
    .attr("fill", "#d04a35");
  }
}
