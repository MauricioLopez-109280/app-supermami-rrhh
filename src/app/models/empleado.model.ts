
export class EmpleadoModel {

    id:string;
    nombre: string;
    apellido: string;
    email:string;
    legajo: number;
    curso: string;
    imagen: string;
    activo: boolean;

    constructor(apellido: string = '', nombre: string = '',email:string='', legajo: number = 0, imagen:string='', curso:string='2W2'){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.legajo = legajo;
        this.curso = curso;
        this.imagen = imagen;
        this.activo = true;
    }

    public getFullName():string{
        return `${this.curso} - ${this.legajo} -  ${this.apellido}, ${this.nombre}`;
    }

    public getEstado():string{
        return this.activo ? 'ACTIVO' : 'BAJA';
    }

}
