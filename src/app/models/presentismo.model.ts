import { Time } from "@angular/common";
import { Data } from "@angular/router";


export class PresentismoModel {

    Fecha               :Date;
    Empleado            :string;
    HoraIngreso         :Date;
    HoraSalida          :Date;


    constructor(
        fecha:Date=null,
        empleado:string='',
        horaIngreso:Date=null,
        horaSalida:Date=null,
        demoraHoras:number=0
    ){

        this.Fecha               =fecha;
        this.Empleado            =empleado;
        this.HoraIngreso         =horaIngreso;
        this.HoraSalida          =horaSalida;

    }



}

