import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LicenciaModel } from 'app/models/licencia.model';
import { map } from 'rxjs/internal/operators/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {


    ListLicencias:LicenciaModel[] = [];

    private firebaseUriCollection = 'https://angular-supermami-rrhh.firebaseio.com/licencias';

    constructor(
        private httpClient:HttpClient
    ) { 

    }


  getAll(){

    return this.httpClient.get(`${this.firebaseUriCollection}.json`)
        .pipe( 
            map( this.parseLicenciasObjectToArray )
        );
    }
    private parseLicenciasObjectToArray(objeto:object){

        // console.log(heroesObj);
        if (objeto === null) { return []; }

        let objArray : LicenciaModel[] = [];
        let obj:LicenciaModel;
        Object.keys(objeto).forEach( key => {

            // console.log(key, empleadosObj[key]);
            obj = new LicenciaModel()
            obj = {
                id: key,
                ...objeto[key]
            }
            // console.log(obj);

            objArray.push(obj)
        })

        this.ListLicencias = objArray;
        // console.log(this.ListCapacitaciones)
        return objArray;
    }


    createUpdate( objeto: LicenciaModel ){
        if(objeto.id){
            return this.update( objeto );
        }else{
            return this.create( objeto );
        }
    }

    create( objeto: LicenciaModel ){

        return this.httpClient.post(`${this.firebaseUriCollection}/.json`, objeto )
            .pipe(
                map( (resp:any) => {
                    objeto.id = resp.name 
                    return objeto;
                })
            );

    }

    update( objeto: LicenciaModel ){

        const objUpdate = {
            ...objeto
        }
        delete objUpdate.id;

        return this.httpClient.put(`${this.firebaseUriCollection}/${objeto.id}.json`, objUpdate );

    }
    
    delete(idObjeto:string){

        return this.httpClient.delete(`${this.firebaseUriCollection}/${idObjeto}.json`)

    }

    deleteConfirm( objeto:LicenciaModel){
        return Swal.fire({
            title: `${ objeto.id } - ${objeto.Tipo } ` ,
            text: `Desea eliminar la licencia ?`,
            icon: 'error',
            showConfirmButton: true,
            showCancelButton: true
        })
    }

    cambiarEstadoConfirm( objeto:LicenciaModel){

        let message = objeto.activo ? 'dar de BAJA' : 'dar de ALTA';

        return Swal.fire({
            title: `${ objeto.id } - ${objeto.Tipo } ` ,
            text: `Esta seguro que desea ${message} la licencia ?`,
            icon: objeto.activo ? 'error' : 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
    }
    
}
