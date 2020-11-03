import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormulario } from 'app/interfaces/formulario.interface';
import { CapacitacionModel } from 'app/models/capacitacion.model';

import { EmpleadoModel } from 'app/models/empleado.model';
import { CapacitacionService } from 'app/services/capacitacion.service';
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

    objectoCrearEditar=new CapacitacionModel();
    listEncabezados:string[] = Object.keys(this.objectoCrearEditar);
    
    isEditMode:boolean=false;
    fieldsForm:IFormulario[]=[];
    
    listEmpleados: Observable<Array<EmpleadoModel>>;
    listCapacitaciones: Observable<Array<CapacitacionModel>>;
    
    // listCapacitaciones:CapacitacionModel[];

    constructor(
        public mamiService:MamiService,
        public capacitacionService:CapacitacionService,
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
    this.listCapacitaciones = this.capacitacionService.getAll();
    
}

ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.coll[0].click();
}
cambiarEditMode(){
    this.isEditMode=!this.isEditMode

    this.coll0click();
}

coll0click(){
    setTimeout(() => {
        this.coll[0].click();
        this.coll[0].click();
    }, 100);
}
coll1click(){
    setTimeout(() => {
        this.coll[1].click();
        this.coll[1].click();
    }, 300);
}

//-------------------------------------------------------------------------------------------
clean(){
    this.objectoCrearEditar = new CapacitacionModel();
    this.isEditMode = false;
}

//-------------------------------------------------------------------------------------------


    loadFieldsForm(){
        this.fieldsForm.push({ key:'id' , type:'string', comboValues:null });
        this.fieldsForm.push({ key:'nombre' , type:'string', comboValues:null });
        this.fieldsForm.push({ key:'tema' , type:'combo', comboValues:['Angular','Vue','React','Node','MongoDB'] });

        this.fieldsForm.push({ key:'fechaInicio' , type:'date', comboValues:null });
        this.fieldsForm.push({ key:'fechaFin' , type:'date', comboValues:null });

        this.fieldsForm.push({ key:'activo' , type:'boolean', comboValues:null });
    }

//-------------------------------------------------------------------------------------------
    loadCapacitaciones(){
        // this.loading = true;

        // this.capacitacionService.getAll()
        //     .subscribe( resp => {
        //         // console.log(resp)
        //         this.listCapacitaciones = resp;
        //         // this.loading = false;
        //     });
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
    //RECIBIR MENSAJES

    gridgral_receiveMessageEdit($event) {
        // console.log($event)

        this.initPage.scrollIntoView();
        this.objectoCrearEditar =  $event;
        this.isEditMode = true;
        this.coll0click();
    }
    gridgral_receiveMessageBuscar($event) {
        // console.log($event)

        this.listCapacitaciones = this.capacitacionService.getAll();
        this.coll1click();
    }
    gridgral_receiveMessageDelete($event) {
        // console.log($event)

        this.delete($event);
    }

    formgen_receiveMessageCrearEditar($event) {
        // console.log($event)

        this.createUpdate($event);

    }
    formgen_receiveMessageCancelar($event) {
        // console.log($event)

        this.clean();
    }

//-------------------------------------------------------------------------------------------


    createUpdate(objeto:CapacitacionModel){
        let messaje:string;
        if(objeto.id){
            messaje = 'updated'
        }else{
            messaje = 'created'
        }
        
        this.capacitacionService.createUpdate(objeto)
        .subscribe( resp => {

            if(messaje==='created'){
                this.toastr.success(
                    `capacitacion ${ objeto.nombre } fue creada`, 
                    "Notification",
                    {
                        closeButton: true,
                        extendedTimeOut: 300,
                        positionClass: 'toast-bottom-right'
                    }
                );
            }
            else if(messaje==='updated'){
                this.toastr.warning(
                    `capacitacion ${ objeto.nombre } fue modificada`, 
                    "Notification",
                    {
                        closeButton: true,
                        extendedTimeOut: 300,
                        positionClass: 'toast-bottom-right'
                    }
                );
            }
            this.clean();

            this.listCapacitaciones = this.capacitacionService.getAll();
            this.coll1click();
        });
    }
  

    delete( objeto:CapacitacionModel ){
        
        this.capacitacionService.deleteConfirm(objeto)
            .then( resp => {

                if(resp.value){
                    
                    this.capacitacionService.delete(objeto.id)
                        .subscribe( resp => {
                            
                            this.toastr.error(
                                `Capacitacion eliminada`, 
                                "Notification",
                                {
                                    enableHtml: true,
                                    closeButton: true,
                                    extendedTimeOut: 300,
                                    positionClass: 'toast-bottom-left'
                                }
                            );

                            this.listCapacitaciones = this.capacitacionService.getAll();
                            this.coll1click();

                        });

                }
            });

    }


}
