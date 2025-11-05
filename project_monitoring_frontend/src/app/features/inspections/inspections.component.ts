import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Inspection } from '../../core/models/models';

@Component({
  selector: 'app-inspections',
  standalone: true,
  imports: [CommonModule, TableComponent, DatePipe],
  template: `
    <h3>Inspections</h3>
    <app-table [headers]="['ID','Project','Date']" [keys]="['id','projectId','date']" [data]="rows"></app-table>
  `
})
export class InspectionsComponent implements OnInit {
  private api = inject(ApiService);
  rows: Inspection[] = [];

  ngOnInit(): void {
    this.api.get<Inspection[]>(Endpoints.inspections).subscribe(rows => this.rows = rows || []);
  }
}
