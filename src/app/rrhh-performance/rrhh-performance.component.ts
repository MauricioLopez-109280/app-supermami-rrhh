import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rrhh-performance',
  templateUrl: './rrhh-performance.component.html',
  styleUrls: ['./rrhh-performance.component.css']
})
export class RrhhPerformanceComponent implements OnInit {

    constructor() { }


//-------------------------------------------------------------------------------------------
    coll:any;
    animatedCollapsible(){
        this.coll = document.getElementsByClassName("collapsible performance");

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
