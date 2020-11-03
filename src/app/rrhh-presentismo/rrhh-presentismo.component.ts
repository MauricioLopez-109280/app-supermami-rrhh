import { Component, OnInit } from '@angular/core';

import {ThemePalette} from '@angular/material/core';
import { PresentismoModel } from 'app/models/presentismo.model';
import { CommonService } from 'app/services/common.service';

export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
}

@Component({
  selector: 'app-rrhh-presentismo',
  templateUrl: './rrhh-presentismo.component.html',
  styleUrls: ['./rrhh-presentismo.component.css']
})
export class RrhhPresentismoComponent implements OnInit {

    listDatos:any[]=[];

    constructor(
        public commonService:CommonService
    ) {

        // console.log(this.commonService.bodyRows(10) )

     }

    ngOnInit(){
        this.reloadDatos(0);
    }


    reloadDatos(count:number){
        this.listDatos = this.commonService.generarDatosRandomPresentismo(count);
    }

    favoriteSeason: string;
    seasons: string[] = [
        'Todos',
        'Filtrar por falta injustificada y/o llegadas tardes', 
        'Filtrar por demora promedio', 
        'Filtrar por empleado'
    ];

    buscar(){
        this.reloadDatos(10);
    }

    limpiar(){
        this.listDatos = [];
    }


    listEncabezados:string[] = Object.keys(new PresentismoModel());


}
