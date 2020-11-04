import { Component, OnInit } from '@angular/core';


//------------------------------------------------------------------
import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

//barrilete cosmico
interface jsPDFWithPlugin extends jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
}

import faker from 'faker';
import { CommonService } from 'app/services/common.service';
import { Router } from '@angular/router';

//------------------------------------------------------------------


@Component({
  selector: 'app-rrhh-reportes',
  templateUrl: './rrhh-reportes.component.html',
  styleUrls: ['./rrhh-reportes.component.css']
})
export class RrhhReportesComponent implements OnInit {

    listDatos:any[]=[];

    listEncabezados:string[] = Object.keys( this.commonService.getEncabezadosReporte()[0] );
    // listEncabezados:string[]= this.commonService.getEncabezadosReporte();

    reporteSeleccionado:string;
    listReportes:string[]=[];

    constructor(
        public commonService:CommonService,
        private router:Router
    ) { }


    
    initPage:any;
    ngOnInit(): void {
        this.initPage = document.getElementById('initPage');

        this.reloadDatos(0);

        this.listReportes = ['Reporte1','Reporte2','Reporte3']
    }

    reloadDatos(count:number){
        this.listDatos = this.commonService.generarDatosRandomReporte(count);
    }

    buscar(){
        this.reloadDatos(10);
    }

    limpiar(){
        this.listDatos = [];
    }



//-------------------------------------------------------------------------------------------

    exportarPDF(idTable:string){

        let table = document.getElementById(idTable);
        console.log(this.reporteSeleccionado, table)


        const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;

        doc.setFontSize(18)
        doc.text(this.reporteSeleccionado, 14, 30)
        doc.setFontSize(11)
        doc.setTextColor(100)
      
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
        

        // var lorem = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae voluptatem veniam reprehenderit delectus, possimus quidem soluta odio! Fugit corporis aspernatur magnam, nisi laborum dolor illo voluptate temporibus nobis rem aperiam!"
        var lorem = /*html*/`
        - Universidad Tecnológica Nacional
        - Tecnicatura Universitaria en Programación
        - 2W2 - Metodología de Sistemas I
        - TPI SuperMami RRHH !!
        - Docentes: Santoro, Exequiel - Garay, Martin - Pérez, Rita
        `;
        doc.setTextColor(165, 0, 0);  
        var text = doc.splitTextToSize(lorem, pageWidth - 25, {})
        doc.text(text, 14, 40)
        

        doc.autoTable({
            head: this.commonService.getEncabezadosReporte(),
            body: this.listDatos,
            startY: 100,
            showHead: 'firstPage',
        });

        //Property 'lastAutoTable' does not exist on type 'jsPDF'.
        //Recibe este error porque Typecript es un lenguaje fuertemente tipado y lastAutoTable no está definido en el archivo index.d.ts (en el módulo de nodo jsPdf).
        // doc.text(text, 14, doc.lastAutoTable.finalY + 10)

        let finalY = (doc as any).lastAutoTable.finalY;
        console.log(finalY)

        doc.text(`
        * Grupo 14 - Fourtin ®
        
        * 2w2 - 110668 - Blanco, Carolina
        * 2w2 - 110352 - Maldonado, Santiago
        * 2w2 - 110437 - Lovecchio, Matías
        * 2w2 - 109921 - Balsamo, Franco
        * 2W2 - 110962 - Pucheta, Ignacio
        * 2w2 - 109280 - Lopez, Mauricio
        `, 14, finalY + 30)

        //doc.save(`G14_Reporte_${this.reporteSeleccionado}.pdf`)

        doc.output('dataurlnewwindow');

    }   


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

    generatePDF(idTable:string) {

        // const doc = new jsPDF();
        // autoTable(doc, { html: '#tableOrders' })
        // doc.save('table.pdf')

        const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;

        doc.setFontSize(18)
        doc.text('With content', 14, 22)
        doc.setFontSize(11)
        doc.setTextColor(100)
      
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
        
        var lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate rem aliquam, aspernatur tempore, id quod suscipit nesciunt quibusdam quos, ullam eum accusantium. Suscipit voluptates accusantium animi aspernatur provident? Eos, adipisci."
        var text = doc.splitTextToSize(lorem, pageWidth - 25, {})
        doc.text(text, 14, 30)

        doc.autoTable({
            head: this.headRows(),
            body: this.bodyRows(40),
            startY: 50,
            showHead: 'firstPage',
        });

        //Property 'lastAutoTable' does not exist on type 'jsPDF'.
        //Recibe este error porque Typecript es un lenguaje fuertemente tipado y lastAutoTable no está definido en el archivo index.d.ts (en el módulo de nodo jsPdf).
        // doc.text(text, 14, doc.lastAutoTable.finalY + 10)

        let finalY = (doc as any).lastAutoTable.finalY;
        console.log(finalY)

        doc.text(text, 14, finalY + 10)

        doc.save('G14.pdf')
    }

}
