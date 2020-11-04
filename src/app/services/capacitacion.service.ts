import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitacionModel } from 'app/models/capacitacion.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

    ListCapacitaciones:CapacitacionModel[] = [];

    private firebaseUriCollection = 'https://angular-supermami-rrhh.firebaseio.com/capacitaciones';

    constructor(
        private httpClient:HttpClient
    ) { 

    }


  getAll(){

    return this.httpClient.get(`${this.firebaseUriCollection}.json`)
        .pipe( 
            map( this.parseCapacitacionesObjectToArray )
        );
    }
    private parseCapacitacionesObjectToArray(objeto:object){

        // console.log(heroesObj);
        if (objeto === null) { return []; }

        let objArray : CapacitacionModel[] = [];
        let obj:CapacitacionModel;
        Object.keys(objeto).forEach( key => {

            // console.log(key, empleadosObj[key]);
            obj = new CapacitacionModel()
            obj = {
                id: key,
                ...objeto[key]
            }
            // console.log(obj);

            objArray.push(obj)
        })

        this.ListCapacitaciones = objArray;
        // console.log(this.ListCapacitaciones)
        return objArray;
    }


    createUpdate( objeto: CapacitacionModel ){
        if(objeto.id){
            return this.update( objeto );
        }else{
            return this.create( objeto );
        }
    }

    create( objeto: CapacitacionModel ){

        return this.httpClient.post(`${this.firebaseUriCollection}/.json`, objeto )
            .pipe(
                map( (resp:any) => {
                    objeto.id = resp.name 
                    return objeto;
                })
            );

    }

    update( objeto: CapacitacionModel ){

        const objUpdate = {
            ...objeto
        }
        delete objUpdate.id;

        return this.httpClient.put(`${this.firebaseUriCollection}/${objeto.id}.json`, objUpdate );

    }
    
    delete(idObjeto:string){

        return this.httpClient.delete(`${this.firebaseUriCollection}/${idObjeto}.json`)

    }

    deleteConfirm( objeto:CapacitacionModel){
        return Swal.fire({
            title: `${ objeto.id } - ${objeto.Nombre} ` ,
            text: `Desea eliminar la capacitacion ?`,
            icon: 'error',
            showConfirmButton: true,
            showCancelButton: true
        })
    }

    cambiarEstadoConfirm( objeto:CapacitacionModel){

        let message = objeto.activo ? 'dar de BAJA' : 'dar de ALTA';

        return Swal.fire({
            title: objeto.Nombre,
            text: `Esta seguro que desea ${message} la capacitacion ?`,
            icon: objeto.activo ? 'error' : 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
    }

    


}
