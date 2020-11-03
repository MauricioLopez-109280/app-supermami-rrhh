import { NgStyle, NgSwitch } from '@angular/common';
import { Injectable } from '@angular/core';
import { EmpleadoModel } from 'app/models/empleado.model';
import { PresentismoModel } from 'app/models/presentismo.model';
import faker from 'faker';
import { now } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    constructor() { }


    formatObjeto(objeto:any){

        return `${objeto.apellido}, ${objeto.nombre}`;
        
    }
    

    public STATES: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];


    headRows() {
        return [
          { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
        ]
    }
    bodyRows(rowCount) {
        rowCount = rowCount || 10
        var body = []
        for (var j = 1; j <= rowCount; j++) {
          body.push({
            id: j,
            name: faker.name.findName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            expenses: faker.finance.amount(),
          })
        }
        return body
    }


    generarDatosRandomPresentismo(count:number=10){

        let listPresentismo:PresentismoModel[] = []
        let objRandom:PresentismoModel;
        let rndHoras:number;

        for (var i = 1; i <= count; i++) {

            objRandom = new PresentismoModel();
            objRandom.Fecha = faker.date.between('2020-01-01', '2020-11-03');
            objRandom.Empleado = faker.name.findName();
            objRandom.HoraIngreso = objRandom.Fecha;

            rndHoras = faker.random.number({min: 4,max: 10});
            
            objRandom.HoraSalida = new Date(
                objRandom.HoraIngreso.getFullYear(),
                objRandom.HoraIngreso.getMonth(),
                objRandom.HoraIngreso.getDate(),
                objRandom.HoraIngreso.getHours()+ rndHoras
            );
            


            listPresentismo.push(objRandom);
        }
        return listPresentismo;
    }


}
