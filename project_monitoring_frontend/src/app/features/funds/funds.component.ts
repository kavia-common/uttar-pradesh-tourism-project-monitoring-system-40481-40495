import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Fund } from '../../core/models/models';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule, TableComponent, CurrencyPipe],
  template: `
    <h3>Funds</h3>
    <app-table [headers]="['ID','Project','Amount']" [keys]="['id','projectId','amount']" [data]="rows"></app-table>
  `
})
export class FundsComponent implements OnInit {
  private api = inject(ApiService);
  rows: Fund[] = [];

  ngOnInit(): void {
    this.api.get<Fund[]>(Endpoints.funds).subscribe(rows => this.rows = rows || []);
  }
}
