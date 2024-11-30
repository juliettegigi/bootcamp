export interface Evento {
    id: number;
    nombre: string;
    fecha: string; // o Date si lo conviertes
    ubicacion: string;
    descripcion: string;
    isEliminado: any; // ajusta el tipo según lo que sea, aquí parece ser un buffer
  }


  export class FechaEvento {
    private year:number;
    private month:number;
    
    private day:number;
    private fecha:string;

    // "fecha": "2024-11-30T03:00:00.000Z",
    constructor(fecha: string) {
      const [fecha2,hora] = fecha.split("T")
      this.fecha=fecha2;
      const [year, month, day] = fecha2.split("-").map(Number);
      this.year=year;
      this.month=month;
      this.day=day;
    }
   
  
    get dia(): number {
      return this.day
    }
  
    get mes(): number {
      return this.month
    }
  
    get anio():number {
      return this.year
    }

    get fechaString():string{
      return this.fecha;
    }
  }

  export interface ResponseGetByIdOrName {
    registros: Evento[];
    total: number;
}