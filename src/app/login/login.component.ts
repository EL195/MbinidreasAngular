import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username : any;
  code : any;
  userInfo: string | null;
  user: any;
  id: any;
  codeUser: any;
  pass: any;
  sub: any;

  constructor(
    private con: ConnexionService,
    private router: Router,
    private route : ActivatedRoute,
    private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private play: SoundService,
  ) { 

    this.sub = this.route
    .queryParams
    .subscribe(params => {
      localStorage.clear();
      this.username = params.user;
      this.code = params.pass;
    })
  }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
      if(this.user.age.years_start == 3){
        this.router.navigate(['/books'], { queryParams: {
          item: this.user.age.id,
          type : "age"
           }
         });
      }
      else{
        this.router.navigate(['/home']);
      }
    }


  }

  login(){
    if(this.code == "" || this.code == undefined ){
      this.showSWarning("Please enter your code", "Required field");

    }
    if(this.username == "" || this.username == undefined){
      this.showSWarning("Please enter your username", "Required field");
    }
    else{
      this.SpinnerService.show();
      let user = {
        username : this.username,
        password : this.code
      }
      this.con.login(user).subscribe((data:any)=>{
        if(data.message == "Success"){
            this.getUser(data.data[0]);
        }
        else{
          this.SpinnerService.hide();  
          this.showSWarning("Username or code is incorrect", "Login error");
        }
      })
    }
      
  }

  getUser(user){
    if(user.user_id == null){
      this.id = user.classe_id;
    }
    else{
        this.id = user.id;
    }
    let datas = {
      id : this.id
    }
    this.con.getDatas("checkmember", datas).subscribe( async (da:any)=>{
      console.log("RegRDER", da);
      //console.log("RegRDERRegRDERRegRDERRegRDER", da.data.status);
      if(da.data==null){
        this.SpinnerService.hide();  
        this.showSWarning("Membership expired or not activated", "Membership status")
      }
      else{
        if(da.data.status=="1"){
          let start_date = da.data.updated_at;
          let dayss = da.data.membership.periode;
          let end_date = new Date(start_date);
          end_date.setDate(end_date.getDate() + parseInt(dayss));
          console.log(dayss);
          console.log(start_date);
          console.log(end_date);
          let dateNow = new Date();
          console.log(dateNow);
          if(dateNow<end_date){
                localStorage.setItem('user_data', JSON.stringify(user));
                let update = "true";
                localStorage.setItem('upadted_score', update);
                if(user.langue_id == null){
                  this.SpinnerService.hide();  
                  this.showSuccess("Welcomme back "+user.first_name, "Success login");
                  this.router.navigate(['/test']);
                }
                else if(user.age.years_start == 3){
                  this.SpinnerService.hide();  
                  this.showSuccess("Welcomme back "+user.first_name, "Success login");
                  this.router.navigate(['/books'], { queryParams: {
                    item: user.age.id,
                    type : "age"
                    }
                  });
                }
                else if(user.age.years_start > 3){
                  this.showSuccess("Welcomme back "+user.first_name, "Success login");
                  this.router.navigate(['/home']);
                }
                else{
                  this.router.navigate(['/test']);
                }
            }
            else{
                this.showSWarning("Membership expired", "Membership status")
              }
        }
        else{
          this.showSWarning("Membership not activated", "Membership status")
        }
      }
    })
  }

  showSWarning(message, title){
    this.toastr.warning(message, title)
  }

  showSuccess(message, title){
    this.toastr.success(message, title)
    this.play.playOnSuccess();
  }

}


