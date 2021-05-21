import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RfcHelper, validateEmptyString, validateValueChanged } from 'src/app/Helpers/GeneralHelpers';
import { Cliente } from 'src/app/Models/Cliente';
import { UserDataService } from 'src/app/Services/user-data.service';
import { DatePipe } from '@angular/common'
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step1Component implements OnInit {

  stepForm: FormGroup;
  cliente: Cliente = new Cliente();

  constructor(private fb: FormBuilder, public _userDataService: UserDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'cliente') this._userDataService.goToForm(this._userDataService.currentForm);
    this.stepForm = this.setFormGroup();
  }

  prev():void {
    this._userDataService.goToForm('inicial');
  }

  save():void {
    if(!this.stepForm.valid) {
      this.stepForm.markAllAsTouched()
      return
    }
    this.mapFormToModel();
    this._userDataService.userDataModel.cliente = this.cliente;
    this._userDataService.goToForm('vehiculo');
  }

  private mapFormToModel() : void {
    this.cliente.nacimiento = this.stepForm.get('nacimiento').value;
    this.cliente.rfc = this.stepForm.get('rfc').value;
    this.cliente.clave = this.stepForm.get('clave').value;
    this.cliente.sexo = this.stepForm.get('sexo').value;
    this.cliente.cp = this.stepForm.get('cp').value;
    this.cliente.estado = this.stepForm.get('estado').value;
    this.cliente.ciudad = this.stepForm.get('ciudad').value;
    this.cliente.municipio = this.stepForm.get('municipio').value;
    this.cliente.colonia = this.stepForm.get('colonia').value;
    this.cliente.calle = this.stepForm.get('calle').value;
    this.cliente.exterior = this.stepForm.get('exterior').value;
    this.cliente.indicaciones = this.stepForm.get('indicaciones').value;
  }

  NacimientoModificado () {
    var nacimiento: Date = this.stepForm.get('nacimiento').value;
    var nombre = this._userDataService.userDataModel.inicial.nombre;
    var paterno = this._userDataService.userDataModel.inicial.paterno;
    var materno = this._userDataService.userDataModel.inicial.materno;

    var rfcHelper = new RfcHelper();
    // genera rfc y homoclave
    var rfcClave = rfcHelper.itm_fn_RFC(nombre, paterno, materno, this.datepipe.transform(nacimiento, 'yyyy/MM/dd') );
    var clave = rfcClave.substring(10, 13);
    var rfc = rfcClave.substring(0, 10);
    this.stepForm.patchValue({
      rfc: rfc,
      clave: clave
    });
  }

  private setFormGroup(): FormGroup {
    var fg = this.fb.group({
      nacimiento: [this._userDataService.userDataModel.cliente.nacimiento , [Validators.required]],

      rfc: new FormControl({
        value: this._userDataService.userDataModel.cliente.rfc,
        disabled: true
      },[Validators.required]),

      clave: new FormControl({
        value: this._userDataService.userDataModel.cliente.clave,
        disabled: false
      },[Validators.required]),

      sexo: [this._userDataService.userDataModel.cliente.sexo, [Validators.required]],
      cp: new FormControl({
        value: this._userDataService.userDataModel.cpData.cp,
        disabled: true
      },[Validators.required]),

      estado: new FormControl({
        value: this._userDataService.userDataModel.cpData.estado,
        disabled: true
      },[Validators.required]),

      ciudad: new FormControl({
        value: this._userDataService.userDataModel.cpData.ciudad,
        disabled: true
      },[Validators.required]),

      municipio: new FormControl({
        value: this._userDataService.userDataModel.cpData.municipio,
        disabled: true
      },[Validators.required]),

      colonia: [null, [Validators.required, validateValueChanged('0'),validateEmptyString]],
      calle: [this._userDataService.userDataModel.cliente.calle, [Validators.required, Validators.minLength(1),validateEmptyString]],
      exterior: [this._userDataService.userDataModel.cliente.exterior, [Validators.required, Validators.minLength(1),validateEmptyString]],
      indicaciones: [this._userDataService.userDataModel.cliente.indicaciones]
    });
    // solo dev
    if(!environment.production) {
      this.stepForm = this.fb.group({
        nacimiento: new Date(1991,1,25),
        rfc: 'PUAY910125',
        clave: '194',
        sexo: 'm',
        cp: this._userDataService.userDataModel.cpData.cp,
        estado: this._userDataService.userDataModel.cpData.estado,
        ciudad: this._userDataService.userDataModel.cpData.ciudad,
        municipio: this._userDataService.userDataModel.cpData.municipio,
        colonia: this._userDataService.userDataModel.cpData.asentamiento,
        calle: 'Casiopea',
        exterior: 8,
        indicaciones: this._userDataService.userDataModel.cliente.indicaciones,
      });
    }
    return fg;
  }

  
}
