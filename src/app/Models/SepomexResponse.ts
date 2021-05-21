export class SepomexResponse {
    public error: boolean
      public code_error: number
      public error_message: string
      public response: CPData
    constructor(){}
}

export class CPData {
    public cp: string
    public asentamiento: string
    public tipo_asentamiento: string
    public municipio: string
    public estado: string
    public ciudad: string
    public pais: string
    constructor(){}
}