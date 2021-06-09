import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from './../emitters/emitters';
import { User } from './../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logged = false;
  message = '';
  user!:User;
  constructor(
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/user',{withCredentials:true})
    .subscribe({
      next:data=>{
        this.user = data;
        this.message = `Hi ${data.name}`;
        this.logged = true;
        Emitters.authEmitter.emit(true);
      },
      error:error=>{
        this.logged = false;
        this.message = "You are not logged in"
        Emitters.authEmitter.emit(false);
      }
    });
  }
}
