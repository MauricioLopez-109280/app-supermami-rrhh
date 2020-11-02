import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

/*
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
*/
// import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ToastrModule } from 'ngx-toastr';

//easy components
import { RrhhLicenciasComponent } from './rrhh-licencias/rrhh-licencias.component';
import { RrhhPresentismoComponent } from './rrhh-presentismo/rrhh-presentismo.component';
import { RrhhPerformanceComponent } from './rrhh-performance/rrhh-performance.component';
import { RrhhCapacitacionComponent } from './rrhh-capacitacion/rrhh-capacitacion.component';
import { RrhhReportesComponent } from './rrhh-reportes/rrhh-reportes.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    RrhhLicenciasComponent,
    RrhhPresentismoComponent,
    RrhhPerformanceComponent,
    RrhhCapacitacionComponent,
    RrhhReportesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
