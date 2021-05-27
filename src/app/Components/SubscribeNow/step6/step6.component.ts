import { Component, OnInit} from '@angular/core';
import { slideInOutAnimation } from 'src/app/Helpers/app.animations';
import { HideLoader, ShowLoader } from 'src/app/Helpers/GeneralHelpers';
import { UserDataModel } from 'src/app/Models/UserDataModel';
import { IturanApiService } from 'src/app/Services/ituran-api.service';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css']
})
export class Step6Component implements OnInit {
  public search_cp: string;
  public ituranSearched: boolean = false;
  public centros: any;

  public id_selected: any;
  public dia_selected: any = 0;
  public data_selected: any;
  public hora_selected: any = 0;

  public horaFlag: boolean = false;
  public diaFlag: boolean = false;

  public status_msg: any = null;

  constructor(public _userDataService: UserDataService, private _ituranApiService: IturanApiService) { 
    this.search_cp = "";
  }

  ngOnInit(): void {
    this._userDataService.getSessionState();
    if(this._userDataService.currentForm != 'agenda') this._userDataService.goToForm(this._userDataService.currentForm);
    this.getCentros();
  }

  getCentros(){
    document.getElementById("select_horario").style.display = "none";
    // document.getElementById("completo").style.display = "none";
    // document.getElementById("loader").style.display = "block";
    // var dataToken = JSON.parse(localStorage.getItem("ituranToken"));
    // var inicial = JSON.parse(localStorage.getItem("ituranInicial"));
    // var pedido = JSON.parse(localStorage.getItem("ituranPedido"));

    // dev
    // this.centros = this.mockCentros();
    // return 
    // end dev

    ShowLoader();
    var inicial = this._userDataService.userDataModel.inicial;
    var pedido = this._userDataService.userDataModel.pedido;

    // var token = dataToken.Data.access_token;
    var cp = inicial.cp;

    if(this.search_cp != ""){
      cp = this.search_cp;
    }

    // if(localStorage.getItem("ituranSearched") == null){
    //   this.flag = "false";
    // }
    // else {
    //   this.flag = "true";
    // }
    
    var cdPedido = pedido.CD_PEDIDO;

    this._ituranApiService.getCentros(cdPedido, cp).subscribe(
      response => {
        // localStorage.setItem("ituranSearched", "true");
        this.ituranSearched = true;
        this.search_cp = "";
        this.centros = response.Data;
        console.log("CENTROS RESPONSE");
        console.log(JSON.stringify(response));
        // document.getElementById("loader").style.display = "none";
        // document.getElementById("completo").style.display = "block";
        console.log(this.centros);
        HideLoader()
      },
      error => {
        // document.getElementById("loader").style.display = "none";
        // document.getElementById("completo").style.display = "block";
        console.log(error);
        this.centros = null;
        HideLoader()
      }
    );
  }

  selectCentro(id){
    this.dia_selected = 0;
    this.hora_selected = 0;
    this.id_selected = id;
    document.getElementById("select_horario").style.display = "block";
    document.getElementById("select_horario").scrollIntoView({behavior: "smooth"});
  }

  setHorarios(centro){
    this.data_selected = centro;
    this.hora_selected = 0;
    for(var k in centro) {
      if(centro[k].Data == this.dia_selected){
        this.data_selected = centro[k].Horarios;
      }
   }
  }

  validar_horario(){
    if(this.dia_selected != 0 && this.hora_selected != 0){
      document.getElementById("completo").style.display = "none";
      // document.getElementById("loader").style.display = "block";
      ShowLoader();
      document.getElementById("sdia").style.border = "none";
      document.getElementById("shora").style.border = "none";
      
      // var dataToken = JSON.parse(localStorage.getItem("ituranToken"));
      // var pedido = JSON.parse(localStorage.getItem("ituranPedido"));
      
      // var token = dataToken.Data.access_token;
      // var pedido = pedido.Data.CD_PEDIDO;
      var pedido = this._userDataService.userDataModel.pedido.CD_PEDIDO;
      
      // dev
      // pedido = '123'
      // end dev
      
      // if(localStorage.getItem("ituranSearched") != null && this.flag == "false"){
      if(this.ituranSearched){
        var request = '{'+
                        '"CD_PEDIDO": '+pedido+','+
                        '"CD_LOJA": '+this.id_selected+','+
                        '"DATA": "'+this.dia_selected+'",'+
                        '"NR_PERIODO": '+this.hora_selected+','+
                        '"FL_AGENDAMENTO_DOMICILIAR": false'+
                      '}';
      }
      else {
        var request = '{'+
                        '"CD_PEDIDO": '+pedido+','+
                        '"CD_LOJA": '+this.id_selected+','+
                        '"DATA": "'+this.dia_selected+'",'+
                        '"NR_PERIODO": '+this.hora_selected+','+
                        '"FL_AGENDAMENTO_DOMICILIAR": false'+
                      '}';
      }

      

      var registrar = JSON.parse(request);

      console.log("AGENDAMIENTO REQUEST");
      console.log(registrar);
      if(localStorage.getItem("ituranCita") == null){


        // dev
        // document.getElementById("completo").style.display = "block";
        // HideLoader();
        // document.getElementById('seleccionarLoja').style.display = 'none';
        // document.getElementById('mensjae_exito').style.display = 'block';
        // return;
        // end dev

        this._ituranApiService.registrarCita(registrar).subscribe(
          response => {
            console.log("AGENDAMIENTO RESPONSE");
            console.log(response);
            document.getElementById("completo").style.display = "block";
            // document.getElementById("loader").style.display = "none";
            HideLoader();
            localStorage.setItem("ituranCita", JSON.stringify(response));
            console.log(response);
            document.getElementById('seleccionarLoja').style.display = 'none';
            document.getElementById('mensjae_exito').style.display = 'block';
          },
          error => {
            console.log("AGENDAMIENTO RESPONSE");
            console.log(error);
            document.getElementById("completo").style.display = "block";
            // document.getElementById("loader").style.display = "none";
            HideLoader();
            document.getElementById('mensjae_error').style.display = 'block';
          }
        );
      }
      else {
        document.getElementById("completo").style.display = "block";
        // document.getElementById("loader").style.display = "none";
        HideLoader();
        document.getElementById('seleccionarLoja').style.display = 'none';
        document.getElementById('mensjae_exito').style.display = 'block';
      }
    }
    else {
      if(this.dia_selected == 0){
        document.getElementById("sdia").style.border = "solid red";
        document.getElementById("sdia").style.borderWidth = "2px";
      }
      else {
        document.getElementById("sdia").style.border = "none";
      }
      if(this.hora_selected == 0){
        document.getElementById("shora").style.border = "solid red";
        document.getElementById("shora").style.borderWidth = "2px";
      }
      else {
        document.getElementById("shora").style.border = "none";
      }
    }
  }

  finalizar(){
    // localStorage.removeItem("ituranInicial");
    // localStorage.removeItem("ituranCliente");
    // localStorage.removeItem("ituranPerfil");
    // localStorage.removeItem("ituranVehiculo");
    // localStorage.removeItem("ituranCotizacion");
    // localStorage.removeItem("ituranVehiculo");
    // localStorage.clear();
    this._userDataService.clearSession();
    this._userDataService.goToForm('inicial');
  }

  private mockCentros() {
    return [
      {
        LOJA: {
          CD_LOJA: 1111,
          NOME_LOJA: "BOSCH CUAUTITLÁN IZCALLI",
          NM_BAIRRO: "bairro",
          NR_NUMERO: "55554646",
          NM_ENDERECO: "Colonia 1",
          NM_CIDADE: "Ciudad",
          NR_CEP: "23343"
        },
        DATAS_HORAS: [
          {
            Data: '28 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '29 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '30 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          }
        ]
      },
      {
        LOJA: {
          CD_LOJA: 2222,
          NOME_LOJA: "MEINEKE BOSQUES DEL LAGO",
          NM_BAIRRO: "bairro",
          NR_NUMERO: "55554646",
          NM_ENDERECO: "Colonia 1",
          NM_CIDADE: "Ciudad",
          NR_CEP: "2222"
        },
        DATAS_HORAS: [
          {
            Data: '28 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '29 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '30 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          }
        ]
      },
      {
        LOJA: {
          CD_LOJA: 3333,
          NOME_LOJA: "JASMAN CHALCO",
          NM_BAIRRO: "bairro333",
          NR_NUMERO: "55554646",
          NM_ENDERECO: "Colonia 3",
          NM_CIDADE: "Ciudad3333",
          NR_CEP: "3333"
        },
        DATAS_HORAS: [
          {
            Data: '28 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '29 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '30 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          }
        ]
      },
      {
        LOJA: {
          CD_LOJA: 4444,
          NOME_LOJA: "MEINEKE INSURGENTES",
          NM_BAIRRO: "bairro333",
          NR_NUMERO: "55554646",
          NM_ENDERECO: "Colonia 3",
          NM_CIDADE: "Ciudad3333",
          NR_CEP: "3333"
        },
        DATAS_HORAS: [
          {
            Data: '28 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '29 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          },
          {
            Data: '30 abr 2021',
            Horarios: [
              {
                NR_PERIODO: 1,
                DT_HORARIO: '1:00pm'
              },
              {
                NR_PERIODO: 2,
                DT_HORARIO: '2:00pm'
              },
              {
                NR_PERIODO: 3,
                DT_HORARIO: '3:00pm'
              }
            ]
          }
        ]
      },
    ]
  }

}
