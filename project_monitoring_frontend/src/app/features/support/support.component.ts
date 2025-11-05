import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Support & Training</h3>
    <p>Contact: support&#64;upstdc.example</p>
    <ul>
      <li>User Guide</li>
      <li>Training Schedule</li>
    </ul>
  `
})
export class SupportComponent {}
