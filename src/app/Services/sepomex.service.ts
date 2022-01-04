import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SepomexResponse } from '../Models/SepomexResponse';

@Injectable({
  providedIn: 'root'
})
export class SepomexService {

  baseUrl: string = 'https://api.copomex.com/query/info_cp/';
  public httpOptions: any;
  public headers: any;
  public options: any;

  constructor(private _http: HttpClient) {
    this.options = environment.options;
    this.headers = new HttpHeaders().set('Content-Type', this.options);
    
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      })
    };
   }
  //CONSULTA DE CP
  GetCPInfo(cp): Observable<SepomexResponse[]>{
    return this._http.get<SepomexResponse[]>(this.baseUrl + cp + '?token=' + environment.sepomexToken); //, { headers: this.httpOptions.headers }
  }
}
