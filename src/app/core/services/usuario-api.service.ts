import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { rtaGetAllPorEvento, rtaGetConfirmados, UsuarioResponse } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http:HttpClient) { }



         auth(email: string, pass: string) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          });
          return this.http.post<UsuarioResponse>(  this.apiUrl+'auth', { email, pass },{ withCredentials: true})
        }


  logOut(){
    return this.http.delete(this.apiUrl+`auth`,{ withCredentials: true})
  }  

  isAuth(){
    return this.http.get(this.apiUrl+`auth/isAuth`,{ withCredentials: true})
  }

  getUsuariosConfirmados(eventoId:number,limit:number,offset:number){
    return this.http.get<rtaGetConfirmados>(this.apiUrl+`usuarios/confirmados/${eventoId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

/* busco todos los usuarios de un evento */
getUsuariosPorEvento(eventoId:number,limit:number,offset:number){
  return this.http.get<rtaGetAllPorEvento>(this.apiUrl+`usuarios/all/${eventoId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

// busca por id, nombre del user y evento
getUsuariosPorEvento2(usuario:string,eventoId:number,limit:number,offset:number){
  return this.http.get<rtaGetAllPorEvento>(this.apiUrl+`usuarios/all2/${usuario}/${eventoId}?limit=${limit}&offset=${offset}`,{ withCredentials: true}).pipe(catchError(this.handleError))
}

crearUsuario(nombre:string,email:string,pass:string,rol:string="USUARIO"){
  return this.http.post<any>(this.apiUrl+`usuarios/`,{nombre,email,pass,rol}).pipe(catchError(this.handleError2))
}



  private handleError(error:HttpErrorResponse){
    if (error.status === 401) {
      localStorage.clear();
      return window.location.href = 'http://localhost:4200/';
    }
      
         return throwError(() => error)
  }

  private handleError2(error:HttpErrorResponse){
    if (error.status === 401) {
      localStorage.clear();
     return window.location.href = 'http://localhost:4200/';
    }
    //retorno un msg de error
    if( typeof error.error==='string'){

       return throwError(error.error)
      }
    //retorno el arreglo de errores
    return throwError(error.error.errors)
}
}
