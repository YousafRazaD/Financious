import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { Month } from './month';
import { ChartType } from 'angular-google-charts'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {




  //chart 
  myType = ChartType.PieChart;
  myData = [
    ['Income', 8136000],
    ['Spent', 8538000]
  ];
  
  width = 550;
  height = 400;







  months:any;
  selected = false;
  month:any;
  trans:any;
  selectedMonth:any;
  user!:User;
  constructor(private http:HttpClient
    ,private router:Router) {
      
     }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/user',{withCredentials:true})
    .subscribe({
      next:data=>{
        this.user = data;
      }});
      this.http.get<any>('http://localhost:3000/api/history')
      .subscribe(data =>{
        this.months = data;
      });
  }
  onChange(model:any){
    const mon = <Month[]>this.months;
    this.month = mon.find(m => m.month==model);
    this.myData = [
      ["Spent",this.month.totalOut],
      ["Saved",this.month.totalIn-this.month.totalOut]
    ]
    const no = this.month.month;
    this.http.get<any>(`http://localhost:3000/api/transactions/${no}`)
    .subscribe(data =>{
      this.trans = data;
    });
    this.selected = true;
  }
  deleteHistory(){
    this.http.delete<any>(`http://localhost:3000/api/deletehistory/${this.month.month}`)
    .subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/redirect']);
    });
  }


}
