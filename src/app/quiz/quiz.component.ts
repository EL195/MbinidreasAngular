import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';
import Speech from 'speak-tts'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  active: boolean = false;
  sub: any;
  item: any;
  userInfo: any;
  user: any;
  quiz: any;
  plus : number = 0;
  @Input() idQuiz: number = 0;
  speech: any;

  items = [];
  pageOfItems: Array<any>;
  selectedWord: any | null;

  selected: any | null;
  actu: boolean;

  score : number = 0;
  scoreActu: any;
  nextShow: boolean = true;
  book: any;
  type: any;
  AllReadsBooks: any;
  deja: boolean = false;


  constructor(
    private _location: Location,
    private route : ActivatedRoute,
    private con: ConnexionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      console.log(params.item);
      this.item = params.item;
      this.book = params.book;
      this.type = params.type;
      this.getQuiz(this.item);
    });
  }
  }

  getQuiz(item){
    let ressource = {
      id : item
    }
    this.con.getDatas("getquiz", ressource).subscribe( async (da:any)=>{
      console.log(da.data);
      this.quiz = da.data;
      this.items = this.quiz
      console.log("taille",da.data.length)
      this. readQuiz(item)

    })
  }

  readQuiz(id){
    let livre ={
      student : this.user.id,
      ressource : id
    }
    this.con.getDatas("quizread", livre).subscribe( async (da:any)=>{
      this.AllReadsBooks = da.data;
      console.log(this.AllReadsBooks);
      if(this.AllReadsBooks[0].status == "read"){
          this.deja = true;
      }
    })
  }



  nextstep(plus, item, quiz){
    console.log(item)
    console.log(quiz)
    console.log(plus)
    this.score = this.score + this.scoreActu;
    this.plus = plus + 1;
    this.scoreActu = 0;
    console.log("iddddddd", plus)
    console.log(this.score);
    //if(plus == parseInt(quiz.total_questions)-1){
/*     if(plus == parseInt(quiz.total_questions)){
      let scor ={
        points : this.score,
        student_id : this.user.id
      }
      this.con.getDatas("addscore", scor).subscribe( async (da:any)=>{
        console.log(da.data);
        //this.markRead(quiz);
      })


    } */
  }

  validate(plus, item, quiz){

    if(isNaN(this.score)){
      alert("You didn't answer any of the questions");
    }
    else{
      this.score = this.score + this.scoreActu;
      this.scoreActu = 0;
      let scor ={
        points : this.score,
        student_id : this.user.id
      }
      this.con.getDatas("addscore", scor).subscribe( async (da:any)=>{
        //console.log(da.data);
        localStorage.setItem('upadted_score', "false");
        this.markRead(quiz);
      }) 
    }
  }

  markRead(quiz) {
    //console.log(quiz)
    let reads = {
      status : "read",
      type : "quiz",
      student : this.user.id,
      ressource : quiz.ressource.id
    }
    this.con.getDatas("addreading", reads).subscribe( async (da:any)=>{
      console.log(da);
      //this.book = da.data[0];
    })

    this.router.navigate(['/books'], { queryParams: {
      item: this.book,
      type : this.type
       }
     });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  choose(item, quiz){
    this.scoreActu = 0;
    this.actu = item.id
    if(item.choose =="1"){
        this.scoreActu = this.scoreActu + parseInt(quiz.points)
    }
    else{
      this.scoreActu = 0;
    }
    //console.log(this.score);
  }


  backClicked() {
    this._location.back();
  }

  listen(quiz){
    //let itenId = document.getElementsByClassName("titling");
    //console.log(quiz);
    //document.getElementsByClassName("titling");
     this.s_init(quiz);
  }

  s_init(word) {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: "en-GB",
        rate: 1,
        pitch: 1,
        //'voice':'Google UK English Male',
        //'splitSentences': false,
        listeners: {
          onvoiceschanged: voices => {
            console.log("Voices changed", voices);
          }
        }
      })
      .then(data => {
        console.log("Speech is ready", data);
        //_addVoicesList(data.voices);
       // _prepareSpeakButton(speech);
       this.readWord(speech, word)
      })
      .catch(e => {
        console.error("An error occured while initializing : ", e);
      });
    const text = speech.hasBrowserSupport()
      ? "Hurray, your browser supports speech synthesis"
      : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
    //document.getElementById("support").innerHTML = text;
  }
  
  readWord(speech, word){
    //console.log(word);
    console.log(speech);
    speech
          .speak({
            text: word,
            queue: false,
            listeners: {
              onstart: () => {
                console.log("Start utterance");
              },
              onend: () => {
                console.log("End utterance");
              },
              onresume: () => {
                console.log("Resume utterance");
              },
              onboundary: event => {
                console.log(
                  event.name +
                    " boundary reached after " +
                    event.elapsedTime +
                    " milliseconds."
                );
              }
            }
          })
          .then(data => {
            console.log("Success !", data);
          })
          .catch(e => {
            console.error("An error occurred :", e);
          });
      
  }
}
