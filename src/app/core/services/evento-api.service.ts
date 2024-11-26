import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Evento, ResponseGetByIdOrName } from '../../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoApiService {

  constructor(private http:HttpClient) { }

  getEventoById(id:number){
    return this.http.get<Evento>(`http://localhost:3000/eventos/${id}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}
  getEventoByIdOrName(idName:string,limit=1,offset=0){
    return this.http.get<ResponseGetByIdOrName>(`http://localhost:3000/eventos/idNombre/${idName}?limit=${limit}&offset=${offset}`,{ withCredentials: true})
}

getEventosPag(limit:number,offset:number){
    return this.http.get<ResponseGetByIdOrName>(`http://localhost:3000/eventos/pag?limit=${limit}&offset=${offset}`,{ withCredentials: true})
}

getTotalEventos(){
  return this.http.get<number>(`http://localhost:3000/eventos/total`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

postEvento(nombre: string, fecha: string, ubicacion: string, descripcion: string){
  return this.http.post<number>(`http://localhost:3000/eventos/`,{nombre,fecha,ubicacion,descripcion},{ withCredentials: true}).pipe(catchError(this.handleError))
}

borrarEventoLogico(id:number){
  return this.http.put<string>(`http://localhost:3000/eventos/borrar/${id}`,null,{ withCredentials: true}).pipe(catchError(this.handleError))
}

editarEvento(id:number,nombre: string, fecha: string, ubicacion: string, descripcion: string){
  return this.http.put<string>(`http://localhost:3000/eventos/${id}`,{nombre,fecha,ubicacion,descripcion},{ withCredentials: true}).pipe(catchError(this.handleError))
}



 getEventosProximos(limit: number, offset: number) {
    return this.http.get(`http://localhost:3000/eventos/proximos?limit=${limit}&offset=${offset}`, { withCredentials: true})
  } 

getEventosByUsuarioIsPresente(usuarioId:number,limit:number,offset:number){
  return this.http.get<ResponseGetByIdOrName>(`http://localhost:3000/eventos/usuarioPresente/${usuarioId}?limit=${limit}&offset=${offset}`,{ withCredentials: true})
}


private handleError(error:HttpErrorResponse){
     if (error.status === 401) {
    window.location.href = 'http://localhost:4200/';
   }  
    let errorMessage;
    if(error.error instanceof ErrorEvent){
       errorMessage=`Error: ${error.error.message}`
    }else{
       errorMessage=`Error code:${error.status}\n
                     Message:${error.message}`
    }
    return throwError(() => new Error(errorMessage))
}
}









