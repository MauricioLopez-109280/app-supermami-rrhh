import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';


//easy components
import { RrhhEmpleadosComponent } from 'app/rrhh-empleados/rrhh-empleados.component';
import { RrhhLicenciasComponent } from 'app/rrhh-licencias/rrhh-licencias.component';
import { RrhhPresentismoComponent } from 'app/rrhh-presentismo/rrhh-presentismo.component';
import { RrhhCapacitacionComponent } from 'app/rrhh-capacitacion/rrhh-capacitacion.component';
import { RrhhPerformanceComponent } from 'app/rrhh-performance/rrhh-performance.component';
import { RrhhReportesComponent } from 'app/rrhh-reportes/rrhh-reportes.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },

    { path: 'rrhh-empleados',        component: RrhhEmpleadosComponent, },
    { path: 'rrhh-licencias',        component: RrhhLicenciasComponent, },
    { path: 'rrhh-presentismo',      component: RrhhPresentismoComponent, },
    { path: 'rrhh-capacitacion',     component: RrhhCapacitacionComponent, },
    { path: 'rrhh-performance',      component: RrhhPerformanceComponent, },
    { path: 'rrhh-reportes',         component: RrhhReportesComponent, },

];
