import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable, Observer } from 'rxjs';  
import { Candidato} from '../models/candidato.model';  
import { Partido} from '../models/partido.model';  
import {Encuesta} from '../models/Encuesta.model'

@Injectable()  
export class EncuestaService {
    public url: string;  
    public identity;
    constructor( public _http: HttpClient) { 
      this.url = GLOBAL.url; 
    } 
    getEncuestas(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
      return this._http.get(this.url+'encuestas',{headers: headers})
    } 
    addE(token,  candidato: Candidato,encuesta: Encuesta): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        let params = JSON.stringify(encuesta) 
        return this._http.post(this.url+'a-encuesta/'+candidato._id, params,{headers: headers})
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
    getEncuesta(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.get(this.url+'encuesta/'+id, {headers: headers});
      } 

     updateEnc(token, encuesta: Encuesta): Observable<any>{
        let params = JSON.stringify(encuesta);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.put(this.url+'edit-enc/'+encuesta._id,params,{headers: headers}) 
    }   
    deleteEnc(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
          return this._http.delete(this.url+'delete-enc/'+id, {headers: headers});
      }  

      listarEnc(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token); 
        console.log(id)
          return this._http.get(this.url+'enciestaXv/'+ id, {headers: headers})
      }
}    