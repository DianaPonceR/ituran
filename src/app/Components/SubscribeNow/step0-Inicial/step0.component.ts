import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UserDataService } from 'src/app/Services/user-data.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SepomexService } from 'src/app/Services/sepomex.service';
import { Inicial } from 'src/app/Models/Inicial';
import { CPData } from 'src/app/Models/SepomexResponse';
import Swal from 'sweetalert2';
import { HideLoader, ShowLoader, validateEmptyString, validateValueChanged, isLetterKey } from 'src/app/Helpers/GeneralHelpers';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import { UserDataModel } from 'src/app/Models/UserDataModel';
import { VehiculoMarca } from 'src/app/Models/Response/CatalogoVehiculos';
import { SessionService } from 'src/app/Services/session-service.service';
import { ModelosRequest } from 'src/app/Models/Request/ModelosRequest';
import { Modelo } from 'src/app/Models/Response/ModelosResponse';
import { Lead } from 'src/app/Models/Lead';
import { environment } from 'src/environments/environment';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
// import  CotizacionesConfigs from "../../../../assets/json/cotizaciones.json";

@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step0Component implements OnInit {
  stepForm: FormGroup;
  inicial: Inicial = new Inicial();
  showModels: boolean = false;
  marcas: VehiculoMarca[];
  anios: number[];
  modelos: Modelo[];
  token: string;
  searchedModelos: boolean = false;
  marcaSelected: boolean = false;
  anioSelected: boolean = false;

  constructor(private fb: FormBuilder, 
              private sepomex: SepomexService, 
              private iteuranApi: IturanApiService, 
              private _userDataService: UserDataService) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    this.stepForm = this.setFormGroup();
    this.getVehiclesCatalog();
    
    // // only dev
    // // if(true) return
    // if(!environment.production){
    //   this.stepForm.patchValue({
    //     nombre: 'Yuri',
    //     paterno: 'Puodzius',
    //     materno: 'Alexander',
    //     telefono: '5538840569',
    //     correo: 'juan13@gmail.com',
    //     cp: '04230'
    //   });
    //   this.LeadDataChanged();
    // }
    // // end dev
  }

  save():void {
    if(!this.stepForm.valid) {
      this.stepForm.markAllAsTouched()
      return
    }
    this.mapFormToModel();
    this._userDataService.userDataModel.inicial = this.inicial;
    this._userDataService.goToForm('cliente');
  }

  searchCP():void {
    let cpValue: string = this.stepForm.get('cp').value;
    if(cpValue.length < 5) {
      // this.showModels = false
      return
    }
    if (cpValue === '') {
      Swal.fire('Error','Favor de ingresar un CP válido.','warning')
      return;
    }
    // loader
    ShowLoader();
    this.sepomex.GetCPInfo(this.stepForm.get('cp').value).subscribe({
      next: cps => {
        HideLoader();
        console.log(JSON.stringify(cps))
        var cp = cps[0];
        this._userDataService.userDataModel.sepomexResponse = cps;
        if(cp.response.estado === 'Ciudad de México' || cp.response.estado === 'México'){
          this._userDataService.userDataModel.cpData = cp.response;
          // this.showModels = true;
        }
        else {
          Swal.fire('Por ahora no contamos con servicio fuera de la Ciudad de México o el Estado de México', ":(", 'warning');
        }
      },
      error: err => {
        HideLoader();
        console.log(JSON.stringify(err));
        Swal.fire('No se pudo recuperar información del CP', "", 'warning');
      }
    });

  }

  hideOrShowSelects() {
    console.log(this.stepForm)
    var nombre = this.stepForm.get('nombre');
    var paterno = this.stepForm.get('paterno');
    var materno = this.stepForm.get('materno');
    var telefono = this.stepForm.get('telefono');
    var correo = this.stepForm.get('correo');
    var cp = this.stepForm.get('cp');
    if (nombre.value == '' || paterno.value == '' || materno.value == '' || telefono.value == '' || correo.value == '' || cp.value == '') {
      this.showModels = false
      return;
    }
    if(!nombre.valid || !paterno.valid || !materno.valid || !telefono.valid || !correo.valid || !cp.valid) {
      this.showModels = false
      return;
    }
    this.showModels = true
    return
  }

  private mapFormToModel() : void {
    this.inicial.nombre = this.stepForm.get('nombre').value;
    this.inicial.paterno = this.stepForm.get('paterno').value;
    this.inicial.materno = this.stepForm.get('materno').value;
    this.inicial.telefono = this.stepForm.get('telefono').value;
    this.inicial.correo = this.stepForm.get('correo').value;
    this.inicial.cp = this.stepForm.get('cp').value;
    this.inicial.anio = this.stepForm.get('anio').value;
    this.inicial.marca = this.stepForm.get('marca').value;
    this.inicial.modelo = this.stepForm.get('modelo').value;
    
    this.inicial.modeloStr = this.modelos.find(x => x.CD_MODELO == this.inicial.modelo).NM_MODELO;
    this.inicial.marcaStr = this.marcas.find(x => x.CD_MARCA == this.inicial.marca).NM_MARCA;
  }

  getVehiclesCatalog(): void {
    ShowLoader();
    this.iteuranApi.getVehiculos().subscribe({
      next: catalog => {
        console.log('**VEHICULOS RESPONSE**')
        console.log(JSON.stringify(catalog))
        this.marcas = catalog.Data.MARCAS.sort((n1,n2) => {
          if (n1.NM_MARCA > n2.NM_MARCA) {
              return 1;
          }
      
          if (n1.NM_MARCA < n2.NM_MARCA) {
              return -1;
          }
      
          return 0;
        });
        this.anios = catalog.Data.NR_ANO;
        HideLoader();
      },
      error: err => {
        console.log('**VEHICULOS ERROR RESPONSE**')
        console.log(JSON.stringify(err));
        HideLoader();
        Swal.fire('No se pudo recuperar información de vehiculos', "", 'warning');
      }
    });
    
  }

  getModelosCatalog(idMarca: number, anio: number) {
    
    var modelosRequest = new ModelosRequest(idMarca, anio);
    ShowLoader();
    this.iteuranApi.getModelos(modelosRequest).subscribe({
      next: catalog => {
        console.log('**MODELOS RESPONSE**')
        console.log(JSON.stringify(catalog))
        this.modelos = catalog.Data.sort((n1,n2) => {
          if (n1.NM_MODELO > n2.NM_MODELO) {
              return 1;
          }
      
          if (n1.NM_MODELO < n2.NM_MODELO) {
              return -1;
          }
      
          return 0;
        });
        HideLoader();
      },
      error: err => {
        HideLoader();
        console.log('**MODELOS ERROR RESPONSE**')
        console.log(JSON.stringify(err));
        Swal.fire('No se pudo recuperar información de modelos', "", 'warning');
      }
    });
    
  }

  marcaAnioSelected(selected: string) {
    var marca: number = this.stepForm.get('marca').value;
    var anio: number = this.stepForm.get('anio').value;

    if(selected === 'anio' && this.searchedModelos) {
      this.stepForm.patchValue({
        marca: null,
        modelo: null
      });
      this.modelos = null;
      this.searchedModelos = false;
      return
    }
    if (selected === 'marca' && this.searchedModelos){
      this.stepForm.patchValue({
        // anio: null,
        modelo: null
      });
      this.modelos = null;
      this.searchedModelos = false;
      //return
    }

    if(marca != null && anio != null) {
      this.getModelosCatalog(marca, anio);
      this.searchedModelos = true;
    }
  }

  LeadDataChanged() {
    console.log(this.stepForm)
    var nombre = this.stepForm.get('nombre');
    var paterno = this.stepForm.get('paterno');
    var materno = this.stepForm.get('materno');
    var telefono = this.stepForm.get('telefono');
    var correo = this.stepForm.get('correo');
    if (nombre.value == '' || paterno.value == '' || materno.value == '' || telefono.value == '' || correo.value == '') {
      return;
    }
    if(!nombre.valid || !paterno.valid || !materno.valid || !telefono.valid || !correo.valid) {
      return;
    }
    
    var lead: Lead = new Lead();
    lead.DS_ORIGEM = 'ituranPrueba';
    lead.DS_EMAIL = correo.value
    lead.NR_TELEFONE = telefono.value
    lead.NM_LEAD = `${nombre.value.replace(/\s+/g, " ")} ${paterno.value.replace(/\s+/g, " ")} ${materno.value.replace(/\s+/g, " ")}`
    lead.NM_PRIMEIRO_NOME = nombre.value.replace(/\s+/g, " ")
    lead.NM_SOBRENOME_PAI = paterno.value.replace(/\s+/g, " ")
    lead.NM_SOBRENOME_MAE = materno.value.replace(/\s+/g, " ")
    ShowLoader();
    console.log('**LEAD REQUEST**')
    console.log(lead)
    this.iteuranApi.sendLead(lead).subscribe({
      next: response => {
        this._userDataService.userDataModel.leadGuid = response.Data.CD_LEAD;
        console.log('**LEAD RESPONSE**')
        console.log(JSON.stringify(response.Data))
        console.log(response.Data.CD_LEAD)
        HideLoader();
      },
      error: err => {
        console.log('**LEAD ERROR RESPONSE**')
        console.log(JSON.stringify(err));
        HideLoader();
        //Swal.fire('Por el momento no podemos completar el proceso', "Contactanos al 800 911 9898", 'error');
      }
    });
    
  }

  private setFormGroup(): FormGroup {
    var fg = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
      paterno: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
      materno: ['', [Validators.required, Validators.minLength(2),validateEmptyString]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10),validateEmptyString]],
      correo: ['', [Validators.required, validateEmptyString, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)]],
      cp: ['', [Validators.required, Validators.minLength(5)]],
      anio: [null, [Validators.required, validateValueChanged('Seleccione un año'),validateEmptyString]],
      marca: [null, [Validators.required, validateValueChanged('Seleccione una marca'),validateEmptyString]],
      modelo: [null, [Validators.required, validateValueChanged('Seleccione un modelo'),validateEmptyString]]
    });
    return fg;
  }
}
