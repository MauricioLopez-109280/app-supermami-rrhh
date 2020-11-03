import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormulario } from 'app/interfaces/formulario.interface';
import { CommonService } from 'app/services/common.service';
import { MamiService } from 'app/services/mami.service';
import { Observable } from 'rxjs';
import { EmpleadoModel } from 'app/models/empleado.model';


@Component({
  selector: 'app-formgenerico',
  templateUrl: './formgenerico.component.html',
  styleUrls: ['./formgenerico.component.css']
})
export class FormgenericoComponent implements OnInit {

    listEmpleados: Observable<Array<EmpleadoModel>>;

    constructor(
        public commonService:CommonService,
        public mamiService:MamiService
    ) { }

    ngOnInit(): void {
        // console.log(this.fieldsForm)
        this.listEmpleados = this.mamiService.getEmpleados();
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
    
    @Output() messageEventClickTitulo = new EventEmitter<any>();
    sendMessageClickTitulo(){
        this.messageEventClickTitulo.emit()
    }

    




/*

    task: Task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
          {name: 'Primary', completed: false, color: 'primary'},
          {name: 'Accent', completed: false, color: 'accent'},
          {name: 'Warn', completed: false, color: 'warn'}
        ]
      };

    allComplete: boolean = false;

    updateAllComplete() {
      this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }
  
    someComplete(): boolean {
      if (this.task.subtasks == null) {
        return false;
      }
      return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }
  
    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.task.subtasks == null) {
        return;
      }
      this.task.subtasks.forEach(t => t.completed = completed);
    }



    toppings = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
*/

}

// import {FormControl} from '@angular/forms';
// import {ThemePalette} from '@angular/material/core';

// export interface Task {
//     name: string;
//     completed: boolean;
//     color: ThemePalette;
//     subtasks?: Task[];
//   }


  