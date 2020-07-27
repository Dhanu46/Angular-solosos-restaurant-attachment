import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  url = "http://localhost:8081/addRestaurant";
  constructor(private http:HttpClient,private route:Router) { }
  addRestaurantFromService(fd){
  this.http.post(this.url,fd)
  .subscribe((response)=>{
     console.log(response);
   }
   ,(err)=>{
     console.log(err);
   })
  }
  
  logout(){
    this.route.navigateByUrl("login");
  }

}
