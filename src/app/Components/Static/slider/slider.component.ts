import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css' ]
})
export class SliderComponent implements OnInit {
  images: string[] = ['assets/images/carousel_1.png','assets/images/carousel_2.png','assets/images/carousel_3.png','assets/images/carousel_4.png','assets/images/carousel_5.png']

  slides: Slide[] = [
    {
      class: 'slide-1',
      label: true,
      labelText: 'Localización y recuperación vehicular',
      caption: true,
      captionText: '2 mil millones de pesos en vehículos recuperados en cinco años.',
      imageUrl: 'assets/images/carousel_1.png'
    },
    {
      class: 'slide-2',
      label: false,
      labelText: '',
      caption: true,
      captionText: '2 mil millones de pesos en vehículos recuperados en cinco años.',
      imageUrl: 'assets/images/carousel_2.png'
    },
    {
      class: 'slide-3',
      label: false,
      labelText: '',
      caption: true,
      captionText: 'GPS donde podrás monitorear el vehículo desde tu celular las 24 hrs del día',
      imageUrl: 'assets/images/carousel_3.png'
    },
    {
      class: 'slide-4',
      label: true,
      labelText: 'Si te roban el auto lo recuperamos',
      caption: false,
      captionText: '',
      imageUrl: 'assets/images/carousel_4.png'
    },
    {
      class: 'slide-5',
      label: false,
      labelText: '',
      caption: true,
      captionText: 'Con Ituran no hay plazos forzosos ni cargos adicionales No hay cotizaciones por el modelo o año del vehículo.',
      imageUrl: 'assets/images/carousel_5.png'
    },
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
