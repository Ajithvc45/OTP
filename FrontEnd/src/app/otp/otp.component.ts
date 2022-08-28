import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  User = {
    otp: '',
  };

  constructor(private _auth:AuthService,private _route:Router) { }

  ngOnInit(): void {
  }

  Verify(){
    this._auth.checkOTP({email:localStorage.getItem("email"),otp:this.User.otp}).subscribe((data)=>{
      if(data != null){
        alert("Success")
        this._route.navigate(['welcome'])
      }
      else{
        alert("Failed")
      }
      
    })


  }

}
