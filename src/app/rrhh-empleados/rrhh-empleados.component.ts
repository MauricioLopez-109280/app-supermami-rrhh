import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


//services
import { MamiService } from 'app/services/mami.service';

//models
import { EmpleadoModel } from 'app/models/empleado.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


export enum EnumTipoDiv {
    CREAR_EDITAR,
    CONSULTAR,
}


@Component({
  selector: 'app-rrhh-empleados',
  templateUrl: './rrhh-empleados.component.html',
  styleUrls: ['./rrhh-empleados.component.css']
})
export class RrhhEmpleadosComponent implements OnInit {

    listEmpleados:EmpleadoModel[];
    empleado = new EmpleadoModel();
    last = new EmpleadoModel();
    loading = false;
    starting = false;

    crearEditarIsOpen = true;
    consultarIsOpen = true;

    constructor(
        public mamiService:MamiService,
        private router:Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loadEmpleados();
    }

    ngAfterViewInit(): void {
        // document.getElementById('ConsultarEmpleado').style.display = 'none';
        // this.consultarIsOpen = false;
    }

    closeDiv(idDiv:string,strTipoDiv:string){
        let div = document.getElementById(idDiv);

        let tipoDiv:EnumTipoDiv = EnumTipoDiv[strTipoDiv];

        if(div.style.display=='none'){

            div.style.display = ''

            if(tipoDiv == EnumTipoDiv.CREAR_EDITAR){
                this.crearEditarIsOpen = true;
                // div.className = 'row animate__animated animate__backInDown';
            }
            else if(tipoDiv == EnumTipoDiv.CONSULTAR){
                this.consultarIsOpen = true;
                // div.className = 'row animate__animated animate__backInUp';
            }
  
            div.className = 'row animate__animated animate__backInLeft';

        }
        else{

            setTimeout(() => {
                div.style.display = 'none';
            }, 500);

            if(tipoDiv == EnumTipoDiv.CREAR_EDITAR){
                this.crearEditarIsOpen = false;
                // div.className= 'row animate__animated animate__backOutUp';
            }
            else if(tipoDiv == EnumTipoDiv.CONSULTAR){
                this.consultarIsOpen = false;
                // div.className= 'row animate__animated animate__backOutDown';
            }

            div.className= 'row animate__animated animate__backOutRight';

        }
    }


    cambiarEstadoEmpleado( empleado:EmpleadoModel , indexLocal:number ){
        
        this.mamiService.cambiarEstadoEmpleadoConfirm(empleado)
            .then( resp => {

                if(resp.value){
                    
                    // this.MamiService.eliminarEmpleado(empleado.ID)
                    empleado.activo = !empleado.activo;
                    this.mamiService.updateEmpleado(empleado)
                        .subscribe( resp => {
                            // console.log(resp)      
                            
                            let message = `El empleado <strong> ${ empleado.apellido }, ${ empleado.nombre }</strong><br> ha sido dado de`;
                            
                            if(!empleado.activo){
                                this.toastr.error(
                                    `${ message } BAJA`, 
                                    "Notification",
                                    {
                                        // progressBar: true,
                                        // timeOut: 0,
                                        enableHtml: true,
                                        closeButton: true,
                                        extendedTimeOut: 300,
                                        positionClass: 'toast-bottom-left'
                                        // positionClass: 'toast-bottom-full-width'
                                        // positionClass: 'toast-bottom-right'
                                    }
                                );
                            }
                            else{
                                this.toastr.success(
                                    `${ message } ALTA`, 
                                    "Notification",
                                    {
                                        // progressBar: true,
                                        // timeOut: 0,
                                        enableHtml: true,
                                        closeButton: true,
                                        extendedTimeOut: 300,
                                        positionClass: 'toast-bottom-left'
                                        // positionClass: 'toast-bottom-full-width'
                                        // positionClass: 'toast-bottom-right'
                                    }
                                );
                            }


                        });
                    // this.MamiService.ListIntegrantes.splice(inndexLocal,1);

                    // this.MamiService.ListEmpleados[indexLocal].activo = !this.MamiService.ListEmpleados[indexLocal].activo;

                }
            });

    }

    editarEmpleado( empleado:EmpleadoModel , indexLocal:number ){
        this.empleado = empleado;
        this.closeDiv('CrearEditarEmpleado','CREAR_EDITAR')
    }

    hasModifications(){
        // return this.last.id !== this.heroe.id
        //     || this.last.name !== this.heroe.name
        //     || this.last.power !== this.heroe.power
        //     || this.last.state !== this.heroe.state;
        return true;
    }
    
    clean(){
        this.empleado = new EmpleadoModel();
        this.last = new EmpleadoModel();
        // this.router.navigateByUrl('/easy-empleados');
    }

    sendForm(form : NgForm){

        // form.valueChanges.subscribe( value => console.log(value));
        // console.log(form.controls['state']);
        // console.log(`dirty: ${form.dirty} - pristine: ${form.pristine}`);
        // console.log(this.heroe);

        // console.log(form);
        // console.log('this.empleado',this.empleado)
        // console.log('this.last',this.last)       

        if(form.invalid){

            // console.log('form invalid')
            return;

        }else if( ! this.hasModifications() ){

            // console.log('no modifications')
            return;

        }else{

            // console.log('create or update data')
            this.loading = true;

            let messaje:string;
            if(this.empleado.id){
                messaje = 'updated'
            }else{
                messaje = 'created'
            }



            this.mamiService.createUpdateEmpleado(this.empleado)
            .subscribe( resp => {

                // console.log(resp);

                //esto no es necesario xq como el objeto heroe es pasado por referencia
                //cuando pase por el pipe se le cargara el id al mismo objeto que tenemos en este component
                // this.heroe = resp; 
                this.loading = false;

                // this.last = {
                //     ...this.empleado
                // }
                Object.assign(this.last, this.empleado);

                if(messaje==='created'){
                    this.toastr.success(
                        `heroe ${ this.empleado.nombre } has been created`, 
                        "Notification",
                        {
                            // progressBar: true,
                            // timeOut: 0,
                            closeButton: true,
                            extendedTimeOut: 300,
                            // positionClass: 'toast-bottom-left'
                            // positionClass: 'toast-bottom-full-width'
                            positionClass: 'toast-bottom-right'
                        }
                    );
                }
                else if(messaje==='updated'){
                    this.toastr.warning(
                        `heroe ${ this.empleado.nombre } has been updated`, 
                        "Notification",
                        {
                            // progressBar: true,
                            // timeOut: 0,
                            closeButton: true,
                            extendedTimeOut: 300,
                            // positionClass: 'toast-bottom-left'
                            // positionClass: 'toast-bottom-full-width'
                            positionClass: 'toast-bottom-right'
                        }
                    );
                }

                this.clean();
                form.reset();

                this.closeDiv('CrearEditarEmpleado','CREAR_EDITAR')

            });

            /*
            //otra forma piola:
            let request : Observable<any>
            if(this.heroe.id){
                request = this.heroesService.updateHeroe(this.heroe);
            }else{
                request = this.heroesService.createHeroe(this.heroe);
            }
            request.subscribe( resp => {
                console.log(resp)
                this.loading = false;
            })
            */

        }

    }



    loadEmpleados(){
        this.loading = true;

        this.mamiService.getEmpleados()
            .subscribe( resp => {
                // console.log(resp)
                this.listEmpleados = resp;
                this.loading = false;
            });
    }

}
