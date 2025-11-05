import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="overlay" *ngIf="show">
    <div class="spinner"></div>
  </div>
  `,
  styles: [`
    .overlay { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(0,0,0,.25); z-index: 999; }
    .spinner {
      width: 40px; height: 40px;
      border: 4px solid #e5e7eb;
      border-top-color: #3b82f6;
      border-radius: 9999px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingComponent {
  @Input() show = false;
}
