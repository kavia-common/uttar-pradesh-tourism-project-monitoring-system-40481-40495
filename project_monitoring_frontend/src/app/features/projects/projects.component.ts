import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { Project } from '../../core/models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <h3>Projects</h3>
    <app-table [headers]="['ID','Title','Status']" [keys]="['id','title','status']" [data]="rows"></app-table>
  `
})
export class ProjectsComponent implements OnInit {
  private api = inject(ApiService);
  rows: Project[] = [];

  ngOnInit(): void {
    this.api.get<Project[]>(Endpoints.projects).subscribe(rows => this.rows = rows || []);
  }
}
