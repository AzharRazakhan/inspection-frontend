import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  imports: [CommonModule, FormsModule],
  templateUrl: './parameters.html',
  styleUrl: './parameters.scss',
})
export class Parameters implements OnInit {
  parameters: any[] = [];
  name = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getParameters().subscribe((res: any) => this.parameters = res);
  }

  add(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.name) return;
    this.api.addParameter({ name: this.name }).subscribe(() => {
      alert("Parameter added successfully!");
      this.name = "";
      form.resetForm();
      this.load();
    });
  }


}
