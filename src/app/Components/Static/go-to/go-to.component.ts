import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-go-to',
  templateUrl: './go-to.component.html',
  styleUrls: ['./go-to.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class GoToComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goTo(id: string){
    var offset = 90; // sticky nav height
    var el = document.getElementById(id); // element you are scrolling to
    window.scroll({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });
  }

}
