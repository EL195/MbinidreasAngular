import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SoundService } from './services/sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mbindireads';
  userActivity;
  userInactive: Subject<any> = new Subject();



  constructor(
    private router: Router,
    private toastr: ToastrService,
    private eRef: ElementRef,
    private play: SoundService,
    ) { 
    this.setTimeout();
    this.userInactive.subscribe(() => {
      //console.log('user has been inactive for 10s')
      localStorage.clear();
      this.toastr.warning("You've been inactive for too long. Please log in again", "User sctivity")
      this.router.navigate(['/login']);
      });
     
  }

/*   @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      console.log("clicked inside");
      this.play.playOnClick();
    } else {
      //this.text = "clicked outside";
    }
  } */


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  







}
