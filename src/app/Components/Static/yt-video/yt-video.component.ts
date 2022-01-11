import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-yt-video',
  templateUrl: './yt-video.component.html',
  styleUrls: ['./yt-video.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class YtVideoComponent implements OnInit {
  public reproductor = true;
  public show_iframe = false;

  constructor() { }

  ngOnInit(): void {
  }
  reproducir(){
    this.reproductor = true;
  }

  showVideo($event) {
    $event.target.style.display = 'none'
    this.show_iframe = true
  }
}
