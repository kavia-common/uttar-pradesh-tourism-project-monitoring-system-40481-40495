import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { ShellComponent } from './layout/shell.component';
import { LoginComponent } from './features/auth/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { TendersComponent } from './features/tenders/tenders.component';
import { ContractorsComponent } from './features/contractors/contractors.component';
import { FundsComponent } from './features/funds/funds.component';
import { MilestonesComponent } from './features/milestones/milestones.component';
import { InspectionsComponent } from './features/inspections/inspections.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { GeoTaggingComponent } from './features/geotagging/geotagging.component';
import { ReportsComponent } from './features/reports/reports.component';
import { SupportComponent } from './features/support/support.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent, data: { roles: ['ADMIN'] }, canActivate: [authGuard] },
      { path: 'projects', component: ProjectsComponent },
      { path: 'tenders', component: TendersComponent },
      { path: 'contractors', component: ContractorsComponent },
      { path: 'funds', component: FundsComponent },
      { path: 'milestones', component: MilestonesComponent },
      { path: 'inspections', component: InspectionsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'geotagging', component: GeoTaggingComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'support', component: SupportComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
