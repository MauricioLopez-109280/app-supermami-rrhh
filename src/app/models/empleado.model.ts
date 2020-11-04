
export class EmpleadoModel {

    id:string;
    Apellido: string;
    Nombre: string;
    DNI:number;
    CUIT:number;
    FechaNacimiento:Date;
    Nacionalidad:string;
    Domicilio:string;
    Telefono: string;
    Sueldo:number;
    activo: boolean;

    constructor(
        apellido: string = '', 
        nombre: string = '',
        dni:number = 0,
        cuit:number = 0,
        fechaNacimiento:Date = null,
        nacionalidad:string = '', 
        domicilio:string = '',
        sueldo:number = 0, 
        activo:boolean = true
    ){
        this.id = null;
        this.Apellido = apellido;
        this.Nombre = nombre;
        this.DNI = dni;
        this.CUIT = cuit;
        this.FechaNacimiento = fechaNacimiento;
        this.Nacionalidad = nacionalidad;
        this.Domicilio = nacionalidad;
        this.Telefono = domicilio;
        this.Sueldo = sueldo;
        this.activo = activo;
    }

    getFullName():string{
        return `${this.Apellido}, ${this.Nombre}`;
    }

    getEstado():string{
        return this.activo ? 'ACTIVO' : 'BAJA';
    }

    
}
