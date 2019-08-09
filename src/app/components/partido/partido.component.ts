import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import{ PartidoService} from 'src/app/service/partido.service';
import { Partido} from 'src/app/models/partido.model'; 
import{ CandidatoService} from 'src/app/service/candidato.service'; 
import { Encuesta} from 'src/app/models/Encuesta.model';
import{ EncuestaService} from 'src/app/service/encuesta.service';
import { Candidato} from 'src/app/models/candidato.model';
import { GLOBAL } from 'src/app/service/global.service';
import { UploadService } from 'src/app/service/upload.service'; 
import { Voto } from 'src/app/models/voto.model';
import { Label } from 'ng2-charts';  
import { ChartOptions } from 'chart.js';  
import { Router } from '@angular/router';
import * as decode from "jwt-decode";

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss'],
  providers:[PartidoService, EncuestaService, CandidatoService, UserService, UploadService] 
})
export class PartidoComponent implements OnInit {
     
  public url;
  public identity;
  public token;
  public status: string; 
  
  // Partido 
  public partido: Partido;
  public modelPartido: Partido;
  public partidos: Partido; 

  // Candiato 

  public candidato: Candidato;
  public modelCandidato: Candidato 
  public candidatos: Candidato 

  //Encuesta 
  public encuesta: Encuesta
  public modelEncuesta: Encuesta 
  public encuestas: Encuesta

  public eleccion: String  

  // Grafica 
  public data: Number[] = [];
  hola = [];
  public pieChartLabels: Label[] = ['Contra','Favor'];
  public pieChartLegend = true;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor( 
    private _partidoService: PartidoService, 
    private _candidatoService: CandidatoService, 
    private _encuestaService: EncuestaService,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _router:Router,
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.modelPartido = new Partido("","","","");  
    this.modelCandidato = new Candidato("","","","","","");  
    this.modelEncuesta = new Encuesta("","","","") 
    //this.eleccion = new Voto ("","","","")
    // actulizacion 
    this.partido = this._partidoService.getIdentity();
    this.identity = this.partido; 

    this.candidato = this._candidatoService.getIdentity() 
    this.identity = this.candidato  

    this.encuesta = this._encuestaService.getIdentity() 
    this.identity = this.candidato


  } 


  ngOnInit() { 
    this.getPartidos();
    
  }
  getPartidos(){
    this._partidoService.getPartidos(this.token).subscribe(response=>{
      console.log(response);
      
      if(response.partido){
        this.partidos = response.partido;
        this.status = "ok";
      }
    },
    error =>{
      var errorMessage =<any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status='error'
      }
    }
    )
  } 
  getPartido(id){
    this._partidoService.getPartido(id, this.token).subscribe(
      resp=>{
        if(resp.partido){
          this.modelPartido = resp.partido
          console.log(this.modelPartido)
        }
      },
      error =>{
        var errorMessage = <any>error
        console.log(errorMessage);
        if(errorMessage != null){
          this.status='error'
        }
      }
    )
  }

  deletePartido(id){
    if(confirm("¿esta seguro de que quiere eliminar?")){
      this._partidoService.deletePartido(id, this.token).subscribe(
        response=>{
          console.log(response)
          if(response.partido){
            
            this.status="ok" 
            this.getPartidos();
          }
        },error =>{
          var errorMessage = <any>error
          console.log(errorMessage);
          if(errorMessage != null){
            this.status='error'
          }
        } 
      )
    } 
    this.getPartidos();
  }
  addP(){
    this._partidoService.addP(this.token, this.modelPartido)
    .subscribe(
      response=>{
        if(response.partido){
          console.log(response.partido);
          this.getPartidos();
          this.status ='ok' 
        }
      }, error =>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }

    ) 
    this.getPartidos()
  } 

  editPartido(){
    this._partidoService.updatePartido(this.token,this.modelPartido).subscribe( 
      response=>{
        if(!response.partido){
          this.status = 'error'
        }else{
          this.status = 'ok' 
          sessionStorage.setItem('identity',JSON.stringify(this.partido)) 
          this.identity = this.partido 
          if(this.imagen){
            this._uploadService.makeFileRequest(this.url+'subir-imagen-partido/'+this.modelPartido._id,[],this.filesToUpload,this.token,'image')
            .then((result: any)=>{
              console.log(result);
              this.partido.image = result.image;
              sessionStorage.setItem('identity',JSON.stringify(this.partido))
              })
              this.imagen = false;
            }
          }
          console.log(response.partido)
          this.getPartidos()
      }, 
      error=>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }
    ) 
    this.getPartidos();
  } 
  public filesToUpload: Array<File>;
  public imagen: boolean = false;
  fileChangeEvent(fileInput: any){
    this.imagen = true;
    this.filesToUpload = <Array<File>>fileInput.target.files;
  } 

  // Candidato 

  addC(){
    this._candidatoService.addC(this.token, this.modelPartido, this.modelCandidato)
    .subscribe(
      response=>{
        if(response.candidato){
          console.log(response.candidato);
          //this.getPartidos();
          this.status ='ok' 
        }
      }, error =>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }

    ) 
   
  }  
   
  getCandidatos(id){ 
    this._candidatoService.listarCa(this.token, id).subscribe(response=>{
      if(response.Candidato){
        this.candidatos = response.Candidato;
        console.log(response.Candidato);
        this.status='ok';

      }
    }, error =>{
      var errorMessage =<any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status='error'
      }
    }
    )
  }
  getCandidato(id){
    this._candidatoService.getCandidato(id, this.token).subscribe(
      resp=>{
        if(resp.candidato){
          this.modelCandidato = resp.candidato
          console.log(this.modelCandidato)
        }
      },
      error =>{
        var errorMessage = <any>error
        console.log(errorMessage);
        if(errorMessage != null){
          this.status='error'
        }
      }
    )
  } 
  editCandidato(){
    this._candidatoService.updateCandidato(this.token,this.modelCandidato).subscribe( 
      response=>{
        if(!response.candidato){
          this.status = 'error'
        }else{
          this.status = 'ok' 
          sessionStorage.setItem('identity',JSON.stringify(this.candidato)) 
          this.identity = this.candidato 
          if(this.imagen){
            this._uploadService.makeFileRequest(this.url+'subir-imagen-candidato/'+this.modelCandidato._id,[],this.filesToUpload,this.token,'image')
            .then((result: any)=>{
              console.log(result);
              this.candidato.image = result.image;
              sessionStorage.setItem('identity',JSON.stringify(this.candidato))
              })
              this.imagen = false;
            }
          }
          console.log(response.candidato)
          this.getCandi() 
        
      }, 
      error=>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }
    )
  } 
  
  getCandi(){
    this._candidatoService.getCandidatos(this.token).subscribe(response=>{
      console.log(response);
      
      if(response.candidato){
        this.candidatos = response.candidato;
        this.status = "ok";
      }
    },
    error =>{
      var errorMessage =<any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status='error'
      }
    }
    )
  }

  deleteCandidato(id){
    if(confirm("¿esta seguro de que quiere eliminar?")){
      this._candidatoService.deleteCandidato(id, this.token).subscribe(
        response=>{
          console.log(response)
          if(response.candidato){
            
            this.status="ok" 
            this.getCandi();
          }
        },error =>{
          var errorMessage = <any>error
          console.log(errorMessage);
          if(errorMessage != null){
            this.status='error'
          }
        } 
      )
    } 
  } 

  // Encuesta 
  addE(){
    this._encuestaService.addE(this.token, this.modelCandidato, this.modelEncuesta)
    .subscribe(
      response=>{
        if(response.encuesta){
          console.log(response.encuesta);
          //this.getPartidos();
          this.status ='ok' 
        }
      }, error =>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }

    ) 
   
  }    

  getEncuestas(id){ 
    this._encuestaService.listarEnc(this.token, id).subscribe(response=>{
      if(response.Encuesta){
        this.encuestas = response.Encuesta;
        console.log(response.Encuesta);
        this.status='ok';

      }
    }, error =>{
      var errorMessage =<any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status='error'
      }
    }
    )
  }
  getEncuesta(id){
    this._encuestaService.getEncuesta(id, this.token).subscribe(
      resp=>{
        if(resp.encuesta){
          this.modelEncuesta = resp.encuesta
          console.log(this.modelEncuesta)
        }
      },
      error =>{
        var errorMessage = <any>error
        console.log(errorMessage);
        if(errorMessage != null){
          this.status='error'
        }
      }
    )
  } 
  

  editEnc(){
    this._encuestaService.updateEnc(this.token,this.modelEncuesta).subscribe( 
      response=>{
        if(!response.encuesta){
          this.status = 'error'
        }else{
          this.status = 'ok' 
          sessionStorage.setItem('identity',JSON.stringify(this.encuesta)) 
          this.identity = this.encuesta 
          }
          console.log(response.encuesta)
      }, 
      error=>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }
    )
  } 

  deleteEnc(id){
    if(confirm("¿esta seguro de que quiere eliminar?")){
      this._encuestaService.deleteEnc(id, this.token).subscribe(
        response=>{
          console.log(response)
          if(response.encuesta){
            
            this.status="ok" 
            this.getCandi();
          }
        },error =>{
          var errorMessage = <any>error
          console.log(errorMessage);
          if(errorMessage != null){
            this.status='error'
          }
        } 
      )
    } 
  }

  votar(encuesta: any, eleccion:string){
    this._userService.Votar(encuesta, eleccion )
    .subscribe(
      response=>{
        if(response.votoStored){
          console.log(response.votoStored);
          //this.getPartidos();
          this.status ='ok' 
        }
      }, error =>{
        var errorMessage =<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status ='error'
        }
      }

    ) 
   
  }   
  getResult(id){
    this._candidatoService.GetResults(id).subscribe(res =>{
      this.data[0] = res.contra 
      this.data[1] = res.favor;
      this.hola = res; 
      console.log(this.hola)
    })
  }

  deleteToken(){
    this.token = sessionStorage.removeItem('token');
    this._router.navigate(['/home']);
  }
  valitation(){
    var decoded = decode(this.token);

  if(decoded.rol === "ROL_USER"){
    return "user";
  }else{
    return "admin";
  }
  }
}

