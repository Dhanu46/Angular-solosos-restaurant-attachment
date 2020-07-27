import { HttpClient } from '@angular/common/http';
import { RestaurantService } from './restaurant.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent{

  form :FormGroup;
  Swiggy = 'Swiggy';
  Donzo = 'Donzo';
  Zomato = 'Zomato';
  None = 'None';

  selected = new Array<string>();

  constructor(private service:RestaurantService,private http:HttpClient,private fb:FormBuilder) 
  { 
    this.form = this.fb.group({
      restaurantName : [''],
      gstin : [''],
      phoneNumber : [''],
      emailId : [''],
      restaurantImage : [null],
      alternatePhoneNumber : [''],
      imageFile : [null],
      fssai : [''],
      contactPersonName : [''],
      address : [''],
      contactPersonPhoneNumber : [''],
      contactPersonRole : [''],
      linkedTo : new Array<string>()
      });
  }
  
  public addRestaurant(){
   const fd = new FormData();
   this.form.controls['linkedTo'].setValue(this.selected);
   fd.append('gstin',this.form.get('restaurantName').value);
   fd.append('restaurantName',this.form.get('gstin').value);
   fd.append('phoneNumber',this.form.get('phoneNumber').value);
   fd.append('emailId',this.form.get('emailId').value);
   fd.append('restaurantImage',this.form.get('restaurantImage').value);
   fd.append('alternatePhoneNumber',this.form.get('alternatePhoneNumber').value);
   fd.append('imageFile',this.form.get('imageFile').value);
   fd.append('fssai',this.form.get('fssai').value);
   fd.append('contactPersonName',this.form.get('contactPersonName').value);
   fd.append('address',this.form.get('address').value);
   fd.append('linkedTo',this.form.get('linkedTo').value.toString());
   fd.append('contactPersonPhoneNumber',this.form.get('contactPersonPhoneNumber').value);
   fd.append('contactPersonRole',this.form.get('contactPersonRole').value);
   console.log(fd.get('linkedTo'));
  this.service.addRestaurantFromService(fd);
}
  public logout(){
  this.service.logout();
} 
  
  public onFileSelect(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.form.get('imageFile').setValue(file);
    }
  }

  public onFileSelect1(event){
    if(event.target.files.length>0){
      const file = event.target.files[0]
      this.form.get('restaurantImage').setValue(file);
    }
  }

  public onSelected(event,value){
    if(event.target.checked)
    {
      console.log(value +'checked');
      this.selected.push(value);
      console.log(this.selected);
    }
    else{
      console.log(value+'Unchecked');
      this.selected = this.selected.filter(m=>m!=value);
    }
  }
}
