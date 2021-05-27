import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDataService } from 'src/app/Services/user-data.service';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { CotizacionResponseData } from 'src/app/Models/Response/CotizacionResponse';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import { CotizacionConfig } from 'src/app/Models/CotizacionConfig';
// import  CotizacionesConfigs from "../../../../assets/json/cotizaciones.json";
// import {plainToClass} from "class-transformer";

@Component({
  selector: 'app-step21',
  templateUrl: './step21.component.html',
  styleUrls: ['./step21.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step21Component implements OnInit {

  selected: number = 0
  userSelectedCotizacion: boolean = false
  cotizacionesConfig: CotizacionConfig[]
  cotizacionesConfigLoaded = false
  constructor(public _userDataService: UserDataService, private _ituranApi: IturanApiService) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'cotizaciones') this._userDataService.goToForm(this._userDataService.currentForm);
    this._ituranApi.getCotizacionesConfig().subscribe({
      next: cots => {
      
      this.cotizacionesConfig = cots
      this.cotizacionesConfigLoaded = true
      },
      error: err => {

      }
    });
    // dev
    // if(!environment.production) {
    //   this._userDataService.userDataModel.cotizaciones = this.mockCotizacion()
    // }
  }

  prev(){
    this._userDataService.goToForm('vehiculo');
  }

  save(){
    if(!this.userSelectedCotizacion) {
      return
    }
    this._userDataService.goToForm('confirma');
  }

  getImg(name: string) {
    var cot = this.cotizacionesConfig.find(x => x.nombre === name)
    if(cot === undefined) return "assets/images/ituranConSeguro.png"
    return cot.img
  }

  getPrecioString(name: string) {
    var cot = this.cotizacionesConfig.find(x => x.nombre === name)
    if(cot === undefined) return "349"
    return cot.precioString
  }

  cotizacionSelected(cotizacionId: number) {
    this.selected = cotizacionId
    this._userDataService.userDataModel.selectedCotizacion = this._userDataService.userDataModel.cotizaciones.COTACAO_ITEMS.find(x => x.CD_COTACAO_ITEM === cotizacionId);
    this._userDataService.userDataModel.selectedCotizacionConfig = this.cotizacionesConfig.find(x  => x.nombre === this._userDataService.userDataModel.selectedCotizacion.NM_PRODUTO);
    this.userSelectedCotizacion = true
  }

  getBackgroundColor(cotizacionId: number): string {
    return cotizacionId === this.selected ? '#ff9222' : '#479acd'
  }

  mockCotizacion(): CotizacionResponseData {
    var cotizacion = new CotizacionResponseData()
    cotizacion.COTACAO_ITEMS = [
      {
        CD_COTACAO_ITEM: 1,
        FL_DOMICILIAR: true,
        VL_TOTAL_DESLOCAMENTO: 1,
        VL_MENSALIDADE: '',
        VL_ANUAL: '',
        TAXA_VL_TOTAL: 1,
        NR_PORCENTAGEM_INDENIZACAO: 1,
        NM_PRODUTO: 'Cotizacion 1 Ituran MExico',
        DS_PRODUTO: [ 'aasdfasdf', 'asdfa saf asdf ', 'asdfasdf' ]
      },
      {
        CD_COTACAO_ITEM: 2,
        FL_DOMICILIAR: true,
        VL_TOTAL_DESLOCAMENTO: 1,
        VL_MENSALIDADE: '',
        VL_ANUAL: '',
        TAXA_VL_TOTAL: 1,
        NR_PORCENTAGEM_INDENIZACAO: 1,
        NM_PRODUTO: 'Cotizacion 2 Ituran 222',
        DS_PRODUTO: [ 'aasdfasdf', 'asdfa saf asdf ', 'asdfasdf' ]
      },
      {
        CD_COTACAO_ITEM: 3,
        FL_DOMICILIAR: true,
        VL_TOTAL_DESLOCAMENTO: 1,
        VL_MENSALIDADE: '',
        VL_ANUAL: '',
        TAXA_VL_TOTAL: 1,
        NR_PORCENTAGEM_INDENIZACAO: 1,
        NM_PRODUTO: 'Cotizacion 3 Ituran 333',
        DS_PRODUTO: [ 'aasdfasdf', 'asdfa saf asdf ', 'asdfasdf' ]
      }
    ]
    return cotizacion
  }

}
