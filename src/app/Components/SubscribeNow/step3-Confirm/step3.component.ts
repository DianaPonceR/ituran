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
        vehiculoParticular: [false, [Validators.requiredTrue]],
        vehiculoSinSiniestro: [false, [Validators.requiredTrue]],
        terminosCondiciones: [false, [Validators.requiredTrue]]
      });
    }
    else {
      this.stepForm = this.fb.group({
        facturar: this._userDataService.userDataModel.facturar,
        // vehiculoParticular: [false, [Validators.requiredTrue]],
        vehiculoSinSiniestro: [false, [Validators.requiredTrue]],
        terminosCondiciones: [false, [Validators.requiredTrue]]
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
    var facturaCheck = this.stepForm.get('facturar').value;
    this._userDataService.userDataModel.facturar = facturaCheck;
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
