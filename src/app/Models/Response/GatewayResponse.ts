export class GatewayTokenResponse {
    status : string;
    message : string;
    data : GatewayTokenResponseData;
}

export class GatewayTokenResponseData {
    token : string;
    expiration : Date;
}


export class GatewayCheckoutResponse {
    status : string;
    message : string;
    data : GatewayCheckoutResponseData;
}

export class GatewayCheckoutResponseData {
    checkOutId: number;
    customerId: number;
    createAt: Date;
    validUntil: Date;
    usedAt: any;
    reference: string;
    url: string;
    preAuthorization: boolean;
    folio: any;
    cobranzaId: number;
    oxxoReference: any;
    host: any;
    paymentTypeId: number;
}