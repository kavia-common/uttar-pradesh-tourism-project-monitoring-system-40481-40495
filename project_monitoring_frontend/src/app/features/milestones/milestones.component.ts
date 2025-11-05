import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Milestone } from '../../core/models/models';

@Component({
  selector: 'app-milestones',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <h3>Milestones</h3>
    <app-table [headers]="['ID','Project','Name','Status']" [keys]="['id','projectId','name','status']" [data]="rows"></app-table>
  `
})
export class MilestonesComponent implements OnInit {
  private api = inject(ApiService);
  rows: Milestone[] = [];

  ngOnInit(): void {
    this.api.get<Milestone[]>(Endpoints.milestones).subscribe(rows => this.rows = rows || []);
  }
}
