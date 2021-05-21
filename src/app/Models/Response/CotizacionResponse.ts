export class CotizacionResponse {
    Data: CotizacionResponseData
    constructor(){}
}

export class CotizacionResponseData {
    NM_LEAD: string
    GUID_COTACAO: string
    DT_COTACAO: Date
    DT_VALIDADE: Date
    NM_MARCA: string
    NM_MODELO: string
    NR_ANO: number
    COTACAO_ITEMS: ItemCotizacion[]
    TAXAS: Taxa[]
    constructor() {
    }
}


export class ItemCotizacion {
    CD_COTACAO_ITEM: number
    FL_DOMICILIAR: boolean
    VL_TOTAL_DESLOCAMENTO: number
    VL_MENSALIDADE: string
    VL_ANUAL: string
    TAXA_VL_TOTAL: number
    NR_PORCENTAGEM_INDENIZACAO: number
    NM_PRODUTO: string
    DS_PRODUTO: string[]
    constructor(){}
}

export class Taxa {
    CD_TIPO_COBRANCA: number
    NM_TIPO_COBRANCA: string
    PAGAMENTOS: Pagamento
    constructor(){}
} 

export class Pagamento {
    FORMA_PAGAMENTO_BOLETO_BANCARIO: FormaPagamentoCotacao[]
    FORMA_PAGAMENTO_BOLETO_ONLINE: FormaPagamentoCotacao[]
    FORMA_PAGAMENTO_BOLETO_ELETRONICO: FormaPagamentoCotacao[]
    FORMA_PAGAMENTO_CARTAO_CREDITO: FormaPagamentoCotacao[]
    FORMA_PAGAMENTO_DEBITO_CONTA: FormaPagamentoCotacao[]
    constructor(){}
}

export class FormaPagamentoCotacao {
    CD_TIPO_FORMA_PAGAMENTO: number
    CD_FORMA_PAGAMENTO: number
    constructor(){}
}     