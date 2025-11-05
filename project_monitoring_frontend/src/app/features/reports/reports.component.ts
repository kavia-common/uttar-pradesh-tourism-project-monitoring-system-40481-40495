import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { ReportDescriptor } from '../../core/models/models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Reports</h3>
    <ul>
      <li *ngFor="let r of reports">
        {{r.name}} - <a [href]="r.downloadUrl || '#'" target="_blank" rel="noopener">Download</a>
      </li>
    </ul>
    <p><em>Report viewer integration can be added to preview PDFs.</em></p>
  `
})
export class ReportsComponent implements OnInit {
  private api = inject(ApiService);
  reports: ReportDescriptor[] = [];

  ngOnInit(): void {
    this.api.get<ReportDescriptor[]>(Endpoints.reports).subscribe(list => this.reports = list || []);
  }
}
