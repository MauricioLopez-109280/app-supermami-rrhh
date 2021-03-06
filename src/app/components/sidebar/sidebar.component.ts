import { Component, OnInit } from '@angular/core';
import { MamiService } from 'app/services/mami.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
/* original
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
*/
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/rrhh-empleados', title: 'Empleados',  icon:'person', class: '' },
    { path: '/rrhh-licencias', title: 'Licencias',  icon:'content_paste', class: '' },
    { path: '/rrhh-presentismo', title: 'Presentismo',  icon:'pending_actions', class: '' }, //grading
    { path: '/rrhh-capacitacion', title: 'Capacitacion',  icon:'menu_book', class: '' },
    { path: '/rrhh-performance', title: 'Desempeño',  icon:'trending_up', class: '' }, //
    
    { path: '/rrhh-reportes', title: 'Reportes',  icon:'analytics', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    public mamiService:MamiService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
