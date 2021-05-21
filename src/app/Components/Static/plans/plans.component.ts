import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  chubbUrl: string = 'assets/icons/chubb_bw.png';
  hdiUrl: string = 'assets/icons/hdi_bw.png';
  rastreadorGPS: ServiceTag = {
    imgUrl: 'assets/images/whatnext_app.png',
    text: 'Rastreador GPS'
  }
  asistencia: ServiceTag = {
    imgUrl: 'assets/images/whatnext_app.png',
    text: 'Asistencia vial 24/7'
  }
  rastreadorApp: ServiceTag = {
    imgUrl: 'assets/images/whatnext_app.png',
    text: 'Rastreo 24/7 desde la app'
  }
  polizaUnica: ServiceTag = {
    imgUrl: 'assets/images/whatnext_app.png',
    text: 'Póliza únicamente contra robo de auto'
  }
  polizaRobo: ServiceTag = {
    imgUrl: 'assets/images/whatnext_app.png',
    text: 'Póliza contra robo de auto'
  }
  danios: ServiceTag = {
    imgUrl: 'assets/images/whatnext_app.png',
    text: 'Daños a terceros'
  }
  planCards: PlanCard[] = [
    {
      imgUrl: 'assets/images/ituranProteccion.png',
      textFront: `Servicio de localización y recuperación vehicular. Si llegaras a sufrir un robo total del vehículo, recuperamos el automóvil hasta en 48 horas*.`,
      textBack: [
        `Ituran Protección es únicamente un servicio de localización y recuperación vehicular.`,
        `Si llegaras a sufrir un percance de robo total de tu auto, y por alguna razón no lo pudiéramos recuperar, te indemnizamos con el 10% del valor comercial del mismo. (Hasta por $20,000).`,
        `La tasa de recuperación del vehículo es del 80%.`
      ],
      price: 339,
      serviceTags: [
        this.rastreadorGPS,
        this.asistencia,
        this.rastreadorGPS
      ]
    },
    {
      imgUrl: 'assets/images/ituranConSeguro.png',
      textFront: `Si llegaras a sufrir un percance de robo total de tu auto, y por alguna razón no lo pudiéramos recuperar, el seguro te lo paga gracias a la pólizaemitida por las aseguradoras <strong>CHUBB</strong> y <strong>HDI</strong>`,
      // textFront: `Si llegaras a sufrir un percance de robo total de tu auto, y por alguna razón no lo pudiéramos recuperar, el seguro te lo paga gracias a la pólizaemitida por las aseguradoras <div class="span-chubb"><img src= ${this.chubbUrl} ></div> y <div class="span-hdi"><img src= ${this.hdiUrl} ></div>`,
      textBack: [
        `Póliza contra robo total de automóvill emitida por las aseguradoras <strong>CHUBB</strong> y <strong>HDI</strong> seguros. Servicio de localización y recuperación vehicular.`,
        // `Póliza contra robo total de automóvill emitida por las aseguradoras <div class="span-chubb"><img src= ${this.chubbUrl} ></div> y <div class="span-hdi"><img src= ${this.hdiUrl} ></div> seguros. Servicio de localización y recuperación vehicular.`,
        `Si llegaras a sufrir un robo total del vehículo, recuperamos el automóvil hasta en 48 horas*.`
      ],
      price: 349,
      serviceTags: [
        this.rastreadorGPS,
        this.asistencia,
        this.rastreadorGPS,
        this.polizaUnica
      ]
    },
    {
      imgUrl: 'assets/images/ituranCSDT.png',
      textFront: `Ituran con Seguro + Daños a terceros te brinda todos los beneﬁcios de Ituran con Seguro más responsabilidad civil para bienes y personas.`,
      textBack: [
        `Ituran con Seguro + Daños a terceros La suma de responsabilidad civil para bienes y personas es sólo por $500, 000 gracias a la poliza emitida por la aseguradora <strong>CHUBB</strong>.`
        // `Ituran con Seguro + Daños a terceros La suma de responsabilidad civil para bienes y personas es sólo por $500, 000 gracias a la poliza emitida por la aseguradora <div class="span-chubb"><img src= ${this.chubbUrl} ></div> `
      ],
      price: 395,
      serviceTags: [
        this.rastreadorGPS,
        this.asistencia,
        this.rastreadorGPS,
        this.polizaRobo,
        this.danios
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
  goTo(id: string){
    var offset = 90; // sticky nav height
    var el = document.getElementById(id); // element you are scrolling to
    window.scroll({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });
  }

}

export class PlanCard {
  constructor() {}
  imgUrl: string
  textFront: string
  price: number
  serviceTags: ServiceTag[]
  textBack: string[]

}

export class ServiceTag {
  imgUrl: string
  text: string
}
