import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { rtaGetAllPorEvento, rtaGetConfirmados, UsuarioResponse } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

/*   auth(email:string, pass:string){
         return this.http.post<UsuarioResponse>('http://localhost:3000/auth/',{email,pass} ).pipe(catchError(this.handleError))
  } */

         auth(email: string, pass: string) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          });
          return this.http.post<UsuarioResponse>(  'http://localhost:3000/auth', { email, pass },{ withCredentials: true})
        }


  logOut(){
    return this.http.delete(`http://localhost:3000/auth`,{ withCredentials: true})
  }  

  getUsuariosConfirmados(eventoId:number,limit:number,offset:number){
    return this.http.get<rtaGetConfirmados>(`http://localhost:3000/usuarios/confirmados/${eventoId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

/* busco todos los usuarios de un evento */
getUsuariosPorEvento(eventoId:number,limit:number,offset:number){
  return this.http.get<rtaGetAllPorEvento>(`http://localhost:3000/usuarios/all/${eventoId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

// busca por id, nombre del user y evento
getUsuariosPorEvento2(usuario:string,eventoId:number,limit:number,offset:number){
  return this.http.get<rtaGetAllPorEvento>(`http://localhost:3000/usuarios/all2/${usuario}/${eventoId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

crearUsuario(nombre:string,email:string,pass:string,rol:string="USUARIO"){
  return this.http.post<any>(`http://localhost:3000/usuarios/`,{nombre,email,pass,rol}).pipe(catchError(this.handleError2))
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

  private handleError2(error:HttpErrorResponse){
    //retorno un msg de error
    if( typeof error.error==='string'){

       return throwError(error.error)
      }
    //retorno el arreglo de errores
    return throwError(error.error.errors)
}
}
