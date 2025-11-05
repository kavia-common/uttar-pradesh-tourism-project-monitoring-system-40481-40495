import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="uploader">
      <input type="file" [attr.accept]="accept" [multiple]="multiple" (change)="onChange($event)" hidden>
      <span>{{label}}</span>
    </label>
  `,
  styles: [`
    .uploader { display: inline-flex; align-items: center; gap: .5rem; background: #111827; color: #f9fafb; border-radius: .375rem; padding: .5rem .75rem; cursor: pointer; border: 1px solid #374151; }
    .uploader:hover { background: #0b1220; }
  `]
})
export class FileUploadComponent {
  @Input() label = 'Upload file';
  @Input() accept?: string;
  @Input() multiple = false;
  @Output() files = new EventEmitter<any>();

  onChange(e: any) {
    const input = e?.target as any;
    const selected = input?.files as any;
    if (selected) {
      this.files.emit(selected);
      if (input) { input.value = ''; }
    }
  }
}
