import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <ul>
      <li *ngFor="let item of data" [tooltip]="item.label">
         {{ item.label }}
      </li>
    </ul>
  `
})
export class AppComponent {
  data = Array.from({ length: 700 }, (_, i) => ({
    id: i,
    label: `Value ${i}`,
  }));
}
