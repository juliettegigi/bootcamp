import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionApiService {

  constructor(private http:HttpClient) { }

 
  setPresenteToggle(usuarioId:number,eventoId:number){
    return this.http.put<string>(`http://localhost:3000/participaciones/setPresenteToggle/${usuarioId}/${eventoId}`,{},{ withCredentials: true}).pipe(catchError(this.handleError))
}
  setConfirmadoToggle(participacionId:number){
    return this.http.put<string>(`http://localhost:3000/participaciones/setConfirmadoToggle/${participacionId}`,{},{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  createParticipacion(usuarioId:number,eventoId:number){
    return this.http.post<number>(`http://localhost:3000/participaciones`,{usuarioId,eventoId},{ withCredentials: true}).pipe(catchError(this.handleError))
  }

  isRegistrado(usuarioId:number,eventoId:number){
    return this.http.get<number>(`http://localhost:3000/participaciones/isRegistrado/${usuarioId}/${eventoId}`,{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  isConfirmado(participacionId:number){
    return this.http.get<number>(`http://localhost:3000/participaciones/isConfirmado/${participacionId}`,{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  eliminarParticipacion(id:number){
    return this.http.delete(`http://localhost:3000/participaciones/${id}`,{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  generarPDF(eventoId:number) { 
    return this.http.get<Blob>(`http://localhost:3000/participaciones/pdf/${eventoId}`, {
      responseType: 'blob' as 'json',
      withCredentials: true
    }).pipe(catchError(this.handleError));
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
