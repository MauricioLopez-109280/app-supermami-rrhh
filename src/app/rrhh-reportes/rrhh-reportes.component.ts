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

//------------------------------------------------------------------


@Component({
  selector: 'app-rrhh-reportes',
  templateUrl: './rrhh-reportes.component.html',
  styleUrls: ['./rrhh-reportes.component.css']
})
export class RrhhReportesComponent implements OnInit {

    orders: any[] = [
        { 
            id: 1 , total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,2),
            customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'email@example.com' },
        },
        { 
            id: 2 , total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,2),
            customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'email@example.com' },
        },
        { 
            id: 3 , total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,2),
            customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'email@example.com' },
        },
        { 
            id: 4 , total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,2),
            customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'email@example.com' },
        },
        { 
            id: 5 , total: 230, placed: new Date(2017,12,1), fulfilled: new Date(2017,12,2),
            customer: { id: 1, name: 'Main St Bakery', state: 'CO', email: 'email@example.com' },
        },
    ]

    constructor() { }

//-------------------------------------------------------------------------------------------
coll:any;
animatedCollapsible(){
    this.coll = document.getElementsByClassName("collapsible reportes");

    for (let i = 0; i < this.coll.length; i++) {
        this.coll[i].addEventListener("click", function() {
        this.classList.toggle("activeColapsible");
        var content = this.nextElementSibling;
        // console.log(content.style.maxHeight)
        if (content.style.maxHeight && !this.deplegarSiempre){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
}
//-------------------------------------------------------------------------------------------
initPage:any;
ngOnInit(): void {
    this.initPage = document.getElementById('initPage');
    this.animatedCollapsible();
}
//-------------------------------------------------------------------------------------------



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

        doc.save('bitchis.pdf')
    }

}
