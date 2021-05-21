import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SepomexResponse } from '../Models/SepomexResponse';

@Injectable({
  providedIn: 'root'
})
export class SepomexService {

  baseUrl: string = 'https://api-sepomex.hckdrk.mx/query/info_cp/';
  constructor(private _http: HttpClient) { }
  //CONSULTA DE CP
  GetCPInfo(cp): Observable<SepomexResponse[]>{
    return this._http.get<SepomexResponse[]>(this.baseUrl + cp + '?token=' + environment.sepomexToken);
  }
}
