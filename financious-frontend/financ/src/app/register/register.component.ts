import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  form!: FormGroup;
  readonly ROOT_URL = 'http://localhost:3000';
  message = "Enter data and create account"
  
  constructor(
    private formbuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name:'',
      email:'',
      password:''
    });
  }
  submit(){
    this.http.post(this.ROOT_URL+'/api/register',this.form.getRawValue()).subscribe(res =>{
      this.router.navigate(['/login']);
    },error=>{
      this.message = "Invalid Data"
    });
  }

}
