import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }
  getProducts() { return this.http.get(`${this.BASE}/products`); }
  addProduct(data: any) { return this.http.post(`${this.BASE}/products`, data); }

  getParameters() { return this.http.get(`${this.BASE}/parameters`); }
  addParameter(data: any) { return this.http.post(`${this.BASE}/parameters`, data); }

  getSpecifications(productId: string) { return this.http.get(`${this.BASE}/specifications/${productId}`); }
  addSpecification(data: any) { return this.http.post(`${this.BASE}/specifications`, data); }

  getPlan(productId: string, stage: string) { return this.http.get(`${this.BASE}/plan/${productId}/${stage}`); }
  addPlan(data: any) { return this.http.post(`${this.BASE}/plan`, data); }

  addReport(data: any) { return this.http.post(`${this.BASE}/report`, data); }
  getReports(productId?: any, stage?: any) {
    return this.http.get(`${this.BASE}/report`, { params: { productId, stage } });
  }


  getAllSpecifications() {
    return this.http.get(this.BASE + '/specifications');
  }

  getReportSummary(productId: string = "", stage: string = "") {
    let url = this.BASE + "/report/summary";

    const params: any = {};
    if (productId) params.productId = productId;
    if (stage) params.stage = stage;

    return this.http.get(url, { params });
  }
}
