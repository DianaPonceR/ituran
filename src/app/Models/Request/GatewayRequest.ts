export class GatewayTokenRequest {
    Usuario : string;
    Password : string;
    constructor(u: string, p: string){
        this.Usuario = u
        this.Password = p
    }
}

export class GatewayCheckoutRequest {
    Customer: GatewayCustomer;
    Order: GatewayOrder;
    InstallationCheckoutId?: any;
}

export class GatewayCustomer {
    Name: string;
    Email: string;
    // IntegraCustomerId: number;
}

export class GatewayOrder {
    ExternalReference: number;
    Amount: number;
    CobranzaTypeId: number;
    PaymentTypeId: number;
    // CobranzaId: number;
}