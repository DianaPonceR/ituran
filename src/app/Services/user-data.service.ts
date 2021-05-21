import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { scrollTo } from '../Helpers/GeneralHelpers';
import { Cliente } from '../Models/Cliente';
import { Inicial } from '../Models/Inicial';
import { CPData } from '../Models/SepomexResponse';
import { UserDataModel } from '../Models/UserDataModel';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  step: number = 1;
  currentForm: string = 'inicial'
  userDataModel: UserDataModel = new UserDataModel();

  constructor(private router: Router) {}
  nextStep ():void {
    this.step ++;
  }
  prevStep():void {
    this.step --;
  }

  goToForm(formName: string): void{
    this.currentForm = formName;
    switch(formName) {
      case 'inicial':
        this.step = 1;
        this.saveSessionState();
        this.router.navigate(['/home'])
        // scrollTo('contratarAhora');
        break;
      case 'cliente':
        this.step = 1;
        this.saveSessionState();
        this.router.navigate(['/cliente'])
        break;
      case 'vehiculo':
        this.step = 2;
        this.saveSessionState();
        this.router.navigate(['/vehiculo'])
        break;
      case 'cotizaciones':
        this.step = 3;
        this.saveSessionState();
        this.router.navigate(['/cotizacion'])
        break;
      case 'confirma':
        this.step = 4;
        this.saveSessionState();
        this.router.navigate(['/confirmacion'])
        break;
      case 'factura':
        this.step = 4;
        this.saveSessionState();
        this.router.navigate(['/factura'])
        break;
      case 'pago':
        this.step = 5;
        this.saveSessionState();
        this.router.navigate(['/pago'])
        break;
      case 'agenda':
        this.step = 6;
        this.saveSessionState();
        this.router.navigate(['/agenda'])
        break;
      default: 
        this.step = 1;
        break;
    }
    
  }

  getSessionState() {
    // debugger
    this.step = JSON.parse(localStorage.getItem("step"))??this.step;
    this.currentForm =  JSON.parse(localStorage.getItem("currentForm"))??this.currentForm;
    this.userDataModel =  JSON.parse(localStorage.getItem("userDataModel"))??this.userDataModel;
  }

  saveSessionState() {
    // debugger
    localStorage.setItem("step", JSON.stringify(this.step));
    localStorage.setItem("currentForm", JSON.stringify(this.currentForm));
    localStorage.setItem("userDataModel", JSON.stringify(this.userDataModel));
  }

  clearSession() {
    this.step = 1;
    this.currentForm = 'inicial';
    this.userDataModel = new UserDataModel();
  }
}
