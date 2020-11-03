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

    
    constructor() { }

    ngOnInit(): void {
        // console.log(this.idDivContenedor)
        // console.log(this.tituloListado)
        // console.log(this.listObjetos)
        // console.log(this.listEncabezados)
    }

    @Output() messageEventEdit = new EventEmitter<string>();
    sendMessageEdit(objetoEditar:any) {
        this.messageEventEdit.emit(objetoEditar)
    }

    @Output() messageEventBuscar = new EventEmitter<string>();
    sendMessageBuscar(texto:string){
        this.messageEventBuscar.emit(texto)
    }

    
    @Output() messageEventDelete = new EventEmitter<string>();
    sendMessageDelete(objetoEliminar:any) {
        this.messageEventDelete.emit(objetoEliminar)
    }

}
