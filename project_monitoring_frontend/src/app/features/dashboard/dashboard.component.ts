import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid">
      <div class="card">Projects: <strong>{{stats.projects}}</strong></div>
      <div class="card">Funds: <strong>{{stats.funds | currency:'INR'}}</strong></div>
      <div class="card">Inspections: <strong>{{stats.inspections}}</strong></div>
    </div>
  `,
  styles: [`
    .grid{ display:grid; gap:1rem; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); }
    .card{ background:#fff; border:1px solid #e5e7eb; border-radius:.5rem; padding:1rem; }
  `]
})
export class DashboardComponent {
  stats = { projects: 0, funds: 0, inspections: 0 };
}
