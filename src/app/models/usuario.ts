import { Rol } from "./rol";

export interface UsuarioResponse {
    msg: string;
    usuario: Usuario;
    roles: Rol[];
  }
  
export interface Usuario {
    id: number;
    nombre: string;
    email: string;
  }

  export interface bit {
    type:string;
    data:number[];
  }
  
  export interface UsuarioMasPresenteYconfirmado {
    id: number;
    nombre: string;
    email: string;
    isPresente:bit;
    isConfirmado:bit;
  }

  export interface rtaGetConfirmados {
    registros:Usuario[];
    total:number;
  }
  export interface rtaGetAllPorEvento {
    registros:UsuarioMasPresenteYconfirmado[];
    total:number;
  }

