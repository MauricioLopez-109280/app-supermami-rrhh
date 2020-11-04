
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormulario } from 'app/interfaces/formulario.interface';
import { CapacitacionModel } from 'app/models/capacitacion.model';

import { EmpleadoModel } from 'app/models/empleado.model';
import { EmpleadoService } from 'app/services/empleado.service';
import { CommonService } from 'app/services/common.service';

//services
import { MamiService } from 'app/services/mami.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-rrhh-empleados',
    templateUrl: './rrhh-empleados.component.html',
    styleUrls: ['./rrhh-empleados.component.css']
})
export class RrhhEmpleadosComponent implements OnInit {

    objectoCrearEditar=new EmpleadoModel();
    listEncabezados:string[] = Object.keys(this.objectoCrearEditar);
    
    isEditMode:boolean=false;
    fieldsForm:IFormulario[]=[];
    
    //listEmpleados: Observable<Array<EmpleadoModel>>;
    listEmpleados: Observable<Array<EmpleadoModel>>;
    
    collectionEmpleados:EmpleadoModel[]=[];

    constructor(
        public empleadoService:EmpleadoService,
        // public capacitacionService:CapacitacionService,
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
    

    //this.listEmpleados = this.mamiService.getEmpleados();
    this.listEmpleados = this.empleadoService.getAll();

}

ngAfterViewInit(): void {

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
    this.objectoCrearEditar = new EmpleadoModel();
    this.isEditMode = false;
}


//-------------------------------------------------------------------------------------------


    loadFieldsForm(){

        this.fieldsForm.push({ key:'id' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'Apellido' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'Nombre' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'DNI' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'CUIT' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'FechaNacimiento' , type:'date', comboValues:null, collection:null });
        this.fieldsForm.push({ key:'Nacionalidad' , type:'combo', comboValues:['Argentina','USA','Canada','Australia','New Zeland','Noruega'] , collection:null});
        this.fieldsForm.push({ key:'Domicilio' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'Telefono' , type:'string', comboValues:null , collection:null });
        this.fieldsForm.push({ key:'Sueldo' , type:'string', comboValues:null , collection:null });

        this.fieldsForm.push({ key:'activo' , type:'boolean', comboValues:null , collection:null});

    }

//-------------------------------------------------------------------------------------------
    coll:any;
    animatedCollapsible(){
        this.coll = document.getElementsByClassName("collapsible empleados");

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

        this.listEmpleados = this.empleadoService.getAll();
        this.coll1click();
    }
    gridgral_receiveMessageDelete($event) {
        // console.log($event)

        this.delete($event);
    }
    gridgral_receiveMessageCambiarEstado($event) {
        // console.log($event)

        this.cambiarEstado($event);
    }
    


    formgen_receiveMessageCrearEditar($event) {
        // console.log($event)

        this.createUpdate($event);

    }
    formgen_receiveMessageCancelar($event) {
        // console.log($event)

        this.clean();
    }
    formgen_receiveMessageClickTitulo($event) {
        // console.log($event)

        this.cambiarEditMode();
    }

//-------------------------------------------------------------------------------------------


    createUpdate(objeto:EmpleadoModel){
        let messaje:string;
        if(objeto.id){
            messaje = 'updated'
        }else{
            messaje = 'created'
        }
        
        this.empleadoService.createUpdate(objeto)
        .subscribe( resp => {

            if(messaje==='created'){
                this.toastr.success(
                    `empleado ${ objeto.Nombre } creado`, 
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
                    `empleado ${ objeto.Nombre } modificado`, 
                    "Notification",
                    {
                        closeButton: true,
                        extendedTimeOut: 300,
                        positionClass: 'toast-bottom-right'
                    }
                );
            }
            this.clean();

            this.listEmpleados = this.empleadoService.getAll();
            this.coll1click();
        });
    }
    
//----------------------------------------------------------------------------------------------
    delete( objeto:EmpleadoModel ){
        
        this.empleadoService.deleteConfirm(objeto)
            .then( resp => {

                if(resp.value){
                    
                    this.empleadoService.delete(objeto.id)
                        .subscribe( resp => {
                            
                            this.toastr.error(
                                `Empleado eliminado`, 
                                "Notification",
                                {
                                    enableHtml: true,
                                    closeButton: true,
                                    extendedTimeOut: 300,
                                    positionClass: 'toast-bottom-left'
                                }
                            );

                            this.listEmpleados = this.empleadoService.getAll();
                            this.coll1click();

                        });

                }
            });

    }

//----------------------------------------------------------------------------------------------
    cambiarEstado( objeto:EmpleadoModel  ){
        
        this.empleadoService.cambiarEstadoConfirm(objeto)
            .then( resp => {

                if(resp.value){

                    objeto.activo = !objeto.activo;
                    this.empleadoService.update(objeto)
                        .subscribe( resp => {
                            
                            let message = `El empleado <strong> ${ objeto.Apellido }, ${ objeto.Nombre }</strong><br> ha sido dado de`;
                            
                            if(!objeto.activo){
                                this.toastr.error(
                                    `${ message } BAJA`, 
                                    "Notification",
                                    {
                                        enableHtml: true,
                                        closeButton: true,
                                        extendedTimeOut: 300,
                                        positionClass: 'toast-bottom-left'
                                    }
                                );
                            }
                            else{
                                this.toastr.success(
                                    `${ message } ALTA`, 
                                    "Notification",
                                    {
                                        enableHtml: true,
                                        closeButton: true,
                                        extendedTimeOut: 300,
                                        positionClass: 'toast-bottom-left'
                                    }
                                );
                            }

                        });
                }
            });

    }
//----------------------------------------------------------------------------------------------




}
