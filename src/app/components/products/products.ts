import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  addProduct() {
    if (!this.clientCode || !this.name) return alert("All fields required!");

    this.api.addProduct({
      clientCode: this.clientCode,
      name: this.name,
      description: this.description
    }).subscribe(() => {
      this.clientCode = this.name = this.description = "";
      this.load();
    });
  }
}
