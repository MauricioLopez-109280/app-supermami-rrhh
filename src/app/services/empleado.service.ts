
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoModel } from 'app/models/empleado.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

    ListEmpleados:EmpleadoModel[] = [];

    private firebaseUriCollection = 'https://angular-supermami-rrhh.firebaseio.com/empleados';

    constructor(
        private httpClient:HttpClient
    ) { 

    }


  getAll(){

    return this.httpClient.get(`${this.firebaseUriCollection}.json`)
        .pipe( 
            map( this.parseEmpleadosObjectToArray )
        );
    }
    private parseEmpleadosObjectToArray(objeto:object){

        // console.log(heroesObj);
        if (objeto === null) { return []; }

        let objArray : EmpleadoModel[] = [];
        let obj:EmpleadoModel;
        Object.keys(objeto).forEach( key => {

            // console.log(key, empleadosObj[key]);
            obj = new EmpleadoModel()
            obj = {
                id: key,
                ...objeto[key]
            }
            // console.log(obj);

            objArray.push(obj)
        })

        this.ListEmpleados = objArray;
        // console.log(this.ListCapacitaciones)
        return objArray;
    }


    createUpdate( objeto: EmpleadoModel ){
        if(objeto.id){
            return this.update( objeto );
        }else{
            return this.create( objeto );
        }
    }

    create( objeto: EmpleadoModel ){

        return this.httpClient.post(`${this.firebaseUriCollection}/.json`, objeto )
            .pipe(
                map( (resp:any) => {
                    objeto.id = resp.name 
                    return objeto;
                })
            );

    }

    update( objeto: EmpleadoModel ){

        const objUpdate = {
            ...objeto
        }
        delete objUpdate.id;

        return this.httpClient.put(`${this.firebaseUriCollection}/${objeto.id}.json`, objUpdate );

    }
    
    delete(idObjeto:string){

        return this.httpClient.delete(`${this.firebaseUriCollection}/${idObjeto}.json`)

    }

    deleteConfirm( objeto:EmpleadoModel){
        return Swal.fire({
            title: `${ objeto.id } - ${objeto.Nombre} ` ,
            text: `Desea eliminar el empleado ?`,
            icon: 'error',
            showConfirmButton: true,
            showCancelButton: true
        })
    }

    cambiarEstadoConfirm( objeto:EmpleadoModel){

        let message = objeto.activo ? 'dar de BAJA' : 'dar de ALTA';

        return Swal.fire({
            title: `${ objeto.Apellido }, ${objeto.Nombre} ` ,
            text: `Esta seguro que desea ${message} al empleado ?`,
            icon: objeto.activo ? 'error' : 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
    }

    


}
