




export class IntegranteModel {

    id:string;
    nombre: string;
    apellido: string;
    rolScrum:string;
    email:string;
    legajo: number;
    curso: string;
    imagen: string;
    descripcion: string;

    constructor(apellido: string = '', nombre: string = '',rolScrum:string='',email:string='', legajo: number = 0, imagen:string='',descripcion:string='', curso:string='2W2'){
        this.nombre = nombre;
        this.apellido = apellido;
        this.rolScrum = rolScrum;
        this.email = email;
        this.legajo = legajo;
        this.curso = curso;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }

    public getFullName():string{
        return `${this.curso} - ${this.legajo} -  ${this.apellido}, ${this.nombre}`;
    }

}
