import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rrhh-presentismo',
  templateUrl: './rrhh-presentismo.component.html',
  styleUrls: ['./rrhh-presentismo.component.css']
})
export class RrhhPresentismoComponent implements OnInit {

    constructor() { }


//-------------------------------------------------------------------------------------------
    coll:any;
    animatedCollapsible(){
        this.coll = document.getElementsByClassName("collapsible presentismo");

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
    }
//-------------------------------------------------------------------------------------------


}
