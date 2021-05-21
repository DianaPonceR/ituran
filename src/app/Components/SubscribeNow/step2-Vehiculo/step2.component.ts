import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { HideLoader, ShowLoader, validateEmptyString } from 'src/app/Helpers/GeneralHelpers';
import { Cotizacion, PerfilDetalle } from 'src/app/Models/Request/CotizacionRequest';
import { UserDataModel } from 'src/app/Models/UserDataModel';
import { Vehiculo } from 'src/app/Models/Vehiculo';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import { UserDataService } from 'src/app/Services/user-data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step2Component implements OnInit {
  stepForm: FormGroup;
  vehiculo: Vehiculo = new Vehiculo();

  constructor(private fb: FormBuilder, public _userDataService: UserDataService, private ituranApi: IturanApiService) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'vehiculo') this._userDataService.goToForm(this._userDataService.currentForm);
    this.stepForm = this.setFormGroup()
    // if(!environment.production) {
    //   this.stepForm.patchValue({
    //     placa: 'FXN3308',
    //     vin: '9BWDB45U9FT004640',
    //     contacto1: 'Rafael',
    //     telefonoc1: '967567575',
    //     parentezco1: null, //'Otro',
    //     contacto2: this._userDataService.userDataModel.vehiculo.contacto2,
    //     telefonoc2: this._userDataService.userDataModel.vehiculo.telefonoc2,
    //     parentezco2: null //this._userDataService.userDataModel.vehiculo.parentezco2,
    //   });
    // }
  }

  prev():void {
    this._userDataService.goToForm('cliente');
  }

  save():void {
    if(!this.stepForm.valid) {
      this.stepForm.markAllAsTouched()
      return
    }
    this.mapFormToModel();
    this._userDataService.userDataModel.vehiculo = this.vehiculo;

    // llamar api cotizacion - prepara request
    var cotizacionRequest = new Cotizacion()
    cotizacionRequest.CD_LEAD = this._userDataService.userDataModel.leadGuid;
    cotizacionRequest.DS_CHASSI = this.vehiculo.vin;
    cotizacionRequest.DS_PLACA = this.vehiculo.placa;
    cotizacionRequest.CD_MODELO = this._userDataService.userDataModel.inicial.modelo
    cotizacionRequest.NR_ANO = this._userDataService.userDataModel.inicial.anio
    cotizacionRequest.NR_CEP_PERNOITE = this._userDataService.userDataModel.inicial.cp
    cotizacionRequest.DS_COR = "PRETA"
    cotizacionRequest.DS_COMBUSTIVEL = "GASOLINA"
    
    var perfilDet1 = new PerfilDetalle()
    perfilDet1.Key = 'nascimento_segurado'
    perfilDet1.Value = this._userDataService.userDataModel.cliente.nacimiento.toString()

    var perfilDet2 = new PerfilDetalle()
    perfilDet2.Key = 'sexo_segurado'
    perfilDet2.Value = this._userDataService.userDataModel.cliente.sexo === 'Masculino' ? 'm' : "f"

    var perfilDet3 = new PerfilDetalle()
    perfilDet3.Key = 'estado_civil_segurado'
    perfilDet3.Value = 'default'
    
    cotizacionRequest.DS_PERFIL = [
      perfilDet1,
      perfilDet2,
      perfilDet3
    ]
    
    cotizacionRequest.DS_RFC = this._userDataService.userDataModel.cliente.rfc + this._userDataService.userDataModel.cliente.clave 
    cotizacionRequest.NM_PRIMEIRO_NOME = this._userDataService.userDataModel.inicial.nombre
    cotizacionRequest.NM_SOBRENOME_PAI = this._userDataService.userDataModel.inicial.paterno
    cotizacionRequest.NM_SOBRENOME_MAE = this._userDataService.userDataModel.inicial.materno

    // llamada a api

    // dev
    // if(!environment.production) { cotizacionRequest = this.hardCodeRequest() }
    // end dev

    ShowLoader()
    console.log('**COTIZACIONES REQUEST**')
    console.log(cotizacionRequest)
    this.ituranApi.getCotizaciones(cotizacionRequest).subscribe({
      next: response => {
        console.log('**COTIZACIONES RESPONSE**')
        console.log(JSON.stringify(response))
        this._userDataService.userDataModel.cotizaciones = response.Data;
        HideLoader();
        this._userDataService.goToForm('cotizaciones');
      },
      error: err => {
        console.log('**COTIZACIONES ERROR RESPONSE**');
        console.log(JSON.stringify(err));
        HideLoader();
        Swal.fire('Por el momento no podemos completar el proceso', "Contactanos al 800 911 9898", 'error');
      }
    });
  }

  mapFormToModel() : void {
    this.vehiculo.placa = this.stepForm.get('placa').value;
    this.vehiculo.vin = this.stepForm.get('vin').value;
    this.vehiculo.contacto1 = this.stepForm.get('contacto1').value;
    this.vehiculo.telefonoc1 = this.stepForm.get('telefonoc1').value;
    this.vehiculo.parentezco1 = this.stepForm.get('parentezco1').value;
    this.vehiculo.contacto2 = this.stepForm.get('contacto2').value;
    this.vehiculo.telefonoc2 = this.stepForm.get('telefonoc2').value;
    this.vehiculo.parentezco2 = this.stepForm.get('parentezco2').value;
  }

  hardCodeRequest(): Cotizacion {
    var cotizacionRequest = new Cotizacion()
    cotizacionRequest.CD_LEAD = this._userDataService.userDataModel.leadGuid;
    cotizacionRequest.DS_CHASSI = '9BWDB45U9FT004640';
    cotizacionRequest.DS_PLACA = 'FXN3308';
    cotizacionRequest.CD_MODELO = 24
    cotizacionRequest.NR_ANO = 2015
    cotizacionRequest.NR_CEP_PERNOITE = '04230'
    cotizacionRequest.DS_COR = "PRETA"
    cotizacionRequest.DS_COMBUSTIVEL = "GASOLINA"
    
    var perfilDet1 = new PerfilDetalle()
    perfilDet1.Key = 'nascimento_segurado'
    perfilDet1.Value = '1991/01/25'

    var perfilDet2 = new PerfilDetalle()
    perfilDet2.Key = 'sexo_segurado'
    perfilDet2.Value = 'm'

    var perfilDet3 = new PerfilDetalle()
    perfilDet3.Key = 'estado_civil_segurado'
    perfilDet3.Value = 'default'
    
    cotizacionRequest.DS_PERFIL = [
      perfilDet1,
      perfilDet2,
      perfilDet3
    ]
    
    cotizacionRequest.DS_RFC = 'PUAY910125194' 
    cotizacionRequest.NM_PRIMEIRO_NOME = 'Yuri'
    cotizacionRequest.NM_SOBRENOME_PAI = 'Puodzius'
    cotizacionRequest.NM_SOBRENOME_MAE = 'Alexander'
    return cotizacionRequest
  }

  private setFormGroup(): FormGroup {
    var fg = this.fb.group({
      placa: [this._userDataService.userDataModel.vehiculo.placa, [Validators.required, validateEmptyString]],
      vin: [this._userDataService.userDataModel.vehiculo.vin, [Validators.required, validateEmptyString]],
      contacto1: [this._userDataService.userDataModel.vehiculo.contacto1, [Validators.required, validateEmptyString]],
      telefonoc1: [this._userDataService.userDataModel.vehiculo.telefonoc1, [Validators.required, validateEmptyString, Validators.minLength(8), Validators.maxLength(10)]],
      parentezco1: [null/*this._userDataService.userDataModel.vehiculo.parentezco1*/, [Validators.required, validateEmptyString]],
      contacto2: this._userDataService.userDataModel.vehiculo.contacto2,
      telefonoc2: [this._userDataService.userDataModel.vehiculo.telefonoc2, [Validators.minLength(10), Validators.maxLength(10)]],
      parentezco2: null// this._userDataService.userDataModel.vehiculo.parentezco2 === '' ? null : this._userDataService.userDataModel.vehiculo.parentezco2,
    }); 

    return fg;
  }
}
