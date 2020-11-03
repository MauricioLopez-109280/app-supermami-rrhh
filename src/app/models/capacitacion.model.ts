export class CapacitacionModel {

    id:string;
    nombre: string;
    tema:string;
    fechaInicio:Date;
    fechaFin:Date;
    activo: boolean;

    constructor(
        nombre: string = '',
        tema:string = '',
        fechaInicio:Date = null,
        fechaFin:Date = null,
        activo:boolean = true
    ){
        this.id = null;
        this.nombre = nombre;
        this.tema = tema;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.activo = activo;
    }


    getEstado():string{
        return this.activo ? 'ACTIVO' : 'BAJA';
    }

}