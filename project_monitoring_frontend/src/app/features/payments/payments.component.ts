import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Payment } from '../../core/models/models';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, TableComponent, CurrencyPipe],
  template: `
    <h3>Payments</h3>
    <app-table [headers]="['ID','Project','Amount','Paid On']" [keys]="['id','projectId','amount','paidOn']" [data]="rows"></app-table>
  `
})
export class PaymentsComponent implements OnInit {
  private api = inject(ApiService);
  rows: Payment[] = [];

  ngOnInit(): void {
    this.api.get<Payment[]>(Endpoints.payments).subscribe(rows => this.rows = rows || []);
  }
}
