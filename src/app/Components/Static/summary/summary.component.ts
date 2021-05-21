import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goTo(id: string){
    var offset = 90; // sticky nav height
    var el = document.getElementById(id); // element you are scrolling to
    window.scroll({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });
  }

}
