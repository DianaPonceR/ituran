import { Cliente } from "./Cliente";
import { CotizacionConfig } from "./CotizacionConfig";
import { Factura } from "./Factura";
import { Inicial } from "./Inicial";
import { CotizacionResponseData, ItemCotizacion } from "./Response/CotizacionResponse";
import { GatewayCheckoutResponse, GatewayTokenResponse } from "./Response/GatewayResponse";
import { PedidoResponseData } from "./Response/PedidoResponse";
import { CobrancaStatusPedido } from "./Response/StatusPedidoResponse";
import { CPData, SepomexResponse } from "./SepomexResponse";
import { Vehiculo } from "./Vehiculo";

export class UserDataModel{
    public inicial: Inicial;
    public cliente: Cliente;
    public vehiculo: Vehiculo;
    public factura: Factura;
    public cpData: CPData;
    public facturar: boolean;
    public leadGuid: string;
    public cotizaciones: CotizacionResponseData
    public selectedCotizacion: ItemCotizacion
    public selectedCotizacionConfig: CotizacionConfig
    public pedido: PedidoResponseData
    public ituranGatewayPago: any
    public sepomexResponse: SepomexResponse[]
    public ituranGatewayPagoResponse: GatewayCheckoutResponse
    public ituranGatewayMensual: CobrancaStatusPedido;
    public gatewayTokenResponse: GatewayTokenResponse;

    constructor() {
        this.inicial = new Inicial();
        this.cliente = new Cliente();
        this.vehiculo = new Vehiculo();
        this.factura = new Factura();
        this.cpData = new CPData();
        this.cotizaciones = new CotizacionResponseData();
        this.selectedCotizacion = new ItemCotizacion();
        this.facturar = false;
        this.leadGuid = '';
        this.pedido = new PedidoResponseData();
        this.sepomexResponse = []
        this.selectedCotizacionConfig = new CotizacionConfig();
        this.ituranGatewayPagoResponse = new GatewayCheckoutResponse();
        this.ituranGatewayMensual = new CobrancaStatusPedido();
        this.gatewayTokenResponse = new GatewayTokenResponse();
    }
  }