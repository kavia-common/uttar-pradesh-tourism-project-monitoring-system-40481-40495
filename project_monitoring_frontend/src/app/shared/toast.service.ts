import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  text: string;
  timeout?: number;
}

/**
 * Minimal toast notification service
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  private messagesSig = signal<ToastMessage[]>([]);
  // PUBLIC_INTERFACE
  messages = this.messagesSig.asReadonly();

  // PUBLIC_INTERFACE
  show(type: ToastMessage['type'], text: string, timeout = 3000) {
    const id = ++this.counter;
    const msg: ToastMessage = { id, type, text, timeout };
    this.messagesSig.update(list => [...list, msg]);
    if (timeout) {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
      const timer = g && g.setTimeout ? g.setTimeout : undefined;
      if (timer) {
        timer(() => this.remove(id), timeout);
      }
    }
  }

  // PUBLIC_INTERFACE
  success(text: string, timeout?: number) { this.show('success', text, timeout); }
  // PUBLIC_INTERFACE
  error(text: string, timeout?: number) { this.show('error', text, timeout); }
  // PUBLIC_INTERFACE
  info(text: string, timeout?: number) { this.show('info', text, timeout); }

  // PUBLIC_INTERFACE
  remove(id: number) {
    this.messagesSig.update(list => list.filter(m => m.id !== id));
  }
}
