import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IturanApiService } from './ituran-api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  token: string
  constructor(private _ituranApi: IturanApiService) {

  }
  setToken(): void {
    debugger
    this._ituranApi.getToken().subscribe({
      next: response => {
        debugger
        var d = new Date();
        var tday = d.getUTCDate()+"/"+d.getUTCMonth();
        localStorage.setItem("ituranToken", response.Data.access_token);
        localStorage.setItem('tokenExpires', response.Data.expires_in.toString());
        localStorage.setItem("ituranDay", tday);
        // console.log("TOKEN RESPONSE");
        // console.log(JSON.stringify(response));
        // var dataToken = JSON.parse(localStorage.getItem("ituranToken"));
        this.token = response.Data.access_token;
      },
      error: err => {
        console.log(err);
        Swal.fire('No se pudo recuperar información de vehiculos', "", 'warning');
      }
    });
  }

  getToken():string {
    return this.token;
  }

  tokenIsValid(): boolean {
    return true;
  }
}
