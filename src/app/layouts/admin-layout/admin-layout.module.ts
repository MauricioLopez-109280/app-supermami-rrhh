import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

//angular matirial
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';


//easy components
import { RrhhEmpleadosComponent } from '../../rrhh-empleados/rrhh-empleados.component';
import { RrhhLicenciasComponent } from '../../rrhh-licencias/rrhh-licencias.component';
import { RrhhPresentismoComponent } from '../../rrhh-presentismo/rrhh-presentismo.component';
import { RrhhCapacitacionComponent } from '../../rrhh-capacitacion/rrhh-capacitacion.component';
import { RrhhPerformanceComponent } from '../../rrhh-performance/rrhh-performance.component';
import { RrhhReportesComponent } from '../../rrhh-reportes/rrhh-reportes.component';
import { GridgralComponent } from 'app/gridgral/gridgral.component';
import { FormgenericoComponent } from 'app/formgenerico/formgenerico.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDatepickerModule,MatNativeDateModule,
    MatRadioModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    // TypographyComponent,
    // IconsComponent,
    NotificationsComponent,
    // UpgradeComponent,

    RrhhEmpleadosComponent, 
    RrhhLicenciasComponent, 
    RrhhPresentismoComponent,
    RrhhCapacitacionComponent,
    RrhhPerformanceComponent,
    RrhhReportesComponent,

    GridgralComponent,
    FormgenericoComponent
  ]
})

export class AdminLayoutModule {}
