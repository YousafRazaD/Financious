import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  readonly ROOT_URL = 'http://localhost:3000';
  message = 'Enter credentials and press submit';

  constructor(
    private formbuilder: FormBuilder,
    private http:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:'',
      password:''
    });
  }
  submit(){
    this.http.post(this.ROOT_URL+'/api/login',this.form.getRawValue(),{withCredentials:true})
    .subscribe(res =>{
      this.router.navigate(['']);
    },error=>{
      if(error.status = 404){
        this.message = "Account not found";
      }
      if(error.status = 400){
        this.message = "Invalid Credentials";
      }
    });
  }
  

}
