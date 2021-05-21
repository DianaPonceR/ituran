import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-welcome-banner',
  templateUrl: './welcome-banner.component.html',
  styleUrls: ['./welcome-banner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class WelcomeBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // document.getElementById('contaianer').onmousemove(this.mouseMove())
  }


  mouseMove(e: MouseEvent) {
    // console.log('event')
    var wx = window.innerWidth;
		var wy = window.innerHeight;
    var x = e.pageX //- document..offsetLeft;
		var y = e.pageY // - this.offsetTop;

    var newx = x - wx/2;
		var newy = y - wy/2;
  }
}
