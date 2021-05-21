import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { HideLoader, ShowLoader, validateEmptyString, validateValueChanged } from 'src/app/Helpers/GeneralHelpers';
import { Factura } from 'src/app/Models/Factura';
import { SepomexService } from 'src/app/Services/sepomex.service';
import { UserDataService } from 'src/app/Services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step4Component implements OnInit {

  @Output() moveTo: EventEmitter<string> = new EventEmitter<string>();

  stepForm: FormGroup;
  factura: Factura = new Factura();
  useSavedData : boolean = false;
  importes: string[] = []
  importesLoaded = false

  constructor(private fb: FormBuilder, private sepomex: SepomexService, public _userDataService: UserDataService) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'factura') this._userDataService.goToForm(this._userDataService.currentForm);
    this.loadImportes()
    this.stepForm = this.setFormGroup()
  }

  prev():void {
    this._userDataService.goToForm('confirma');
  }

  save():void {
    if(!this.stepForm.valid) {
      this.stepForm.markAllAsTouched()
      return
    }
    this.mapFormToModel();
    this._userDataService.userDataModel.factura = this.factura;
    this._userDataService.goToForm('pago');
  }

  mapFormToModel() : void {
    this.factura.nombre = this.stepForm.get('nombre').value;
    this.factura.paterno = this.stepForm.get('paterno').value;
    this.factura.materno = this.stepForm.get('materno').value;
    this.factura.telefono = this.stepForm.get('telefono').value;
    this.factura.correo = this.stepForm.get('correo').value;
    this.factura.rfc = this.stepForm.get('rfc').value;
    this.factura.clave = this.stepForm.get('clave').value;
    this.factura.nacimiento = this.stepForm.get('nacimiento').value;
    this.factura.cp = this.stepForm.get('cp').value;
    this.factura.estado = this.stepForm.get('estado').value;
    this.factura.ciudad = this.stepForm.get('ciudad').value;
    this.factura.municipio = this.stepForm.get('municipio').value;
    this.factura.colonia = this.stepForm.get('colonia').value;
    this.factura.calle = this.stepForm.get('calle').value;
    this.factura.exterior = this.stepForm.get('exterior').value;
    this.factura.indicaciones = this.stepForm.get('indicaciones').value;
  }

  toggleUseSavedData() {
    this.useSavedData = !this.useSavedData;
    if(this.useSavedData) {
      this.stepForm.patchValue({
        nombre: this._userDataService.userDataModel.inicial.nombre,
        paterno: this._userDataService.userDataModel.inicial.paterno,
        materno: this._userDataService.userDataModel.inicial.materno,
        telefono: this._userDataService.userDataModel.inicial.telefono,
        correo: this._userDataService.userDataModel.inicial.correo,
        rfc: this._userDataService.userDataModel.cliente.rfc,
        clave: this._userDataService.userDataModel.cliente.clave,
        nacimiento: this._userDataService.userDataModel.cliente.nacimiento,
        cp: this._userDataService.userDataModel.cliente.cp,
        estado: this._userDataService.userDataModel.cliente.estado,
        ciudad: this._userDataService.userDataModel.cliente.ciudad,
        municipio: this._userDataService.userDataModel.cliente.municipio,
        colonia: this._userDataService.userDataModel.cliente.colonia,
        calle: this._userDataService.userDataModel.cliente.calle,
        exterior: this._userDataService.userDataModel.cliente.exterior,
        indicaciones: this._userDataService.userDataModel.cliente.indicaciones
      });
    }
    else {
      this.stepForm.patchValue({
        nombre: '',
        paterno: '',
        materno: '',
        telefono: '',
        correo: '',
        rfc: '',
        clave: '',
        nacimiento: '',
        cp: '',
        estado: '',
        ciudad: '',
        municipio: '',
        colonia: '',
        calle: '',
        exterior: '',
        indicaciones: ''
      });
    }
  }

  searchCP():void {
    let cpValue: string = this.stepForm.get('cp').value;
    if(cpValue.length < 5) return
    if (cpValue === '') {
      Swal.fire('Error','Favor de ingresar un CP válido.','warning')
      return;
    }
    // loader
    ShowLoader();
    var res = this.sepomex.GetCPInfo(this.stepForm.get('cp').value).subscribe({
      next: cps => {
        HideLoader();
        var cp = cps[0];
        this._userDataService.userDataModel.sepomexResponse = cps;
        this.stepForm.patchValue({
          estado: cp.response.estado,
          ciudad: cp.response.ciudad,
          municipio: cp.response.municipio,
          // colonia: cp.response.asentamiento
        });
        // if(cp.response.estado === 'Ciudad de México'){
        //   this.saveCPData.emit(cp.response);
        // }
        // else {
        //   Swal.fire('Por ahora no contamos con servicio fuera de la Ciudad de México.', ":(", 'warning');
        // }
      },
      error: err => {
        HideLoader();
        console.log(err);
        Swal.fire('No se pudo recuperar información del CP', "", 'warning');
      }
    });
  }

  loadImportes() {
    this.importes = this._userDataService.userDataModel.selectedCotizacionConfig.importes
    this.importesLoaded = true
  }

  private setFormGroup(): FormGroup {
    var fg: FormGroup
    if(this.importes.includes('vehiculoParticular')){
      fg = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        paterno: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        materno: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        telefono: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(10),validateEmptyString]],
        correo: ['', [Validators.required, Validators.minLength(2),validateEmptyString,Validators.email]],
        rfc: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        clave: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        nacimiento: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        cp: ['', [Validators.required, Validators.minLength(2)]],
        estado: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        ciudad: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        municipio: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        colonia: [null, [Validators.required, validateValueChanged('0'),validateEmptyString]],
        calle: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        exterior: [null, [Validators.required, Validators.minLength(1),validateEmptyString]],
        indicaciones: [''],
        vehiculoParticular: [false,[Validators.requiredTrue]],
        vehiculoSinSiniestro: [false,[Validators.requiredTrue]],
        terminosCondiciones: [false,[Validators.requiredTrue]]
      });
    }
    else {
      fg = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        paterno: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        materno: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        telefono: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(10),validateEmptyString]],
        correo: ['', [Validators.required, Validators.minLength(2),validateEmptyString,Validators.email]],
        rfc: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        clave: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        nacimiento: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        cp: ['', [Validators.required, Validators.minLength(2)]],
        estado: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        ciudad: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        municipio: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        colonia: [null, [Validators.required, validateValueChanged('0'),validateEmptyString]],
        calle: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
        exterior: [null, [Validators.required, Validators.minLength(1),validateEmptyString]],
        indicaciones: [''],
        // vehiculoParticular: [false,[Validators.requiredTrue]],
        vehiculoSinSiniestro: [false,[Validators.requiredTrue]],
        terminosCondiciones: [false,[Validators.requiredTrue]]
      });
    }
    return fg
  }
}
