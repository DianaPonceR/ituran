export class Inicial{
    public nombre: string = '';
    public paterno: string = '';
    public materno: string = '';
    public telefono: string = '';
    public correo: string = '';
    public cp: string = '';
    public anio: number = 0;
    public marca: number = 0;
    public modelo: number = 0;

    public marcaStr: string= '';
    public modeloStr: string = '';

    public get nombreCompleto() {
        return `${this.nombre} ${this.paterno} ${this.materno}`
    }
    constructor(){}
  }