export class Cliente{
    public nacimiento: Date = new Date();
    public rfc: string = '';
    public clave: string = '';
    public sexo: string = '';
    public cp: string = '';
    public estado: string = '';
    public ciudad: string = '';
    public municipio: string = '';
    public colonia: string = '';
    public calle: string = '';
    public exterior: number
    public indicaciones: string = '';
    public get direccion() {
      return `Calle ${this.calle} ${this.exterior}, Colonia ${this.colonia}, ${this.municipio}, CP ${this.cp}, ${this.ciudad}, ${this.estado}` 
    }
    constructor(){}

    getDireccion(): string {
      return `Calle ${this.calle} ${this.exterior}, Colonia ${this.colonia}, ${this.municipio}, CP ${this.cp}, ${this.ciudad}, ${this.estado}` 
    }
  }