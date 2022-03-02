import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConnexionService } from './services/connecion.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  user : any;
  id: any;
  vrai: boolean = false;

  constructor(
    private con: ConnexionService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
    let user = localStorage.getItem('user_data');
    if(user){
      this.user = localStorage.getItem('user_data');
          if(this.user.user_id == null){
            this.id = this.user.classe_id;
          }
          else{
              this.id = this.user.id;
          }
      let datas = {
        id : this.id
      }
      this.con.getDatas("checkmember", datas).subscribe( async (da:any)=>{
        console.log("RegRDER", da);
        if(da.data.status=="1"){
          this.vrai = true;
        }
        else{
          this.vrai = false;
        }
      })
      return this.vrai;
    }
    else{
      this.toastr.warning("Membership expired or not activated", "Membership status")
      //this.router.navigate(['/login']);
      ///return this.vrai;
      return true;
    }
}

}
