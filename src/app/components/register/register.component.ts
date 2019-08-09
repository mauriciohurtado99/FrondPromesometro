import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public status;
  constructor(private _UserService: UserService) { 
    this.user = new User("","","","","","","ROL_USUARIO","")
  }

  ngOnInit() {
  }
registrar(){
  this._UserService.registro(this.user).subscribe(
    response=>{
      if(response){
        console.log(response);
        this.status = 'ok';
      }
    }, 
    error=>{
        console.log(<any>error)
        this.status= 'error'
    }
  )
}
}
