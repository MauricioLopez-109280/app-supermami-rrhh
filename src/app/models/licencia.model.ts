
import { EmpleadoModel } from "./empleado.model";

export class LicenciaModel {

    id                  :string;
    Tipo                :string;
    Legajo              :number;
    FechaSolicitud      :Date;
    Motivo              :string;
    FechaInicio         :Date;
    FechaFin            :Date;
    Empleado            :EmpleadoModel;
    activo              :boolean;

    constructor(

    ){
        this.id                 =null;
        this.Tipo               ='';
        this.Legajo             =0;
        this.FechaSolicitud     =null;
        this.Motivo             ='';
        this.FechaInicio        =null;
        this.FechaFin           =null;
        this.Empleado           =null;
        this.activo             =true;
    }


    getEstado():string{
        return this.activo ? 'ACTIVO' : 'BAJA';
    }

}

