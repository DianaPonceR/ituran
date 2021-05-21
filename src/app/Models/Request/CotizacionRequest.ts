export class Cotizacion{
    public CD_LEAD: string = ''
    public DS_CHASSI: string = ''
    public DS_PLACA: string = ''
    public CD_MODELO: number = 0
    public NR_ANO: number = 0
    public NR_CEP_PERNOITE: string  = ''
    // public NR_ANO_FABRICACAO: number = 0
    public DS_COR: string = ''
    public DS_COMBUSTIVEL: string = ''
    public DS_PERFIL: PerfilDetalle[]
    public DS_RFC: string  = ''
    public NM_PRIMEIRO_NOME: string  = ''
    public NM_SOBRENOME_PAI: string = ''
    public NM_SOBRENOME_MAE: string = ''
    constructor(){}
  }

  export class PerfilDetalle {
    Key: string = ''
    Value: string = ''  
    constructor(){}
  }