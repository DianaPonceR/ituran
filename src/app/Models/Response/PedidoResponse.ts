import { PerfilDetalle } from "../Request/CotizacionRequest"

export class PedidoResponse {
    Data: PedidoResponseData
    ErrorCode: string
    constructor(){}
}

export class PedidoResponseData {
    CD_PEDIDO: string
    CD_LEAD: string
    NR_CEP_PERNOITE: string
    DS_PLACA: string
    CD_CANAL_VENDA: number
    CD_PESSOA_PARCEIRO: number
    CD_PESSOA_PARCEIRO_ESTABELECIMENTO: number
    CD_PESSOA_VENDEDOR: number
    CD_PESSOA_RESPONSAVEL: number
    CD_TIPO_COMERCIALIZACAO: number
    NR_CPF_CNPJ: string
    DS_PERFIL: PerfilDetalle[]
    DS_CHASSI: string
    CD_MARCA: number
    NM_MARCA: string
    CD_MODELO_BASICO: number
    NM_MODELO_BASICO: string
    CD_MODELO: number
    NM_MODELO: string
    NR_ANO: number
    NR_ANO_FABRICACAO: number
    constructor(){}
}