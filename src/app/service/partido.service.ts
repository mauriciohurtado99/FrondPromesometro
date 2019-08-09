import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable, Observer } from 'rxjs';  
import { Partido} from '../models/partido.model'; 
@Injectable()  
export class PartidoService {
    public url: string;  
    public identity;
    constructor( public _http: HttpClient) { 
      this.url = GLOBAL.url; 
    }   
    getPartidos(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
      return this._http.get(this.url+'partidos',{headers: headers})
    } 
    addP(token, partido: Partido): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        let params = JSON.stringify(partido) 
        return this._http.post(this.url+'registrar-partido', params,{headers: headers})
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
    getPartido(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.get(this.url+'partido/'+id, {headers: headers});
      } 

     updatePartido(token, partido: Partido): Observable<any>{
        let params = JSON.stringify(partido);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.put(this.url+'e-partido/'+partido._id,params,{headers: headers}) 
    }   
    deletePartido(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
          return this._http.delete(this.url+'eliminar-partido/'+id, {headers: headers});
      }


}