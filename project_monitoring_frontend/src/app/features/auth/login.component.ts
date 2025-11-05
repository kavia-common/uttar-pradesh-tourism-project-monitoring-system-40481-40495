import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login">
      <h2>Project Monitoring System</h2>
      <form (ngSubmit)="submit()">
        <label>Email</label>
        <input [(ngModel)]="email" name="email" type="email" required placeholder="you@example.com">
        <label>Password</label>
        <input [(ngModel)]="password" name="password" type="password" required placeholder="••••••••">
        <button type="submit">Sign in</button>
      </form>
    </div>
  `,
  styles: [`
    .login{ max-width:360px; margin:10vh auto; background:#fff; border:1px solid #e5e7eb; border-radius:.5rem; padding:1rem; box-shadow:0 10px 20px rgba(0,0,0,.05); }
    h2{ margin-bottom:1rem; color:#111827; }
    label{ display:block; margin:.5rem 0 .25rem; color:#374151; }
    input{ width:100%; padding:.5rem .75rem; border:1px solid #d1d5db; border-radius:.375rem; }
    button{ width:100%; margin-top:1rem; padding:.5rem .75rem; background:#3b82f6; color:#fff; border:none; border-radius:.375rem; cursor:pointer; }
    button:hover{ background:#2563eb; }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);

  email = '';
  password = '';

  submit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/';
        this.toast.success('Welcome back!');
        this.router.navigateByUrl(redirect);
      },
      error: (err) => {
        this.toast.error(err?.message || 'Login failed.');
      }
    });
  }
}
