import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatalogoVehiculosData, CatalogoVehiculosResponse } from '../Models/Response/CatalogoVehiculos';
import { Login } from '../Models/Login';
import { LoginResponse } from '../Models/Response/LoginResponse';
import { SessionService } from './session-service.service';
import Swal from 'sweetalert2';
import { mergeMap } from 'rxjs/operators';
import { ModelosRequest } from '../Models/Request/ModelosRequest';
import { ModelosResponse } from '../Models/Response/ModelosResponse';
import { Lead } from '../Models/Lead';
import { LeadResponse } from '../Models/Response/LeadResponse';
import { Cotizacion } from '../Models/Request/CotizacionRequest';
import { CotizacionResponse } from '../Models/Response/CotizacionResponse';
import { PedidoRequest } from '../Models/Request/PedidoRequest';
import { PedidoResponse } from '../Models/Response/PedidoResponse';
import { CotizacionConfig } from '../Models/CotizacionConfig';
import { StatusPedidoResponse } from '../Models/Response/StatusPedidoResponse';
import { GatewayCheckoutRequest, GatewayTokenRequest } from '../Models/Request/GatewayRequest';
import { GatewayCheckoutResponse, GatewayTokenResponse } from '../Models/Response/GatewayResponse';

@Injectable({
  providedIn: 'root'
})
export class IturanApiService {

  // token: string = '';

  public url: string;
  public url_pago: string;
  public options: any;
  public headers: any;
  public headersFlujo: any;

  public httpOptions: any;
  public httpOptionsFlujo: any;
  private login: Login;
  private gwAccess: GatewayTokenRequest;

  constructor(public http: HttpClient) {
    this.login = new Login(environment.a, environment.b);
    this.gwAccess = new GatewayTokenRequest(environment.c, environment.d);
    this.url = environment.ituranApiBaseUrl;
    this.url_pago = environment.url_pago;
    this.options = environment.options;
    this.headers = new HttpHeaders().set('Content-Type', this.options);
    
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      })
    };

  }

  //PRIMER SERVICIO - AUTENTICACION
  getToken(): Observable<LoginResponse> {
    let json = JSON.stringify(this.login);
    return this.http.post<LoginResponse>(this.url + 'Login', json, {headers: this.headers})
  }

  //SEGUNDO SERVICIO - LEAD
  sendLead(lead: Lead): Observable<LeadResponse> {
    let json = JSON.stringify(lead);
    let loginJson = JSON.stringify(this.login);

    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.post<LeadResponse>(this.url + 'cotacao/Lead', json, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));

    // this.headersFlujo = new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + token);
    // return this.http.post(this.url+'cotacao/Lead', json, {headers: this.headersFlujo});
  }

  //TERCER SERVICIO - VEHICULOS
  getVehiculos(): Observable<CatalogoVehiculosResponse> {
    let loginJson = JSON.stringify(this.login);
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.get<CatalogoVehiculosResponse>(this.url + 'veiculo/CarregarMarcaAno', { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
  }
  
  //COMPLEMENTO TERCER SERVICIO - MODELOS DE VEHICULOS
  getModelos(modelosRequest: ModelosRequest): Observable<ModelosResponse>{
    let loginJson = JSON.stringify(this.login);
    let json = JSON.stringify(modelosRequest);
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.post<ModelosResponse>(this.url + 'Veiculo/CarregarModelos', json, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
  }

  //QUINTO SERVICIO - COTIZACION
  getCotizaciones(cotizacion: Cotizacion): Observable<CotizacionResponse>{
    let loginJson = JSON.stringify(this.login);
    let json = JSON.stringify(cotizacion);
    
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.post<CotizacionResponse>(this.url + 'Cotacao', json, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
  }

  getCotizacionesConfig(): Observable<CotizacionConfig[]> {
    return this.http.get<CotizacionConfig[]>("assets/json/cotizaciones.json");
  }


  //SEXTO SERVICIO - PEDIDO
  getPedido(pedido: PedidoRequest): Observable<PedidoResponse>{
    let loginJson = JSON.stringify(this.login);
    let json = JSON.stringify(pedido);
    
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.post<PedidoResponse>(this.url + 'Pedido', json, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
  }

  getStatusPedido(cdPedido: string): Observable<StatusPedidoResponse>{
    let loginJson = JSON.stringify(this.login);
    
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.get<StatusPedidoResponse>(this.url + 'Pedido/status?CD_PEDIDO=' + cdPedido, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
  }

  loginPago(): Observable<GatewayTokenResponse> {
    let access = JSON.stringify(this.gwAccess);
    return this.http.post<GatewayTokenResponse>(this.url_pago + 'Account/SignIn', access, {headers: this.headers})
  }

  getPaymentLink(gatewayRequest: GatewayCheckoutRequest, token: string): Observable<GatewayCheckoutResponse> {
    let json = JSON.stringify(gatewayRequest);
    return this.http.post<GatewayCheckoutResponse>(this.url_pago + 'CheckOut/NewCheckOut', json, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + token)})
  }

  //SERVICIOS PASARELA PAGOS - VERIFICAR STATUS DE PAGO
  validatePago(id): Observable<any>{
    let access = JSON.stringify(this.gwAccess);

    return this.http.post<GatewayTokenResponse>(this.url_pago + 'Account/SignIn', access, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.get(this.url_pago + 'CheckOut/GetPaymentStatus/'+id, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.data.token)})
    ));
    // let json = JSON.stringify(gatewayRequest);
    // var validateHttpOptions = {
    //   headers: new HttpHeaders({ 
    //     'Access-Control-Allow-Origin':'*',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'bearer '+token
    //   })
    // };

    // console.log('Pag 2b')
    // return this.http.get(this.url_pago+'CheckOut/GetPaymentStatus/'+id, validateHttpOptions);
  }

  // SEPTIMO SERVICIO - CENTROS DE SERVICIOS
  getCentros(pedido, cp): Observable<any>{
    // this.headersFlujo = new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer '+token);
    let loginJson = JSON.stringify(this.login);
    
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.get(this.url+'agendamento/loja?CD_PEDIDO='+pedido+'&NR_CEP_AGENDAMENTO='+cp+'&FL_AGENDAMENTO_DOMICILIAR=false', { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
    // return this._http.get(this.url+'agendamento/loja?CD_PEDIDO='+pedido+'&NR_CEP_AGENDAMENTO='+cp+'&FL_AGENDAMENTO_DOMICILIAR=false', {headers: this.headersFlujo});
  }

  //OCTAVO SERVICIO - REGISTRO DE SERVICIOS
  registrarCita(registro): Observable<any>{
    let loginJson = JSON.stringify(this.login);
    let json = JSON.stringify(registro);
    
    return this.http.post<LoginResponse>(this.url + 'Login', loginJson, {headers: this.headers})
    .pipe(mergeMap(res => 
      this.http.post(this.url + 'Agendamento', json, { headers: new HttpHeaders().set('Content-Type', this.options).set('Authorization', 'bearer ' + res.Data.access_token)})
    ));
  }
}


