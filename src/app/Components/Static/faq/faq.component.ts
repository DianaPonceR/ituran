import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class FaqComponent implements OnInit {

  column_1: FaqQA[]
  column_2: FaqQA[]

  constructor() { }

  ngOnInit(): void {
    this.column_1 = [
      {
        question: '¿El precio varía entre modelo y marca de vehículo?',
        answers: [
          'No, el precio es el mismo para cada vehículo sin importar el modelo y año.'
        ],
        bulletClass: 'bullet-green'
      },
      {
        question: '¿Se necesita realizar una cotización?',
        answers: [
          'No, cada servicio de Ituran cuenta con un precio ﬁjo mensual.'
        ],
        bulletClass: 'bullet-blue'
      },
      {
        question: '¿Aseguran motocicletas?',
        answers: [
          'No, por el momento solo aseguramos automóviles.'
        ],
        bulletClass: 'bullet-green'
      }
    ]
    this.column_2 = [
      {
        question: '¿Como lo puedo contratar?',
        answers: [
          'Puede contratarlo directamente en nuestro sitio web oﬁcial: https://ituranconseguro.com/#/',
          'O comunicándote al 800 911 9898'
        ],
        bulletClass: 'bullet-green'
      },
      {
        question: '¿En donde se encuentran las oﬁcinas de Ituran?',
        answers: [
          'Nos encontramos ubicados en:',
          'Avenida del Taller No. 36 Col. Tránsito, Alcaldía Cuauhtémoc, C.P. 06820, Ciudad de México'
        ],
        bulletClass: 'bullet-blue'
      }
    ]
  }
}

export class FaqQA {
  question: string
  answers: string[]
  bulletClass: string
}
