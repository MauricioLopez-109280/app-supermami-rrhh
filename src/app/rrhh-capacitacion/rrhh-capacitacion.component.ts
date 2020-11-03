import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { EmpleadoModel } from 'app/models/empleado.model';

//services
import { MamiService } from 'app/services/mami.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rrhh-capacitacion',
  templateUrl: './rrhh-capacitacion.component.html',
  styleUrls: ['./rrhh-capacitacion.component.css']
})
export class RrhhCapacitacionComponent implements OnInit {


    constructor(
        public mamiService:MamiService,
        private router:Router,
        private toastr: ToastrService
    ) { 

    }

    objetoCrearModificar=new EmpleadoModel();
    listEncabezados:string[] = Object.keys(new EmpleadoModel());
    listCapacitaciones:EmpleadoModel[];
    isEditMode:boolean=false;


//-------------------------------------------------------------------------------------------
    loadCapacitaciones(){
        // this.loading = true;

        this.mamiService.getEmpleados()
            .subscribe( resp => {
                // console.log(resp)
                this.listCapacitaciones = resp;
                // this.loading = false;
            });
    }
//-------------------------------------------------------------------------------------------
    coll:any;
    animatedCollapsible(){
        this.coll = document.getElementsByClassName("collapsible capacitacion");

        for (let i = 0; i < this.coll.length; i++) {
            this.coll[i].addEventListener("click", function() {
            this.classList.toggle("activeColapsible");
            var content = this.nextElementSibling;
            // console.log(content.style.maxHeight)
            if (content.style.maxHeight && !this.deplegarSiempre){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
          });
        }
    }
//-------------------------------------------------------------------------------------------
    initPage:any;
    ngOnInit(): void {

        this.initPage = document.getElementById('initPage');
        this.animatedCollapsible();
        this.coll[0].click();

        this.loadCapacitaciones();
    }
//-------------------------------------------------------------------------------------------

    sendForm(form : NgForm){

    }

//-------------------------------------------------------------------------------------------

    // editar( objetoCrearModificar:EmpleadoModel ){
    //     this.initPage.scrollIntoView();

    //     this.objetoCrearModificar = objetoCrearModificar;
    //     // this.openCloseDiv('CrearEditarEmpleado','CREAR_EDITAR',true)
    // }
//-------------------------------------------------------------------------------------------
    // idEditar:string;
    receiveMessage($event) {
        // this.idEditar = $event
        this.initPage.scrollIntoView();
        this.objetoCrearModificar =  $event;
        this.isEditMode = true;
    }
//-------------------------------------------------------------------------------------------
    clean(){
        this.objetoCrearModificar = new EmpleadoModel();
        this.isEditMode = false;
    }
//-------------------------------------------------------------------------------------------



}
