import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { Cliente } from 'src/app/Models/Cliente';
import { Factura } from 'src/app/Models/Factura';
import { Inicial } from 'src/app/Models/Inicial';
import { CPData } from 'src/app/Models/SepomexResponse';
import { UserDataModel } from 'src/app/Models/UserDataModel';
import { Vehiculo } from 'src/app/Models/Vehiculo';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-subscribe-now',
  templateUrl: './subscribe-now.component.html',
  styleUrls: ['./subscribe-now.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
  ,animations: [slideInOutAnimation]
})
export class SubscribeNowComponent implements OnInit {

  step: number;
  currentForm: string;
  circle: number = 0;
  userDataModel: UserDataModel;

  constructor(public _userDataService: UserDataService) { 
    this.userDataModel = _userDataService.userDataModel;
    this.step = _userDataService.step;
    this.currentForm = _userDataService.currentForm;
  }

  ngOnInit(): void {

  }

}
