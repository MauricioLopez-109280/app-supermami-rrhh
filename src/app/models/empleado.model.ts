
export class EmpleadoModel {

    id:string;
    apellido: string;
    nombre: string;
    dni:number;
    cuit:number;
    nacimiento:number;
    email:string;
    legajo: number;
    nacionalidad:string;
    domicilio:string;
    imagen: string;
    activo: boolean;

    constructor(
        apellido: string = '', 
        nombre: string = '',
        dni:number = 0,
        cuit:number = 0,
        nacimiento:number = 0,
        email:string = '', 
        legajo: number = 0, 
        nacionalidad:string = '',
        domicilio:string = '',
        imagen:string = '', 
        activo:boolean = true
    ){
        this.id = '';
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
        this.cuit = cuit;
        this.nacimiento = nacimiento;
        this.email = email;
        this.legajo = legajo;
        this.nacionalidad = nacionalidad;
        this.domicilio = domicilio;
        this.imagen = imagen;
        this.activo = activo;
    }

    getFullName():string{
        return `${this.cuit} -  ${this.apellido}, ${this.nombre}`;
    }

    getEstado():string{
        return this.activo ? 'ACTIVO' : 'BAJA';
    }

    
}
