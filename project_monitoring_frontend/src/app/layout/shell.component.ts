import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ToastsComponent } from '../shared/ui/toast.component';

interface NavItem {
  path: string;
  label: string;
  icon?: string;
  roles?: string[];
  children?: NavItem[];
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, ToastsComponent],
  template: `
  <div class="layout">
    <aside [class.collapsed]="collapsed()">
      <div class="brand">
        <span class="logo">UPSTDC</span>
      </div>
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/users" routerLinkActive="active" *ngIf="hasRole(['ADMIN'])">Users</a>
        <a routerLink="/projects" routerLinkActive="active">Projects</a>
        <a routerLink="/tenders" routerLinkActive="active">Tenders</a>
        <a routerLink="/contractors" routerLinkActive="active">Contractors</a>
        <a routerLink="/funds" routerLinkActive="active">Funds</a>
        <a routerLink="/milestones" routerLinkActive="active">Milestones</a>
        <a routerLink="/inspections" routerLinkActive="active">Inspections</a>
        <a routerLink="/payments" routerLinkActive="active">Payments</a>
        <a routerLink="/geotagging" routerLinkActive="active">Geo-Tagging</a>
        <a routerLink="/reports" routerLinkActive="active">Reports</a>
        <a routerLink="/support" routerLinkActive="active">Support/Training</a>
      </nav>
    </aside>
    <section class="main">
      <header>
        <button class="toggle" (click)="collapsed.set(!collapsed())">☰</button>
        <div class="spacer"></div>
        <div class="user">
          <span>{{ auth.user()?.name || 'Guest' }}</span>
          <button *ngIf="auth.isAuthenticated()" (click)="auth.logout()">Logout</button>
        </div>
      </header>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </section>
  </div>
  <app-toasts></app-toasts>
  `,
  styles: [`
    .layout{ display:flex; min-height:100vh; background:#f9fafb; }
    aside{ width:240px; background:#111827; color:#f9fafb; transition: width .2s; }
    aside.collapsed{ width:64px; }
    .brand{ padding:1rem; font-weight:700; letter-spacing:.05em; border-bottom:1px solid #1f2937; }
    nav{ display:flex; flex-direction:column; padding:.5rem; }
    nav a{ color:#e5e7eb; text-decoration:none; padding:.5rem .75rem; border-radius:.375rem; }
    nav a.active, nav a:hover{ background:#1f2937; }
    .main{ flex:1; display:flex; flex-direction:column; }
    header{ height:56px; background:#ffffff; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; gap:.5rem; padding:0 .75rem; }
    .toggle{ background:#3b82f6; color:#fff; border:none; border-radius:.375rem; padding:.25rem .5rem; cursor:pointer; }
    .spacer{ flex:1; }
    .user button{ margin-left:.5rem; background:#EF4444; color:#fff; border:none; border-radius:.375rem; padding:.25rem .5rem; cursor:pointer; }
    .content{ padding:1rem; }
    @media (max-width: 768px){ aside{ position:fixed; z-index:20; height:100%; } .main{ margin-left:64px; } }
  `]
})
export class ShellComponent {
  auth = inject(AuthService);
  collapsed = signal(false);

  hasRole(roles: string[]) {
    const r = this.auth.role();
    return !!r && roles.includes(r);
  }
}
