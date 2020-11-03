import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormulario } from 'app/interfaces/formulario.interface';


@Component({
  selector: 'app-formgenerico',
  templateUrl: './formgenerico.component.html',
  styleUrls: ['./formgenerico.component.css']
})
export class FormgenericoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

    @Input() fieldsForm:IFormulario[]=[];
    @Input() tituloCrear:string='Crear';
    @Input() tituloEditar:string='Editar';

    @Input() isEditMode:boolean=false;
    
    @Input() objectoCrearEditar:any={};


    @Output() messageEventCrearEditar = new EventEmitter<any>();
    sendMessageSave(objectoCrearEditar){
        this.messageEventCrearEditar.emit(objectoCrearEditar)
    }

    @Output() messageEventCancelar = new EventEmitter<any>();
    sendMessageCancelar(){
        this.messageEventCancelar.emit()
    }
    

}
