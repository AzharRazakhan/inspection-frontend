import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan',
  imports: [CommonModule, FormsModule],
  templateUrl: './plan.html',
  styleUrl: './plan.scss',
})
export class Plan implements OnInit {

  products: any[] = [];
  parameters: any[] = [];
  plans: any[] = [];

  productId = "";
  parameterId = "";
  stage = "in-process";
  sampleSize = 1;
  method = "";
  check = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((d: any) => this.products = d);
    this.api.getParameters().subscribe((d: any) => this.parameters = d);
  }

  loadPlans() {
    if (!this.productId) return;
    this.api.getPlan(this.productId, this.stage).subscribe((d: any) => this.plans = d);
  }

  addPlan() {
    if (!this.productId || !this.parameterId) return;

    this.api.addPlan({
      productId: this.productId,
      parameterId: this.parameterId,
      stage: this.stage,
      check: this.check,
      sampleSize: this.sampleSize,
      method: this.method
    }).subscribe(() => this.loadPlans());
  }
}
