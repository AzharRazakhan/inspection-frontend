import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-specification',
  imports: [CommonModule, FormsModule],
  templateUrl: './specification.html',
  styleUrl: './specification.scss',
})
export class Specification implements OnInit {

  products: any[] = [];
  parameters: any[] = [];
  specs: any[] = [];

  productId = "";
  parameterId = "";
  nominal: any = "";
  upperLimit: any = "";
  lowerLimit: any = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.api.getProducts().subscribe((res: any) => this.products = res);
    this.api.getParameters().subscribe((res: any) => this.parameters = res);
  }

  loadSpecs() {
    if (!this.productId) return;
    this.api.getSpecifications(this.productId)
      .subscribe((res: any) => this.specs = res);
  }

  addSpec(form: NgForm) {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    const lower = Number(this.lowerLimit);
    const upper = Number(this.upperLimit);
    const nominal = Number(this.nominal);
    if (lower >= upper) {
      alert("Lower Limit must be less than Upper Limit.");
      return;
    }

    const body = {
      productId: this.productId,
      parameterId: this.parameterId,
      nominal,
      upperLimit: upper,
      lowerLimit: lower
    };

    this.api.addSpecification(body).subscribe(() => {
      alert("Specification added successfully!");

      this.nominal = "";
      this.upperLimit = "";
      this.lowerLimit = "";
      this.parameterId = "";

      form.resetForm();
      this.loadSpecs();
    });
  }



}
