
import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  connected : boolean = false;
  user: any | null;
  score: any;
  counterSubscription: Subscription;
  href: string;


  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.href = this.router.url.split('?')[0];
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

}
