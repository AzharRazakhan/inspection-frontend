import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  counts = {
    products: 0,
    parameters: 0,
    specs: 0,
    reports: 0
  };

  latest: any[] = [];

  productId = "";
  stage = "";
  summary: any = {
    totalReports: 0,
    totalOk: 0,
    totalNotOk: 0,
    reports: []
  };
  products: any[] = [];

  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.loadCounts();
    //this.loadLatestReports();
    this.loadSummary();
  }



  loadCounts() {
    this.api.getProducts().subscribe((res: any) => this.counts.products = res.length);
    this.api.getParameters().subscribe((res: any) => this.counts.parameters = res.length);
    //this.api.getAllSpecifications().subscribe((res: any) => this.counts.specs = res.length);
    //this.api.getReports().subscribe((res: any) => this.counts.reports = res.length);
  }


  loadLatestReports() {
    this.api.getReports().subscribe((res: any) => {
      this.latest = res.slice(0, 5); // latest 5
    });
  }

  loadSummary() {
    this.api.getReportSummary(this.productId, this.stage).subscribe((res: any) => {
      this.summary = res;
    });
  }

  getOkCount(report: any) {
    return report.entries.filter((e: any) => e.result === 'OK').length
  }

  getNotOkCount(report: any) {
    return report.entries.filter((e: any) => e.result === 'NOT OK').length
  }

}
