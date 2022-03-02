import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  userInfo: any | null;
  user: any | null;
  score: any;
  countressources: any;
  countR: any;
  countReding: any;
  valeur : any = "Overall";
  badges : any = [];
  read: any;
  quiz: any;
  hear: any;

  constructor(
    private router: Router,
    private con: ConnexionService,
  ) { }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
      this.getScore(this.user);
    }
    else{
      this.router.navigate(['/login']);
    }
  }


  getScore(user){
    console.log(user)
    let userr = {
      id : user.id
    }
    this.con.getDatas("getscore", userr).subscribe( async (da:any)=>{
      console.log(da);
      this.score = da.data[0].points;
      this.getbadges();
    })
  }


  getbadges() {
    this.con.getData("getallawards").subscribe( async (da:any)=>{
      console.log(da);
      this.badges = da.data;
      this.countReads();
    })
  }

  setTab(val){
    this.valeur = val;
  }

  countReads(){
    let user = {
      student : this.user.id
    }
    this.con.getDatas("countreads", user).subscribe( async (da:any)=>{
      console.log(da);
      this.read = da.data;
    })
    this.countquiz();
  }

  countquiz() {
        let user = {
          student : this.user.id
        }
    this.con.getDatas("countquiz", user).subscribe( async (da:any)=>{
      console.log(da);
      this.quiz = da.data;
    })
    this.counthear();
  }

  counthear() {
        let user = {
          student : this.user.id
        }
    this.con.getDatas("counthear", user).subscribe( async (da:any)=>{
      console.log(da);
      this.hear = da.data;
    })
  }




}
