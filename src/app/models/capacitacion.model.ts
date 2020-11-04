import { EmpleadoModel } from "./empleado.model";

export class CapacitacionModel {

    id:string;
    Nombre: string;
    Tema:string;
    FechaInicio:Date;
    FechaFin:Date;
    activo: boolean;
    Empleados:EmpleadoModel[];

    constructor(
        nombre: string = '',
        tema:string = '',
        fechaInicio:Date = null,
        fechaFin:Date = null,
        activo:boolean = true
    ){
        this.id = null;
        this.Nombre = nombre;
        this.Tema = tema;
        this.FechaInicio = fechaInicio;
        this.FechaFin = fechaFin;
        this.activo = activo;
        this.Empleados=[];
    }


    getEstado():string{
        return this.activo ? 'ACTIVO' : 'BAJA';
    }

}