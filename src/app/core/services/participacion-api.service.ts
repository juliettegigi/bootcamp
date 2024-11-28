import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionApiService {
  private apiUrl = 'http://localhost:3000/participaciones/';
  constructor(private http:HttpClient) { }

 
  setPresenteToggle(usuarioId:number,eventoId:number): Observable<any>{
    return this.http.put<string>(`${this.apiUrl}setPresenteToggle/${usuarioId}/${eventoId}`,{},{ withCredentials: true}).pipe(catchError(this.handleError))
}
  setConfirmadoToggle(participacionId:number): Observable<any>{
    return this.http.put<string>(`${this.apiUrl}setConfirmadoToggle/${participacionId}`,{},{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  createParticipacion(usuarioId:number,eventoId:number): Observable<any>{
    return this.http.post<number>(`http://localhost:3000/participaciones`,{usuarioId,eventoId},{ withCredentials: true}).pipe(catchError(this.handleError))
  }

  isRegistrado(usuarioId:number,eventoId:number): Observable<any>{
    return this.http.get<number>(`${this.apiUrl}isRegistrado/${usuarioId}/${eventoId}`,{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  
  isConfirmado(participacionId:number): Observable<any>{
    return this.http.get<number>(`${this.apiUrl}isConfirmado/${participacionId}`,{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  eliminarParticipacion(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}${id}`,{ withCredentials: true}).pipe(catchError(this.handleError))
  }
  generarPDF(eventoId:number): Observable<any> { 
    return this.http.get<Blob>(`${this.apiUrl}pdf/${eventoId}`, {
      responseType: 'blob' as 'json',
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }


  private handleError(error:HttpErrorResponse){
       if (error.status === 401) {
        localStorage.clear();
         return  window.location.href = 'http://localhost:4200/';
      }
         return throwError(() => error)
  }
}
