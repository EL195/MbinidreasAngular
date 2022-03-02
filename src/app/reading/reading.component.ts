import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {
  userInfo: any | null;
  user: any | null;
  score: any;
  countressources: any;
  countR: any;
  countReding: any;
  themes : any = [];
  subjects : any = [];
  genres : any = [];
  countbooklevels: any;

  constructor(
    private con: ConnexionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
      this.getthemes();
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  

  getthemes(){
    this.con.getData("themes").subscribe( async (da:any)=>{
      console.log(da);
      this.themes = da.data;
    })
    this.getgenres();
  }


  getgenres() {
    this.con.getData("genres").subscribe( async (da:any)=>{
      console.log(da);
      this.genres = da.data;
    })
    this.getsubjects();
  }


  getsubjects() {
    this.con.getData("subjects").subscribe( async (da:any)=>{
      console.log(da);
      this.subjects = da.data;
    })
  }

  goToBooks(id, type){
    this.router.navigate(['/books'], { queryParams: {
       item: id,
       type : type
        }
      });
  }

}
