import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';

//models
import { EmpleadoModel } from 'app/models/empleado.model';



import Swal from 'sweetalert2';
import { IntegranteModel } from 'app/models/integrante.model';

@Injectable({
  providedIn: 'root'
})
export class MamiService {

    ListEmpleados:EmpleadoModel[] = [];
    ListIntegrantes:IntegranteModel[] = [];

    private firebaseURL = 'https://angular-supermami-rrhh.firebaseio.com/';
    private firebaseCollection = 'empleados';

    constructor(
        private httpClient:HttpClient
    ) { 
        this.loadIntegrantes();
    }




    public loadIntegrantes():IntegranteModel[]{
        this.ListIntegrantes = [];


        this.ListIntegrantes.push( 
            new IntegranteModel('Blanco','Carolina','QA', '110668@tecnicatura.frc.utn.edu.ar', 110668,
            'https://lh3.googleusercontent.com/a-/AOh14GhKx-z-zAyMZl3owmvQMOWw5ZaYCF3OA87uYPl93g=s70-p-k-rw-no',
            'Hola soy Caro'
            ) 
        );
        this.ListIntegrantes.push( 
            new IntegranteModel('Maldonado','Santiago', 'Scrum Master', '110352@tecnicatura.frc.utn.edu.ar', 110352, 
            // 'https://media-exp1.licdn.com/dms/image/C4E03AQH0hbNPvgG8Tw/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=edxJs71Nn2TGWOSiRyDKGAgha9AQ1m0EsJEDbuet_zs',
            'https://lh3.googleusercontent.com/a-/AOh14Gg6F632_8wBh4D6lCDvpQ5tddu0b-AxM0NlBmX8vm4=s70-p-k-rw-no',
            'Hola soy Santi'
            ) 
        );
        this.ListIntegrantes.push( 
            new IntegranteModel('Lovecchio','Matías', 'Backend Developer', '110437@tecnicatura.frc.utn.edu.ar', 110437,
            'https://lh3.googleusercontent.com/a-/AOh14GhOnX0IL6XH1Itx7LV2OjOWBJSfre76kEgQKNER0g=s70-p-k-rw-no',
            'Hola soy Mati'
            ) 
        );
        this.ListIntegrantes.push( 
            new IntegranteModel('Balsamo','Franco', 'DBA', '109921@tecnicatura.frc.utn.edu.ar', 109921,
            'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/V8BNOaftJmYVauEn3GhlBizMuh99l-qFwCLcDEAEiGQoBZhD___________8BGMKv-fv______wE/s70-p-k-rw-no/photo.jpg',
            'Hola soy Franco'
            ) 
        );
        this.ListIntegrantes.push( 
            new IntegranteModel('Pucheta','Ignacio', 'Frontend Developer', '110962@tecnicatura.frc.utn.edu.ar', 110962,
            'https://lh3.googleusercontent.com/a-/AOh14GjZljOp5FaW4n0wPTmDDcQIeCf6hWYWfPKiMw_s-6c=s70-p-k-rw-no',
            'Hola soy Ignacio'
            ) 
        );
        this.ListIntegrantes.push( 
            new IntegranteModel('Lopez','Mauricio', 'Backend Developer', '109280@tecnicatura.frc.utn.edu.ar', 109280,
            'https://lh3.googleusercontent.com/a-/AOh14GhQ-hr3ShGdcD3HVWJ-qEOMxOVATdegWRYe7Jjkgw=s64',
            'Hola soy Mauri'
            ) 
        );


        return this.ListIntegrantes;
    }
  

    cambiarEstadoEmpleadoConfirm( empleado:EmpleadoModel){

        let message = empleado.activo ? 'dar de BAJA' : 'dar de ALTA';

        return Swal.fire({
            title: empleado.Nombre,
            text: `Esta seguro que desea ${message} al empleado ?`,
            icon: empleado.activo ? 'error' : 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
    }


    eliminarEmpleado(idEmpleado:string){
        return this.httpClient.delete(`${this.firebaseURL}/${this.firebaseCollection}/${idEmpleado}.json`)
    }


    createUpdateEmpleado( empleado: EmpleadoModel ){
        if(empleado.id){
            return this.updateEmpleado( empleado );
        }else{
            return this.createEmpleado( empleado );
        }
    }

    createEmpleado( empleado: EmpleadoModel ){

        return this.httpClient.post(`${this.firebaseURL}/${this.firebaseCollection}.json`, empleado )
            //con el pipe manupulo la respuesta que vera quien se subscriba a este metodo
            .pipe(
                map( (resp:any) => {
                    //aqui ya puedo tener el id que me retorna firebase
                    //le cargo el id al objeto heroe y retorno ese objeto como respuesta
                    //si no se realizara esta manipulacion la respuesta seria solo el id de firebase
                    //pero de esta forma le llega el objeto completo al component que use este service
                    empleado.id = resp.name 
                    return empleado;
                })
            );

    }

    updateEmpleado( empleado: EmpleadoModel ){

        //aqui no hay que enviar el id a firebase xq sino creara un campo con ese dato
        //esto es para no usar el objeto que viene por referencia, asi podemos quitarle el id y enviarlo a firebase
        const empleadoTmp = {
            ...empleado
        }
        delete empleadoTmp.id; //aqui no puedo hacer: delete heroe.id, porque el heroe viene como referencia
        //y si eliminamos su property id aqui tambien se va a eliminar en el componente que lo usa

        return this.httpClient.put(`${this.firebaseURL}/${this.firebaseCollection}/${empleado.id}.json`, empleadoTmp );

    }

    getEmpleados(){

        return this.httpClient.get(`${this.firebaseURL}/${this.firebaseCollection}.json`)
            .pipe( 

                // map( resp => {
                //     return this.parseObjectToArray(resp)
                // })

                // map( resp => this.parseObjectToArray(resp))

                map( this.parseEmpleadosObjectToArray ) //aqui con sintaxis resumida, 
                //el primer arg para la funcion va a ser el primer arg que retorna la funcion map

                // ,delay(1000) //demora la respuesta
            );
    }

    
    private parseEmpleadosObjectToArray(empleadosObj:object){

        // console.log(heroesObj);
        if (empleadosObj === null) { return []; }

        let objArray : EmpleadoModel[] = [];
        let obj:EmpleadoModel;
        Object.keys(empleadosObj).forEach( key => {

            // console.log(key, empleadosObj[key]);
            obj = new EmpleadoModel()
            obj = {
                id: key,
                ...empleadosObj[key]
            }
            // console.log(obj);

            objArray.push(obj)
        })

        this.ListEmpleados = objArray;
        // console.log(this.ListEmpleados)
        return objArray;
    }

}
