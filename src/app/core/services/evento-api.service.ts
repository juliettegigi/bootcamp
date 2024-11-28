import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Evento, ResponseGetByIdOrName } from '../../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoApiService {
  private apiUrl = 'http://localhost:3000/eventos/';
  constructor(private http:HttpClient) { }

  getEventoById(id:number){
    return this.http.get<Evento>(`${this.apiUrl}${id}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}
  getEventoByIdOrName(idName:string,limit=1,offset=0){
    return this.http.get<ResponseGetByIdOrName>(`${this.apiUrl}idNombre/${idName}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

getEventosPag(limit:number,offset:number){
    return this.http.get<ResponseGetByIdOrName>(`${this.apiUrl}pag?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

getTotalEventos(){
  return this.http.get<number>(`${this.apiUrl}total`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

postEvento(nombre: string, fecha: string, ubicacion: string, descripcion: string){
  return this.http.post<number>(`${this.apiUrl}`,{nombre,fecha,ubicacion,descripcion},{ withCredentials: true}).pipe(catchError(this.handleError))
}

borrarEventoLogico(id:number){
  return this.http.put<string>(`${this.apiUrl}borrar/${id}`,null,{ withCredentials: true}).pipe(catchError(this.handleError))
}

editarEvento(id:number,nombre: string, fecha: string, ubicacion: string, descripcion: string){
  return this.http.put<string>(`${this.apiUrl}${id}`,{nombre,fecha,ubicacion,descripcion},{ withCredentials: true}).pipe(catchError(this.handleError))
}



 getEventosProximos(limit: number, offset: number) {
    return this.http.get(`${this.apiUrl}proximos?limit=${limit}&offset=${offset}`, { withCredentials: true}).pipe(catchError(this.handleError))
  } 

getEventosByUsuarioIsPresente(usuarioId:number,limit:number,offset:number){
  return this.http.get<ResponseGetByIdOrName>(`${this.apiUrl}usuarioPresente/${usuarioId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}


private handleError(error:HttpErrorResponse){
     if (error.status === 401) {
      localStorage.clear();
      return window.location.href = 'http://localhost:4200/';
   }  
   /*  let errorMessage;
    if(error.error instanceof ErrorEvent){
       errorMessage=`Error: ${error.error.message}`
    }else{
       errorMessage=`Error code:${error.status}\n
                     Message:${error.message}`
    } */
    return throwError(() => error)
}
}









