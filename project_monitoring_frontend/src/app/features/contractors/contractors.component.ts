import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Contractor } from '../../core/models/models';

@Component({
  selector: 'app-contractors',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <h3>Contractors</h3>
    <app-table [headers]="['ID','Name','Email']" [keys]="['id','name','email']" [data]="rows"></app-table>
  `
})
export class ContractorsComponent implements OnInit {
  private api = inject(ApiService);
  rows: Contractor[] = [];

  ngOnInit(): void {
    this.api.get<Contractor[]>(Endpoints.contractors).subscribe(rows => this.rows = rows || []);
  }
}
