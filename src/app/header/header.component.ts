import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';
import { interval, Subscription, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SoundService } from '../services/sound.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connected : boolean = false;
  user: any | null;
  score: any;
  counterSubscription: Subscription;
  public routerLinkVariable = "/home"; // the value of the variable is string!
  href: string;
  constructor(
    private router: Router,
    private con: ConnexionService,
    private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private play: SoundService,
  ) { 

    
  }

  ngOnInit(): void {
    this.getInfos();
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.href = this.router.url.split('?')[0];
        //console.log(this.href);
        let updated = localStorage.getItem('upadted_score');
        if(updated=="true"){
          this.getInfos();
        }
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

  getScore(user){
    let userr = {
      id : user.id
    }
    this.con.getDatas("getscore", userr).subscribe( async (da:any)=>{
      //console.log(da);
     // console.log(da.data[0]);
      this.score = da.data[0].points;
    })
    localStorage.setItem('upadted_score', "false");
  }
  getInfos(){
    let userInfo = localStorage.getItem('user_data');
    if(userInfo){
      this.connected = true;
      this.user = JSON.parse(userInfo);
      this.getScore(this.user);
    }
    else{
      this.connected = false;
    }
  }

  logout(){
    localStorage.clear();
    this.connected = false;
    this.showSWarning("Successfully Logout", "Conexion status")
    
  }

  showSWarning(message, title){
    this.SpinnerService.hide();
    this.router.navigate(['/login']);
    this.play.playOnSuccess();
    this.toastr.warning(message, title)
  }

  goToPartners(){
    window.open("https://partners.mbindireads.com", "_self");
  }

}
