import { Router } from '@angular/router';
import { LoginService } from './login-service.service';
import { User } from './User';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent{
  message: any;
  

  constructor(private service:LoginService,private route:Router) { }
  
  user:User = {
    userName:"",
    password:""
  }
  public loginNow(){
    let response =this.service.doLogin(this.user);
    response.subscribe(respon=>{
      console.log(respon);
      this.route.navigateByUrl("addRestaurant");
     }
      );
  }

  

}
