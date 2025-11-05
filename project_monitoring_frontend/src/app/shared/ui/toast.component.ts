import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toasts">
      <div *ngFor="let m of msgs()" class="toast" [class.success]="m.type==='success'" [class.error]="m.type==='error'">
        {{ m.text }}
      </div>
    </div>
  `,
  styles: [`
    .toasts { position: fixed; top: 1rem; right: 1rem; display: flex; flex-direction: column; gap: .5rem; z-index: 1000; }
    .toast { padding: .75rem 1rem; background: #111827; color: #f9fafb; border-left: 4px solid #3b82f6; border-radius: .25rem; box-shadow: 0 2px 8px rgba(0,0,0,.2); }
    .toast.success { border-left-color: #06b6d4; }
    .toast.error { border-left-color: #EF4444; }
  `]
})
export class ToastsComponent {
  private service = inject(ToastService);
  msgs = computed(() => this.service.messages());
}
