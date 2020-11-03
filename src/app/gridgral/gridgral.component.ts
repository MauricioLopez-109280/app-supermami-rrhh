import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gridgral',
  templateUrl: './gridgral.component.html',
  styleUrls: ['./gridgral.component.css']
})
export class GridgralComponent implements OnInit {

    @Input() idDivContenedor:string;
    @Input() tituloListado:string;
    @Input() listObjetos:any[] = [];
    @Input() listEncabezados:string[];

    // message: string = "Hola Mundo!"
    @Output() messageEvent = new EventEmitter<string>();
    
    constructor() { }

    ngOnInit(): void {
        // console.log(this.idDivContenedor)
        // console.log(this.tituloListado)
        // console.log(this.listObjetos)
        // console.log(this.listEncabezados)
    }

    sendMessage(objetoEditar:any) {
        // this.messageEvent.emit(this.message)
        this.messageEvent.emit(objetoEditar)
    }


}
