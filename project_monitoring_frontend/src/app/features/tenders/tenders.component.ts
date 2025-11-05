import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Tender } from '../../core/models/models';

@Component({
  selector: 'app-tenders',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <h3>Tenders</h3>
    <app-table [headers]="['ID','Title','Status']" [keys]="['id','title','status']" [data]="rows"></app-table>
  `
})
export class TendersComponent implements OnInit {
  private api = inject(ApiService);
  rows: Tender[] = [];

  ngOnInit(): void {
    this.api.get<Tender[]>(Endpoints.tenders).subscribe(rows => this.rows = rows || []);
  }
}
