import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string=''
  password:string=''
  constructor(
    private router:Router
  ) { }

  loginUsuario(){
    console.log('email:', this.email,'password:',this.password)
    var data = {
      email:this.email,
      password:this.password
    };
    axios.post('http://localhost:3000/user/login',data)
    .then(async(result)=>{
      if(result.data.success){
        localStorage.setItem('token',result.data.token)
        this.router.navigate(['/theme-list'])
      }
    })
  }

  logoutUsuario(){
    //localStorage.removeItem('token');
    axios.post('http://localhost:3000/user/logout/1')
    .then(async(result)=>{
      if(result.data.success){
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    })
  }

  ngOnInit() {
  }
  
}
