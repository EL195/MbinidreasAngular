import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userInfo: any | null;
  user: any | null;
  score: any;
  countressources: any;
  countR: any;
  countReding: any;

  constructor(
    private router: Router,
    private con: ConnexionService,
    private play: SoundService,
  ) { }

  ngOnInit(){
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
      this.getScore(this.user);
    }
    else{
      this.router.navigate(['/login']);
    }

  }
  test(){
    this.play.playOnClick();

  }

  goToLeveled(){
    this.router.navigate(['/leveled']);
  }


  goToReading(){
    this.router.navigate(['/reading']);
  }

  goToStats(){
    this.router.navigate(['/stats']);
  }

  getScore(user){
    console.log(user)
    let userr = {
      id : user.id
    }
    this.con.getDatas("getscore", userr).subscribe( async (da:any)=>{
      console.log(da);
      this.score = da.data[0].points;
      this.getRessources(user);
    })
  }


  getRessources(user) {
    let don = {
      langue : user.langue_id,
      age : user.age.id
    }
    this.con.getDatas("countressources", don).subscribe( async (da:any)=>{
      console.log(da.data);
      this.countR = da.data;
    })
    this.countReading(user);
  }



  countReading(user) {
    let don = {
      langue : user.langue_id,
      age : user.age.id
    }
    this.con.getDatas("countreading", don).subscribe( async (da:any)=>{
      console.log(da.data);
      this.countReding = da.data;
    })
  }


}
