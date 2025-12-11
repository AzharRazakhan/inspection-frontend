import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  products: any[] = [];
  clientCode = "";
  name = "";
  description = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getProducts().subscribe((res: any) => this.products = res);
  }

  addProduct(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.api.addProduct({
      clientCode: this.clientCode,
      name: this.name,
      description: this.description
    }).subscribe(() => {
      alert("Product added successfully!");
      form.resetForm();
      this.load();
    });
  }
}
