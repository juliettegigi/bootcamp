export interface Evento {
    id: number;
    nombre: string;
    fecha: string; // o Date si lo conviertes
    ubicacion: string;
    descripcion: string;
    isEliminado: any; // ajusta el tipo según lo que sea, aquí parece ser un buffer
  }


  
export class FechaEvento {
  private fecha: Date;
  
  constructor(fecha: string) {
  this.fecha = new Date(fecha);
  }
  
  get dia(): number {
  return this.fecha.getDate();
  }
  
  get mes(): number {
  return this.fecha.getMonth() + 1;
  }
  
  get anio(): number {
  return this.fecha.getFullYear();
  }
  }
  

  export interface ResponseGetByIdOrName {
    registros: Evento[];
    total: number;
}