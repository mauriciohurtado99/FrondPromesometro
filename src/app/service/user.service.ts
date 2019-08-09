import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './global.service';
import { User } from '../models/user.model'; 
import {map} from "rxjs/operators";
import { Voto } from '../models/voto.model';
import { Observable } from 'rxjs'; 
import { Encuesta } from '../models/Encuesta.model'; 
import * as decode from "jwt-decode";



@Injectable()
export class UserService {
public url: string;
public identity;
public token;
  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url;
  }
    registro(user: User): Observable<any>{
      let params = JSON.stringify(user);
      let headers = new HttpHeaders().set('Content-Type','application/json') 

      return this._http.post(this.url+'registrar', params,{headers: headers})
    }
login(user, gettoken2 = null): Observable<any>{
   if(gettoken2 != null){
     user.gettoken = gettoken2;
  } 
  let params = JSON.stringify(user);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  return this._http.post(this.url+'login',params,{headers:headers})
} 
getIdentity(){
  var identity2 = JSON.parse(sessionStorage.getItem('identity'));
  if(identity2 != "undefined"){
    this.identity = identity2 
  }else{
    this.identity = null;
  } 
  return this.identity;
}
getToken(){
  var token2 = sessionStorage.getItem('token');
  if(token2 !="undefined"){
    this.token = token2;
  }else{
    this.token = null; 
  } 
  return this.token ;
} 

updateUser(user: User): Observable<any>{
  let params = JSON.stringify(user);
  let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.getToken());
  return this._http.put(this.url+'editar-usuario/'+user._id, params, {headers: headers})
} 
getUser(token): Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
  return this._http.get(this.url+'listU',{headers: headers})
}

Votar(encuesta: any,  eleccion: String) : Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
 let voto  : Voto= new Voto( "",encuesta._id,localStorage.getItem('userid'), eleccion)
 let params = JSON.stringify(voto); 
 return this._http.post(this.url+'vote/'+encuesta._id, params,{headers: headers})
 
} 

public getUserType() : String{
  var token = localStorage.getItem('token');
  var decoded = decode(token);

  if(decoded.rol === "ROL_USER"){
    return "user";
  }else{
    return "admin";
  }
}

}