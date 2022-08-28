import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-pageone',
  templateUrl: './pageone.component.html',
  styleUrls: ['./pageone.component.css']
})
export class PageoneComponent implements OnInit {
  User = {
    email:""
  }


  constructor(private _router:Router,private _auth:AuthService) { }

  ngOnInit(): void {
  }

  onsubmit(){
    this._auth.saveEmail({"email":this.User.email}).subscribe((data)=>{
      console.log(data)
    })
    localStorage.setItem("email",this.User.email)
    this._router.navigate(['otp'])

  }

}
