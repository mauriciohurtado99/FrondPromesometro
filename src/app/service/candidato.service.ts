import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable, Observer } from 'rxjs';  
import { Candidato} from '../models/candidato.model';  
import { Partido} from '../models/partido.model'; 
import { Encuesta } from '../models/Encuesta.model';
@Injectable()  
export class CandidatoService {
    public url: string;  
    public identity;
    constructor( public _http: HttpClient) { 
      this.url = GLOBAL.url; 
    }  
    getCandidatos(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
      return this._http.get(this.url+'candidatos',{headers: headers})
    } 
    addC(token,  partido: Partido,candidato: Candidato): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        let params = JSON.stringify(candidato) 
        return this._http.post(this.url+'registrar-candidato/'+partido._id, params,{headers: headers})
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
    getCandidato(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.get(this.url+'candidato/'+id, {headers: headers});
      } 

     updateCandidato(token, candidato: Candidato): Observable<any>{
        let params = JSON.stringify(candidato);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
        return this._http.put(this.url+'e-candidato/'+candidato._id,params,{headers: headers}) 
    }   
    deleteCandidato(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
          return this._http.delete(this.url+'eliminar-candidato/'+id, {headers: headers});
      }  

      listarCa(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
          return this._http.get(this.url+'pxc/'+ id, {headers: headers})
      }
      
      GetResults(id ) : Observable<any>{ 
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url  + 'results/' + id, {headers: headers}  )
      }

      
}   