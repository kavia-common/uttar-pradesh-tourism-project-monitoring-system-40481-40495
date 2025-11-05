import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th *ngFor="let h of headers">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of data">
            <td *ngFor="let key of keys">{{ row?.[key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-responsive { overflow: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: .5rem .75rem; border-bottom: 1px solid #e5e7eb; text-align: left; }
    thead th { background: #f3f4f6; font-weight: 600; }
  `]
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() keys: string[] = [];
  @Input() data: any[] = [];
}
