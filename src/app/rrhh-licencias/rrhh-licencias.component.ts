import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoModel } from 'app/models/empleado.model';
import { MamiService } from 'app/services/mami.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rrhh-licencias',
  templateUrl: './rrhh-licencias.component.html',
  styleUrls: ['./rrhh-licencias.component.css']
})
export class RrhhLicenciasComponent implements OnInit {
    
    constructor(
        public mamiService:MamiService,
        private router:Router,
        private toastr: ToastrService
    ) { 

    }

    listEncabezados:string[] = Object.keys(new EmpleadoModel());
    listLicencias:EmpleadoModel[];

//-------------------------------------------------------------------------------------------
    loadLicencias(){
        // this.loading = true;

        this.mamiService.getEmpleados()
            .subscribe( resp => {
                // console.log(resp)
                this.listLicencias = resp;
                // this.loading = false;
            });
    }
//-------------------------------------------------------------------------------------------
    coll:any;
    animatedCollapsible(){
        this.coll = document.getElementsByClassName("collapsible licencias");

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
        this.coll[0].click();

        this.loadLicencias();

    }
//-------------------------------------------------------------------------------------------

    sendForm(form : NgForm){

    }

//-------------------------------------------------------------------------------------------


}
