export class StatusPedidoResponse {
    Data: StatusPedidoResponseData
    ErrorCode: string
    constructor(){}
}

export class StatusPedidoResponseData {
    COBRANCAS: CobrancaStatusPedido[]
    constructor(){}
}

export class CobrancaStatusPedido {
    DS_TIPO_COBRANCA : string
    PAGAMENTO: PagamentoStatusPedido
    CD_TIPO_COBRANCA: number
}

export class PagamentoStatusPedido {
    CD_PAGAMENTO: number
    CD_FORMA_PAGAMENTO: number
}