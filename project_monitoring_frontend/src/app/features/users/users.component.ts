import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { Endpoints } from '../../core/api/endpoints';
import { TableComponent } from '../../shared/ui/table.component';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <h3>Users</h3>
    <app-table [headers]="['ID','Name','Email','Role']" [keys]="['id','name','email','role']" [data]="rows"></app-table>
  `
})
export class UsersComponent implements OnInit {
  private api = inject(ApiService);
  rows: User[] = [];

  ngOnInit(): void {
    this.api.get<User[]>(Endpoints.users).subscribe(rows => this.rows = rows || []);
  }
}
