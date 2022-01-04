import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { PedidoRequest } from 'src/app/Models/Request/PedidoRequest';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step3Component implements OnInit {

  stepForm: FormGroup;
  facturar: boolean = false;
  importes: string[] = []
  importesLoaded = false

  constructor(private fb: FormBuilder, public _userDataService: UserDataService) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'confirma') this._userDataService.goToForm(this._userDataService.currentForm);
    this.loadImportes();
    if(this.importes.includes('vehiculoParticular')){
      this.stepForm = this.fb.group({
        facturar: this._userDataService.userDataModel.facturar,
        vehiculoParticular: [this._userDataService.userDataModel.importe.vehiculoParticular, [Validators.requiredTrue]],
        vehiculoSinSiniestro: [this._userDataService.userDataModel.importe.vehiculoSiniestro, [Validators.requiredTrue]],
        terminosCondiciones: [this._userDataService.userDataModel.importe.terminosCondiciones, [Validators.requiredTrue]]
      });
    }
    else {
      this.stepForm = this.fb.group({
        facturar: this._userDataService.userDataModel.facturar,
        // vehiculoParticular: [false, [Validators.requiredTrue]],
        vehiculoSinSiniestro: [this._userDataService.userDataModel.importe.vehiculoSiniestro, [Validators.requiredTrue]],
        terminosCondiciones: [this._userDataService.userDataModel.importe.terminosCondiciones, [Validators.requiredTrue]]
      });
    }
  }

  prev():void {
    this._userDataService.goToForm('cotizaciones');
  }

  save():void {
    if(!this.stepForm.valid) {
      return
    }
    var vehiculoParticular: any;
    var vehiculoSinSiniestro: any;
    var terminosCondiciones: any;
    var facturaCheck = this.stepForm.get('facturar').value;
    if(this.importes.includes('vehiculoParticular')){
      var vehiculoParticular = this.stepForm.get('vehiculoParticular').value;
      var vehiculoSinSiniestro = this.stepForm.get('vehiculoSinSiniestro').value;
      var terminosCondiciones = this.stepForm.get('terminosCondiciones').value;
    }
    else {
      var vehiculoSinSiniestro = this.stepForm.get('vehiculoSinSiniestro').value;
      var terminosCondiciones = this.stepForm.get('terminosCondiciones').value;
    }


    this._userDataService.userDataModel.facturar = facturaCheck;
    this._userDataService.userDataModel.importe.terminosCondiciones = terminosCondiciones;
    this._userDataService.userDataModel.importe.vehiculoParticular = vehiculoParticular;
    this._userDataService.userDataModel.importe.vehiculoSiniestro = vehiculoSinSiniestro;
    if(facturaCheck) {
      this._userDataService.goToForm('factura');
    }
    else {
      this._userDataService.goToForm('pago');
    }
  }

  loadImportes() {
    this.importes = this._userDataService.userDataModel.selectedCotizacionConfig.importes
    this.importesLoaded = true
  }
}
