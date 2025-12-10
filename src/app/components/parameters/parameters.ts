import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  add() {
    if (!this.name) return;
    this.api.addParameter({ name: this.name }).subscribe(() => {
      this.name = "";
      this.load();
    });
  }
}
