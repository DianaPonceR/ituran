export class PedidoRequest {
    GUID_COTACAO: string = ''
    CD_COMPROVANTE_DIGITAL: string = '' // G03 when factura
    PRODUTO_ITEM_ESCOLHIDOS: ProductoItemEscogido[]
    MENSALIDADE: Mensalidade
    ENDERECO_COBRANCA: EnderecoCobranca
    CONTATO_EMERGENCIA: PedidoContactoEmergencia[]
    TAXAS: PedidoTaxa[]
    TAXA_INSTALACAO: Mensalidade
    ENDERECO_CLIENTE: EnderecoCobranca
    CLIENTE: PedidoRequestCliente
    constructor(){}
 }
 export class Mensalidade {
   FORMA_PAGAMENTO_BOLETO_BANCARIO?: FormaPagamento
   FORMA_PAGAMENTO_BOLETO_ELETRONICO?: FormaPagamento
   FORMA_PAGAMENTO_CARTAO_CREDITO?: FormaPagamento

   constructor(){}
}

//  export class PedidoRequest_BoletoElectronico {
//    GUID_COTACAO: string = ''
//    CD_COMPROVANTE_DIGITAL: string = '' // G03 when factura
//    PRODUTO_ITEM_ESCOLHIDOS: ProductoItemEscogido[]
//    MENSALIDADE: Mensalidade_BoletoElectronico
//    ENDERECO_COBRANCA: EnderecoCobranca
//    CONTATO_EMERGENCIA: PedidoContactoEmergencia[]
//    TAXAS: PedidoTaxa[]
//    constructor(){}
// }

// export class PedidoRequest_CartaoCredito {
//    GUID_COTACAO: string = ''
//    CD_COMPROVANTE_DIGITAL: string = 'G03'
//    PRODUTO_ITEM_ESCOLHIDOS: ProductoItemEscogido[]
//    MENSALIDADE: Mensalidade_CartaoCredito
//    ENDERECO_COBRANCA: EnderecoCobranca
//    CONTATO_EMERGENCIA: PedidoContactoEmergencia[]
//    TAXAS: PedidoTaxa[]
//    constructor(){}
// }


// export class Mensalidade_BoletoElectronico {
//    FORMA_PAGAMENTO_BOLETO_ELECTRONICO: FormaPagamento
//    constructor(){}
// }
// export class Mensalidade_CartaoCredito {
//    FORMA_PAGAMENTO_BOLETO_CARTAO_CREDITO: FormaPagamento
//    constructor(){}
// }


 export class ProductoItemEscogido {
    CD_COTACAO_ITEM: number 
    VL_COMISSAO: string 
    constructor(){}
 }
 export class FormaPagamento {
    CD_TIPO_FORMA_PAGAMENTO: number
    CD_FORMA_PAGAMENTO: number
    constructor(){}
 }

 export class EnderecoCobranca {
    ENDERECO_COMPLETO: string
    COMPLEMENTO: string
    NM_BAIRRO: string
    NR_CEP: string
    NUMERO: number
    constructor(){}
 }

 export class PedidoTaxa {
    TIPO_COBRANCA:number
    CD_TIPO_FORMA_PAGAMENTO_ESCOLHIDA: number
    CD_FORMA_PAGAMENTO_BANCO_ESCOLHIDO: number
    constructor(){}
 }

 export class PedidoContactoEmergencia {
    NM_NOME: string
    NR_DDD: string
    NR_TELEFONE: string
    constructor(){}
 }

 export class PedidoRequestCliente {
   NR_CNPJ_CPF :string
   NM_PRIMEIRO_NOME :string
   NM_SOBRENOME_PAI :string
   NM_SOBRENOME_MAE :string
   NR_TELEFONE :string
   DT_NASCIMENTO :string
   CD_ESTADO_CIVIL :number
   CD_SEXO :string
   DS_EMAIL :string
 }