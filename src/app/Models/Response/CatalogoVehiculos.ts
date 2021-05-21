export class CatalogoVehiculosResponse{
    Data: CatalogoVehiculosData
  }

export class CatalogoVehiculosData {
  MARCAS: VehiculoMarca[]
  NR_ANO: number[]
}

export class VehiculoMarca {
  CD_MARCA: number
  NM_MARCA: string
}

