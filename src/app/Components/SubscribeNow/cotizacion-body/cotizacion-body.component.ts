import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotizacion-body',
  templateUrl: './cotizacion-body.component.html',
  styleUrls: ['./cotizacion-body.component.css']
})
export class CotizacionBodyComponent implements OnInit {
  @Input() nmCotizacion: string
  constructor() { }

  ngOnInit(): void {
  }

}
