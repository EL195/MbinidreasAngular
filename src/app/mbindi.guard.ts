import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MbindiGuard implements CanActivate {
  user: any;
  userInfo: any;
  
  constructor(private router: Router ){
  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
    this.userInfo = localStorage.getItem('user_data');
    this.user = JSON.parse(this.userInfo);
    //console.log("user", this.user);
    //console.log(Number(this.user.age.years_start));
    if(Number(this.user.age.years_start) >= 6){
      return true;
    }
    else{
      this.router.navigate(['/books'], { queryParams: {
        item: this.user.age.id,
        type : "age"
         }
       });
      return false;
    }
}
  
}
