import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Usuarios', url: '/user-list', icon: 'people' },
    { title: 'Temas', url: '/theme-list', icon: 'paper-plane' }
  ];
  constructor() {}
}
