import { Component, OnInit } from '@angular/core';
import {NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-welcome-slider',
  templateUrl: './welcome-slider.component.html',
  styleUrls: ['./welcome-slider.component.css']
})
export class WelcomeSliderComponent implements OnInit {
  images: string[] = ['assets/images/welcome-slide-1.webp', 'assets/images/welcome-slide-1.webp']

  slides: Slide[] = [
    {
      class: 'welcome-slide',
      label: false,
      labelText: '',
      caption: true,
      captionText: '',
      imageUrl: 'assets/images/welcome-slide-1.webp'
    },
    {
      class: 'welcome-slide',
      label: false,
      labelText: '',
      caption: true,
      captionText: '',
      imageUrl: 'assets/images/welcome-slide-2.webp'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }

}

export class Slide {
  label: boolean
  labelText: string
  caption: boolean
  captionText: string
  imageUrl: string
  class: string
}

