import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }


  playOnClick() {
    var audio = new Audio('assets/sounds/click.mp3');
    audio.play();
  }


  playOnHover() {
    var audio = new Audio('assets/sounds/hoverBook.mp3');
    audio.play();
  }

  playOnSuccess() {
    var audio = new Audio('assets/sounds/success.mp3');
    audio.play();
  }
}
