import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { errorMsgPago, errorMsgPedido, gpsMessage } from 'src/app/Helpers/alertsHtml';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { HideLoader, ShowLoader } from 'src/app/Helpers/GeneralHelpers';
import { GatewayCheckoutRequest, GatewayCustomer, GatewayOrder } from 'src/app/Models/Request/GatewayRequest';
import { EnderecoCobranca, Mensalidade, PedidoContactoEmergencia, PedidoRequest, PedidoRequestCliente, PedidoTaxa, ProductoItemEscogido } from 'src/app/Models/Request/PedidoRequest';
import { GatewayCheckoutResponse, GatewayCheckoutResponseData } from 'src/app/Models/Response/GatewayResponse';
import { UserDataModel } from 'src/app/Models/UserDataModel';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import { UserDataService } from 'src/app/Services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
  // ,encapsulation: ViewEncapsulation.ShadowDom
})
export class Step5Component implements OnInit {

  public serviceGPS: any = null;
  public tipoPago: number;
  public wlink: any = null;
  public showStart: boolean = true;
  public pagando: boolean = false;
  public showOxxoMssg: boolean = false;
  public status_msg: any = null;

  constructor(public _userDataService: UserDataService, private _ituranApiService: IturanApiService) { }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'pago') this._userDataService.goToForm(this._userDataService.currentForm);
    
    // dev
    // this.showMessage('pagando');
    // this.showMessage('inicio');
    // this.showMessage('oxxo');
    // return
    // end dev
    
    if(this._userDataService.userDataModel.ituranGatewayPago != null) {
      // pagando
      this.showMessage('pagando');
    }
    else {
      var cotizaciones = this._userDataService.userDataModel.cotizaciones
      if(cotizaciones.COTACAO_ITEMS.some(x => x.NM_PRODUTO === "ITURAN CON SEGUROS MEXICO")) {
        this.serviceGPS = false;
      }
      if(cotizaciones.COTACAO_ITEMS.some(x => x.NM_PRODUTO === "RASTREADOR ITURAN GPS/GPRS")
      && this.serviceGPS != false) {
        this.serviceGPS = false;
      }
        
      if(this.serviceGPS == false) {
        // document.getElementById('pagar').style.display = 'block';
        // document.getElementById('loader').style.display = 'none';
      }
      else if(this.serviceGPS == true) {
        Swal.fire({
          icon: 'success',
          title: '¡FELICIDADES!',
          html: gpsMessage,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this._userDataService.goToForm('finalizado');
          }
        })
        // document.getElementById('mensaje_gps').style.display = 'block';
        // document.getElementById('loader').style.display = 'none';
      }

    }
  }

  prev():void {
    var facturar = this._userDataService.userDataModel.facturar;
    if(facturar) {
      this._userDataService.goToForm('factura');
    }
    else {
      this._userDataService.goToForm('confirma');
    }
  }

  save(): void {
    this._userDataService.goToForm('agenda');
  }

  setPago(tipoPago: number) {
    //return
    ShowLoader()
    this.tipoPago = tipoPago;
    this.getPedido(tipoPago);
  }



  getPedido(tipoPago: number) {
    // //dev
    // HideLoader()
    // this.showMessage('pagando');
    // return;
    // //end dev

    var pedido = this.prepararPedido(tipoPago);
    console.log('***PEDIDO REQUEST***');
    console.log(JSON.stringify(pedido));
    this._ituranApiService.getPedido(pedido).subscribe(
      response => {
        console.log('***PEDIDO RESPONSE***');
        console.log(JSON.stringify(response));
        this._userDataService.userDataModel.pedido = response.Data;
        this.verifyPedido();
      },
      error => {
        console.log('***PEDIDO ERROR RESPONSE***');
        console.log(JSON.stringify(error));
        HideLoader()
        Swal.fire({
          icon: 'error',
          title: 'POR EL MOMENTO NO PODEMOS COMPLETAR EL PROCESO',
          html: errorMsgPedido,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this._userDataService.goToForm('inicial');
          }
        });
      }
    );
  }

  // establece el objeto de pedido 
  private prepararPedido(tipoPago: number): PedidoRequest {
    var pedido: PedidoRequest = new PedidoRequest();
    var cotizacionesResponse = this._userDataService.userDataModel.cotizaciones
    var selectedCotizacion = this._userDataService.userDataModel.selectedCotizacion
    var cliente = this._userDataService.userDataModel.cliente
    var inicial = this._userDataService.userDataModel.inicial
    var vehiculo = this._userDataService.userDataModel.vehiculo
    var item: ProductoItemEscogido[];

    pedido.GUID_COTACAO = cotizacionesResponse.GUID_COTACAO

    // llena items escogidos
    cotizacionesResponse.COTACAO_ITEMS.forEach(coti => {
      if(coti.NM_PRODUTO === "ITURAN CON SEGUROS MEXICO") {
        this.serviceGPS = null;
        item = [
          {
            CD_COTACAO_ITEM: coti.CD_COTACAO_ITEM,
            VL_COMISSAO: ''
          }
        ]
      }
    })
    // llena objeto cobrança
    var cobranca: EnderecoCobranca = {
      ENDERECO_COMPLETO: cliente.calle,
      COMPLEMENTO: cliente.indicaciones === "" ? "." : cliente.indicaciones,
      NM_BAIRRO: cliente.colonia,
      NR_CEP: cliente.cp,
      NUMERO: cliente.exterior
    }

    // Llena datos de contacto emergencia
    var ddd = vehiculo.telefonoc1.substring(0, 2);
    var phone = vehiculo.telefonoc1.substring(2, 10);
    var emergencia: PedidoContactoEmergencia[] = [
      {
        NM_NOME: vehiculo.contacto1,
        NR_DDD: ddd,
        NR_TELEFONE: phone
      }
    ]
    // si se lleno contacto 2 se llena
    if(vehiculo.telefonoc2 !== '') {
      var ddd2 = vehiculo.telefonoc2.substring(0, 2);
      var phone2 = vehiculo.telefonoc2.substring(2, 10);
      emergencia.push({
        NM_NOME: vehiculo.contacto2,
        NR_DDD: ddd2,
        NR_TELEFONE: phone2
      })
    }

    var masa: Mensalidade
    //var taxa: PedidoTaxa[]
    var taxa: Mensalidade

    // pago por tajeta y link
    if(tipoPago === 1) {
      masa = {
        FORMA_PAGAMENTO_CARTAO_CREDITO: {
          CD_TIPO_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_TIPO_FORMA_PAGAMENTO,
          CD_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_FORMA_PAGAMENTO
        },
        // FORMA_PAGAMENTO_BOLETO_BANCARIO: {
        //   CD_TIPO_FORMA_PAGAMENTO:4,
        //   CD_FORMA_PAGAMENTO:2
        // }
      };
      taxa = {
        FORMA_PAGAMENTO_CARTAO_CREDITO: {
          CD_TIPO_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_TIPO_FORMA_PAGAMENTO,
          CD_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_FORMA_PAGAMENTO
        }
      }
      // taxa = [
      //   {
      //     TIPO_COBRANCA: 5,
      //     CD_TIPO_FORMA_PAGAMENTO_ESCOLHIDA: 4,
      //     CD_FORMA_PAGAMENTO_BANCO_ESCOLHIDO: 20
      //   }
      // ]
      delete masa.FORMA_PAGAMENTO_BOLETO_BANCARIO;
      delete masa.FORMA_PAGAMENTO_BOLETO_ELETRONICO;
      // delete taxa[0].FORMA_PAGAMENTO_BOLETO_BANCARIO;
      // delete taxa[0].FORMA_PAGAMENTO_BOLETO_ELETRONICO;
    }
    // pago por oxxo
    else {
      masa = {
        FORMA_PAGAMENTO_BOLETO_ELETRONICO: {
          CD_TIPO_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_BOLETO_ELETRONICO[0].CD_TIPO_FORMA_PAGAMENTO,
          CD_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_BOLETO_ELETRONICO[0].CD_FORMA_PAGAMENTO
        }
        // FORMA_PAGAMENTO_BOLETO_BANCARIO: {
        //   CD_TIPO_FORMA_PAGAMENTO:4,
        //   CD_FORMA_PAGAMENTO:2
        // }
      };
      taxa = {
        FORMA_PAGAMENTO_BOLETO_ELETRONICO: {
          CD_TIPO_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_BOLETO_ELETRONICO[0].CD_TIPO_FORMA_PAGAMENTO,
          CD_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_BOLETO_ELETRONICO[0].CD_FORMA_PAGAMENTO
        }
      }
      // taxa = [
      //   {
      //     TIPO_COBRANCA: 5,
      //     CD_TIPO_FORMA_PAGAMENTO_ESCOLHIDA: 4,
      //     CD_FORMA_PAGAMENTO_BANCO_ESCOLHIDO: 20
      //   }
      // ]
      delete masa.FORMA_PAGAMENTO_BOLETO_BANCARIO;
      delete masa.FORMA_PAGAMENTO_CARTAO_CREDITO;
      // delete taxa[0].FORMA_PAGAMENTO_BOLETO_BANCARIO;
      // delete taxa[0].FORMA_PAGAMENTO_CARTAO_CREDITO;
    }

    pedido.PRODUTO_ITEM_ESCOLHIDOS = item;
    pedido.MENSALIDADE = masa;
    pedido.ENDERECO_COBRANCA = cobranca;
    pedido.CONTATO_EMERGENCIA = emergencia;
    pedido.TAXA_INSTALACAO = taxa; // old
    // pedido.TAXAS = taxa // new

    if(this._userDataService.userDataModel.facturar) {
      pedido.CD_COMPROVANTE_DIGITAL = 'G03';

      var factura = this._userDataService.userDataModel.factura;
      if(factura.nombre != inicial.nombre || factura.paterno != inicial.paterno
        || factura.materno != inicial.materno  || factura.telefono != inicial.telefono
        || factura.cp != inicial.cp || factura.correo != inicial.correo 
        || factura.calle != cliente.calle || factura.cp != cliente.cp || factura.colonia != cliente.colonia
        || factura.exterior != cliente.exterior){
          var infoc: PedidoRequestCliente = {
            NR_CNPJ_CPF: factura.rfc + factura.clave,
            NM_PRIMEIRO_NOME: factura.nombre,
            NM_SOBRENOME_PAI: factura.paterno,
            NM_SOBRENOME_MAE: factura.materno,
            NR_TELEFONE: factura.telefono,
            DT_NASCIMENTO: factura.nacimiento,
            CD_ESTADO_CIVIL: 6,
            CD_SEXO: cliente.sexo,
            DS_EMAIL: factura.correo,
          }
          var infoc2: EnderecoCobranca = {
            ENDERECO_COMPLETO: factura.calle,
            COMPLEMENTO: factura.indicaciones != '' ? factura.indicaciones : '.',
            NM_BAIRRO: factura.colonia,
            NR_CEP: factura.cp,
            NUMERO: factura.exterior
          }
          pedido.CLIENTE = infoc
          pedido.ENDERECO_CLIENTE = infoc2
        }
    }
    return pedido;
  }

  private verifyPedido() {
    var pedido = this._userDataService.userDataModel.pedido;
    var cdPedido = pedido.CD_PEDIDO
    console.log('***STATUS PEDIDO REQUEST***');
    console.log(JSON.stringify(cdPedido));
    this._ituranApiService.getStatusPedido(cdPedido).subscribe(
      response => {
        console.log('***STATUS PEDIDO RESPONSE***');
        console.log(JSON.stringify(response));

        if(response.Data.COBRANCAS[0].DS_TIPO_COBRANCA == "Mensalidade"){
          // localStorage.setItem("ituranGatewayMensual", JSON.stringify(response.Data.COBRANCAS[0]));
          this._userDataService.userDataModel.ituranGatewayMensual = response.Data.COBRANCAS[0];
          this.load_pago(response.Data.COBRANCAS[1].PAGAMENTO.CD_PAGAMENTO, response.Data.COBRANCAS[1].CD_TIPO_COBRANCA, response.Data.COBRANCAS[1].PAGAMENTO.CD_FORMA_PAGAMENTO);
          // this.getLink(response.Data.COBRANCAS[1].PAGAMENTO.CD_PAGAMENTO, response.Data.COBRANCAS[1].CD_TIPO_COBRANCA, response.Data.COBRANCAS[1].PAGAMENTO.CD_FORMA_PAGAMENTO);
        }
        else if(response.Data.COBRANCAS[0].DS_TIPO_COBRANCA == "Instalação") {
          // localStorage.setItem("ituranGatewayMensual", JSON.stringify(response.Data.COBRANCAS[1]));
          this._userDataService.userDataModel.ituranGatewayMensual = response.Data.COBRANCAS[1];
          this.load_pago(response.Data.COBRANCAS[0].PAGAMENTO.CD_PAGAMENTO, response.Data.COBRANCAS[0].CD_TIPO_COBRANCA, response.Data.COBRANCAS[0].PAGAMENTO.CD_FORMA_PAGAMENTO);
          // this.getLink(response.Data.COBRANCAS[0].PAGAMENTO.CD_PAGAMENTO, response.Data.COBRANCAS[0].CD_TIPO_COBRANCA, response.Data.COBRANCAS[0].PAGAMENTO.CD_FORMA_PAGAMENTO);
        }
      },
      error => {
        console.log('***STATUS PEDIDO ERROR RESPONSE***');
        console.log(error);
        HideLoader()
        Swal.fire({
          icon: 'error',
          title: 'POR EL MOMENTO NO PODEMOS COMPLETAR EL PROCESO',
          html: errorMsgPedido,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this._userDataService.goToForm('inicial');
          }
        });
      }
    );
  }

  load_pago(pagamento, t_cobranza, f_pago){
    // var menusal = JSON.parse(localStorage.getItem("ituranGatewayMensual"));
    // if(localStorage.getItem("ituranGateway") == null){
      console.log('****LOGIN PAGO REQUEST****')
      this._ituranApiService.loginPago().subscribe(
        response => {
          console.log('***LOGIN PAGO RESPONSE***');
          console.log(JSON.stringify(response));
          // localStorage.setItem("ituranGateway", JSON.stringify(response));
          this._userDataService.userDataModel.gatewayTokenResponse = response;
          this.getLink(pagamento, t_cobranza, f_pago);
        },
        error => {
          console.log('***LOGIN PAGO ERROR RESPONSE***');
          console.log(JSON.stringify(error));
          // document.getElementById('loader').style.display = 'none';
          HideLoader();
          // document.getElementById('mensaje_error').style.display = 'block';
          Swal.fire({
            icon: 'error',
            title: 'POR EL MOMENTO NO PODEMOS COMPLETAR EL PROCESO',
            html: errorMsgPedido,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this._userDataService.goToForm('inicial');
            }
          });
        }
      );
    // }
    // else {
    //   this.getLink(pagamento, t_cobranza, f_pago);
    // }
  }

  getLink(pagamento, t_cobranza, f_pago){
    // this.inicial = JSON.parse(localStorage.getItem("ituranInicial"));
    // var cotizacion = JSON.parse(localStorage.getItem("ituranCotizacion"));
    // var gateway = JSON.parse(localStorage.getItem("ituranGateway"));
    // var pedido = JSON.parse(localStorage.getItem("ituranPedido"));

    var inicial = this._userDataService.userDataModel.inicial;
    var cotizacion = this._userDataService.userDataModel.cotizaciones;
    var pedido = this._userDataService.userDataModel.pedido;
    var token = this._userDataService.userDataModel.gatewayTokenResponse.data.token;

    var reference = cotizacion.COTACAO_ITEMS[0].CD_COTACAO_ITEM;
    var customer: GatewayCustomer = {
      Name: `${inicial.nombre} ${inicial.paterno} ${inicial.materno}`,
      Email: inicial.correo
    };
    var order: GatewayOrder = {
      ExternalReference: pagamento,
      Amount: 199.0,
      CobranzaTypeId: t_cobranza,
      PaymentTypeId: this.tipoPago
    } 
    
    var pagando: GatewayCheckoutRequest = {
      Customer: customer,
      Order: order
    }

    console.log('****PAGO REQUEST****')
    console.log(pagando);
    // this.pago = JSON.parse(pagando);
    // localStorage.setItem("ituranGatewayRequest", JSON.stringify(this.pago));

    // if(localStorage.getItem("ituranGatewayPago") == null){
    //   localStorage.setItem("ituranGatewayTipo", this.tipoPago.toString());
      console.log("GENERANDO LINK DE PAGO REQUEST");
      // console.log(JSON.stringify(this.pago));
      this._ituranApiService.getPaymentLink(pagando, token).subscribe(
        response => {
          // localStorage.setItem("ituranGatewayPago", JSON.stringify(response));
          this._userDataService.userDataModel.ituranGatewayPagoResponse = response;
          console.log("GENERANDO LINK DE PAGO RESPONSE");
          console.log(JSON.stringify(response));
          HideLoader();
          this.showMessage('pagando');
          this.openLink();
          // document.getElementById('mensaje_pagando').style.display = 'block';
        },
        error => {
          console.log(JSON.stringify(error));
          HideLoader();
          Swal.fire({
            icon: 'error',
            title: 'POR EL MOMENTO NO PODEMOS COMPLETAR EL PROCESO',
            html: errorMsgPago,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this._userDataService.goToForm('inicial');
            }
          });
        }
      );
    // }
    // else {
    //   document.getElementById('loader').style.display = 'none';
    //   document.getElementById('mensaje_pagando').style.display = 'block';
    //   this.openLink();
    // }
  }

  openLink(){
    // //dev
    // this._userDataService.userDataModel.ituranGatewayPagoResponse = new GatewayCheckoutResponse();
    // this._userDataService.userDataModel.ituranGatewayPagoResponse.data = new GatewayCheckoutResponseData();
    // this._userDataService.userDataModel.ituranGatewayPagoResponse.data.url = 'https://google.com';
    // //end dev


    window.scrollTo(0, 0);
    // var link = JSON.parse(localStorage.getItem("ituranGatewayPago"));
    var link = this._userDataService.userDataModel.ituranGatewayPagoResponse;
    this.wlink = link.data.url;

    var wt = screen.width * 0.6;
    var swt = screen.width * 0.2;
    var hg = screen.height * 0.8;
    window.open(this.wlink,"Payment","width="+wt+",height="+hg+",top=100,scrollbars=NO,left="+swt);
    window.moveTo(50,50);

    
  }

  continuar(){
    // //dev
    // ShowLoader();
    // this.continuar_next();
    // return;
    // //end dev

    this.status_msg = null;
    // document.getElementById('mensaje_pagando').style.display = 'none';
    // document.getElementById('loader').style.display = 'block';
    ShowLoader();

    // var gateway = JSON.parse(localStorage.getItem("ituranGateway"));
    // var link = JSON.parse(localStorage.getItem("ituranGatewayPago"));
    var link = this._userDataService.userDataModel.ituranGatewayPagoResponse

    this._ituranApiService.validatePago(link.data.checkOutId).subscribe(
      response => {
        console.log(response.data.paymentStatus);
        // document.getElementById('loader').style.display = 'none';
        HideLoader();
        if(response.data.paymentStatus == 1){
          this.status_msg = "Aún no se realiza el pago";
          // document.getElementById('mensaje_pagando').style.display = 'block';
        }
        if(response.data.paymentStatus == 2){
          console.log("Pagado");
          this.continuar_proceso();
        }
        if(response.data.paymentStatus == 3){
          this.status_msg = "El pago ha sido cancelado";
          // document.getElementById('mensaje_error').style.display = 'block';
          this.showErrorMessage();
        }
        if(response.data.paymentStatus == 4){
          this.status_msg = "Pago preautorizado, intentalo de nuevo en unos momentos";
          // document.getElementById('mensaje_pagando').style.display = 'block';
        }
        if(response.data.paymentStatus == 5){
          this.status_msg = "No se pudo realizar el pago";
          // document.getElementById('mensaje_error').style.display = 'block';
          this.showErrorMessage();
        }
        console.log(this.status_msg);
        // document.getElementById("exampleModal").classList.add("show");
        // this.continuar_proceso();
      },
      error => {
        console.log(error);
        HideLoader();
        this.showErrorMessage();
        // document.getElementById('loader').style.display = 'none';
        // document.getElementById('mensaje_error').style.display = 'block';
      }
    );
  }

  continuar_proceso(){
    // var gateway = JSON.parse(localStorage.getItem("ituranGateway"));
    var token = this._userDataService.userDataModel.gatewayTokenResponse.data.token;
    // var tipo = localStorage.getItem("ituranGatewayTipo");
    var tipo = this.tipoPago;
    // var menusal = JSON.parse(localStorage.getItem("ituranGatewayMensual"));
    var menusal = this._userDataService.userDataModel.ituranGatewayMensual;
    var inicial = this._userDataService.userDataModel.inicial
    var link = this._userDataService.userDataModel.ituranGatewayPagoResponse;

    console.log(menusal);

    // var customer = '{'+
    //   '"Name": "'+ this.inicial.nombre + " " + this.inicial.paterno + " " + this.inicial.materno +'",'+
    //   '"Email": "'+ this.inicial.correo + '"'+
    // '}';
    // var order = '{'+
    //   '"ExternalReference": '+JSON.stringify(menusal.PAGAMENTO.CD_PAGAMENTO)+','+
    //   '"Amount": 349.0,'+
    //   '"CobranzaTypeId": '+JSON.stringify(menusal.CD_TIPO_COBRANCA)+','+
    //   '"PaymentTypeId": '+tipo+
    // '}';
    // var pagando = '{'+
    //   '"Customer": '+ customer + ','+
    //   '"Order": '+ order + ','+
    //   '"InstallationCheckoutId": ' + link.data.checkOutId +
    // '}';
    var customer: GatewayCustomer = {
      Name: `${inicial.nombre} ${inicial.paterno} ${inicial.materno}`,
      Email: inicial.correo
    };
    var order: GatewayOrder = {
      ExternalReference: menusal.PAGAMENTO.CD_PAGAMENTO,
      Amount: 349.0,
      CobranzaTypeId: menusal.CD_TIPO_COBRANCA,
      PaymentTypeId: this.tipoPago
    } 
    
    var pagando: GatewayCheckoutRequest = {
      Customer: customer,
      Order: order,
      InstallationCheckoutId: link.data.checkOutId
    }
    // this.pago = JSON.parse(pagando);

    if(tipo == 1){
      console.log("REGISTRO DE MENSUALIDADES REQUEST");
      console.log(JSON.stringify(pagando));
      this._ituranApiService.getPaymentLink(pagando, token).subscribe(
        response => {
          console.log("**REGISTRO DE MENSUALIDADES RESPONSE**")
          console.log(JSON.stringify(response))
          this.continuar_next();
        },
        error => {
          console.log("**REGISTRO DE MENSUALIDADES ERROR RESPONSE**")
          console.log(JSON.stringify(error))
          this.continuar_next();
        }
      );
    }
    else {
      // document.getElementById('loader').style.display = 'none';
      HideLoader()
      // document.getElementById('mensaje_oxxo').style.display = 'block';
      this.showMessage('oxxo')
    }
  }

  continuar_next(){
    // var tipo = localStorage.getItem("ituranGatewayTipo");
    var tipo = this.tipoPago;
    if(tipo == 1) {
      HideLoader()
      // this._router.navigate(['/instalacion']); //agenda
      this._userDataService.goToForm('agenda');
    }
    else {
      // document.getElementById('loader').style.display = 'none';
      HideLoader()
      // document.getElementById('mensaje_oxxo').style.display = 'block';
      this.showMessage('oxxo')
    }
  }
  private mocckPedido(): PedidoRequest {
    var pedido: PedidoRequest = new PedidoRequest();
    var cotizacionesResponse = this._userDataService.userDataModel.cotizaciones
    var selectedCotizacion = this._userDataService.userDataModel.selectedCotizacion
    var cliente = this._userDataService.userDataModel.cliente
    var inicial = this._userDataService.userDataModel.inicial
    var vehiculo = this._userDataService.userDataModel.vehiculo
    var item: ProductoItemEscogido[];

    pedido.GUID_COTACAO = cotizacionesResponse.GUID_COTACAO

    // llena items escogidos
    cotizacionesResponse.COTACAO_ITEMS.forEach(coti => {
      if(coti.NM_PRODUTO === "ITURAN CON SEGUROS MEXICO") {
        this.serviceGPS = null;
        item = [
          {
            CD_COTACAO_ITEM: coti.CD_COTACAO_ITEM,
            VL_COMISSAO: ''
          }
        ]
      }
    })
    // llena objeto cobrança
    var cobranca: EnderecoCobranca = {
      ENDERECO_COMPLETO: cliente.calle,
      COMPLEMENTO: cliente.indicaciones,
      NM_BAIRRO: cliente.colonia,
      NR_CEP: cliente.cp,
      NUMERO: cliente.exterior
    }

    // Llena datos de contacto emergencia
    var ddd = vehiculo.telefonoc1.substring(0, 2);
    var phone = vehiculo.telefonoc1.substring(2, 10);
    var emergencia: PedidoContactoEmergencia[] = [
      {
        NM_NOME: vehiculo.contacto1,
        NR_DDD: ddd,
        NR_TELEFONE: phone
      }
    ]
    // si se lleno contacto 2 se llena
    if(vehiculo.telefonoc2 !== '') {
      var ddd2 = vehiculo.telefonoc2.substring(0, 2);
      var phone2 = vehiculo.telefonoc2.substring(2, 10);
      emergencia.push({
        NM_NOME: vehiculo.contacto2,
        NR_DDD: ddd2,
        NR_TELEFONE: phone2
      })
    }

    var masa: Mensalidade
    var taxa: Mensalidade[]
    // pago por tajeta y link
    if(true) {
      masa = {
        FORMA_PAGAMENTO_BOLETO_BANCARIO: {
          CD_TIPO_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_TIPO_FORMA_PAGAMENTO,
          CD_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_FORMA_PAGAMENTO
        }
      };
      taxa = [{
        FORMA_PAGAMENTO_CARTAO_CREDITO: {
          CD_TIPO_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_TIPO_FORMA_PAGAMENTO,
          CD_FORMA_PAGAMENTO: cotizacionesResponse.TAXAS[0].PAGAMENTOS.FORMA_PAGAMENTO_CARTAO_CREDITO[0].CD_FORMA_PAGAMENTO
        }
      }]
      delete masa.FORMA_PAGAMENTO_BOLETO_BANCARIO;
      delete masa.FORMA_PAGAMENTO_BOLETO_ELETRONICO;
      delete taxa[0].FORMA_PAGAMENTO_BOLETO_BANCARIO;
      delete taxa[0].FORMA_PAGAMENTO_BOLETO_ELETRONICO;
    }
    

    pedido.PRODUTO_ITEM_ESCOLHIDOS = item;
    pedido.MENSALIDADE = masa;
    pedido.ENDERECO_COBRANCA = cobranca;
    pedido.CONTATO_EMERGENCIA = emergencia;
    //pedido.TAXA_INSTALACAO = taxa;

    if(this._userDataService.userDataModel.facturar) {
      pedido.CD_COMPROVANTE_DIGITAL = 'G01';

      var factura = this._userDataService.userDataModel.factura;
      if(factura.nombre != inicial.nombre || factura.paterno != inicial.paterno
        || factura.materno != inicial.materno  || factura.telefono != inicial.telefono
        || factura.cp != inicial.cp || factura.correo != inicial.correo 
        || factura.calle != cliente.calle || factura.cp != cliente.cp || factura.colonia != cliente.colonia
        || factura.exterior != cliente.exterior){
          var infoc: PedidoRequestCliente = {
            NR_CNPJ_CPF: factura.rfc + factura.clave,
            NM_PRIMEIRO_NOME: factura.nombre,
            NM_SOBRENOME_PAI: factura.paterno,
            NM_SOBRENOME_MAE: factura.materno,
            NR_TELEFONE: factura.telefono,
            DT_NASCIMENTO: factura.nacimiento,
            CD_ESTADO_CIVIL: 6,
            CD_SEXO: cliente.sexo,
            DS_EMAIL: factura.correo,
          }
          var infoc2: EnderecoCobranca = {
            ENDERECO_COMPLETO: factura.calle,
            COMPLEMENTO: factura.indicaciones,
            NM_BAIRRO: factura.colonia,
            NR_CEP: factura.cp,
            NUMERO: factura.exterior
          }
          pedido.CLIENTE = infoc
          pedido.ENDERECO_CLIENTE = infoc2
        }
    }
    return pedido;
  }

  public showErrorMessage() {
    Swal.fire({
      icon: 'error',
      title: 'POR EL MOMENTO NO PODEMOS COMPLETAR EL PROCESO',
      html: errorMsgPago,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalizar();
      }
    });
  }

  private showMessage(mssg: string) {
    if(mssg === 'inicio') {
      this.showStart = true;
      this.pagando = false;
      this.showOxxoMssg = false;
    }
    else if(mssg === 'pagando') {
      this.showStart = false;
      this.pagando = true;
      this.showOxxoMssg = false;
    }
    else if(mssg === 'oxxo') {
      this.showStart = false;
      this.pagando = false;
      this.showOxxoMssg = true;
    }
  }

  finalizar() {
    this._userDataService.clearSession();
    this._userDataService.goToForm('inicial');
  }
}
