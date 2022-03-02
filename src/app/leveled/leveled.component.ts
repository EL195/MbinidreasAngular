import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';

@Component({
  selector: 'app-leveled',
  templateUrl: './leveled.component.html',
  styleUrls: ['./leveled.component.scss']
})
export class LeveledComponent implements OnInit {
  userInfo: any | null;
  user: any | null;
  score: any;
  countressources: any;
  countR: any;
  countReding: any;
  levels : any = [];
  countbooklevels: any;


  constructor(
    private con: ConnexionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
      this.getlevels(this.user);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  getlevels(user) {
    let userr = {
      id : user.age
    }
    this.con.getDatas("levels", userr).subscribe( async (da:any)=>{
      this.levels = da.data;
    })
  }

/*   countBooks(level){
    let userr = {
      id : level
    }
    this.con.getDatas("countbooklevels", userr).subscribe( async (da:any)=>{
      console.log(da);
      this.countbooklevels = da.data;
    })
    return this.countbooklevels.data;
  } */

  goToBooks(id){
    this.router.navigate(['/books'], { queryParams: {
       item: id,
       type : "level"
        }
      });
  }


}
