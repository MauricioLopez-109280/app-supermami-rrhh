import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormulario } from 'app/interfaces/formulario.interface';

import { EmpleadoModel } from 'app/models/empleado.model';
import { CommonService } from 'app/services/common.service';

//services
import { MamiService } from 'app/services/mami.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-rrhh-capacitacion',
  templateUrl: './rrhh-capacitacion.component.html',
  styleUrls: ['./rrhh-capacitacion.component.css']
})
export class RrhhCapacitacionComponent implements OnInit {


    constructor(
        public mamiService:MamiService,
        public commonService:CommonService,
        private router:Router,
        private toastr: ToastrService
    ) { 
        
    }
//-------------------------------------------------------------------------------------------
initPage:any;
ngOnInit(): void {

    this.loadFieldsForm();

    this.initPage = document.getElementById('initPage');
    this.animatedCollapsible();
    
    this.loadCapacitaciones();

    this.listEmpleados = this.mamiService.getEmpleados();
    
}

ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.coll[0].click();
}
cambiarEditMode(){
    this.isEditMode=!this.isEditMode

    setTimeout(() => {
        this.coll[0].click();
        this.coll[0].click();
    }, 100);
}

//-------------------------------------------------------------------------------------------
    objetoCrearModificar=new EmpleadoModel();
    listEncabezados:string[] = Object.keys(new EmpleadoModel());
    listCapacitaciones:EmpleadoModel[];
    isEditMode:boolean=false;
    fieldsForm:IFormulario[]=[];
    
    listEmpleados: Observable<Array<EmpleadoModel>>;

    loadFieldsForm(){
        this.fieldsForm.push({ key:'id' , type:'string', comboValues:null });
        this.fieldsForm.push({ key:'nombre' , type:'string', comboValues:null });
        this.fieldsForm.push({ key:'tema' , type:'combo', comboValues:['Angular','Vue','React','Node','MongoDB'] });

        this.fieldsForm.push({ key:'fecha inicio' , type:'date', comboValues:null });
        this.fieldsForm.push({ key:'fecha fin' , type:'date', comboValues:null });

        this.fieldsForm.push({ key:'activo' , type:'boolean', comboValues:null });
    }

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
