import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Geo-Tagging</h3>
    <p>Click on the map placeholder to set coordinates (SSR-safe mock).</p>
    <div class="map" (click)="setMock()">
      <div>Lat: {{lat ?? '—'}}, Lng: {{lng ?? '—'}}</div>
      <small>(This is a placeholder; integrate map library later.)</small>
    </div>
  `,
  styles: [`
    .map{ height:300px; border:2px dashed #93c5fd; background: linear-gradient(135deg, #eff6ff, #ffffff); display:grid; place-items:center; border-radius:.5rem; }
  `]
})
export class GeoTaggingComponent {
  lat: number | null = null;
  lng: number | null = null;

  setMock() {
    this.lat = 26.8467;
    this.lng = 80.9462;
  }
}
