import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection',
  imports: [CommonModule, FormsModule],
  templateUrl: './inspection.html',
  styleUrl: './inspection.scss',
})
export class Inspection implements OnInit {

  products: any[] = [];
  plans: any[] = [];
  entries: any[] = [];

  productId = "";
  stage = "in-process";
  inspector = "";

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res: any) => this.products = res);
  }

  loadPlan() {
    if (!this.productId) return;

    this.api.getPlan(this.productId, this.stage).subscribe((res: any) => {
      this.plans = res;

      // Build dynamic entries
      this.entries = this.plans.map((p: any) => ({
        parameterId: p.parameterId._id,
        observations: Array(p.sampleSize).fill(""),
        remarks: "",
        result: ""
      }));
    });
  }

  // Auto result calculation
  calculateResult(entry: any, plan: any) {
    const allOk = entry.observations.every((val: number) =>
      val >= plan.parameterId.lowerLimit && val <= plan.parameterId.upperLimit
    );
    return allOk ? "OK" : "NOT OK";
  }

  submitReport() {
    // Attach result
    this.entries = this.entries.map((e, i) => ({
      ...e,
      result: this.calculateResult(e, this.plans[i])
    }));

    const body = {
      productId: this.productId,
      stage: this.stage,
      inspectedBy: this.inspector,
      entries: this.entries
    };

    this.api.addReport(body).subscribe(() => {
      alert("Report Submitted Successfully!");
      this.entries = [];
      this.plans = [];
      this.productId = "";
    }
    );

    this.router.navigate(['/dashboard'])
  }

}
