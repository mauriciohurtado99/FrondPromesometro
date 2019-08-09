import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';
import { ROUTES, Router} from "@angular/router" 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
public user: User; 
public identity;
public token;
public status;
  constructor(
    private _roter: Router,
    private _userService: UserService

  ) { 
    this.user = new User("","","","","","","","")
   }

  ngOnInit() {
  }
 
  getToken(){
    this._userService.login(this.user, 'true').subscribe(
      response =>{
        this.token = response.token;
        console.log(this.token)
        if(this.token.length <=0){
          this.status = 'error'
        }else{
          sessionStorage.setItem('token', this.token)
        }
      },
      error =>{
          var errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage != null){
            this.status = 'error'
          }
      }
    )
  }  
  login(){
    this._userService.login(this.user).subscribe(
      response =>{
        this.identity = response.user;
        console.log(this.identity);
        if(!this.identity){
          this.status = 'error'
        }else{
          sessionStorage.setItem('identity',JSON.stringify(this.identity))
          this.getToken();
          this.status = 'ok';
          this._roter.navigate(['/partido'])
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
    }
    )
  }
  
}