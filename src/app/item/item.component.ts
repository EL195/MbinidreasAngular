import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';
import Speech from 'speak-tts'
import { PDFProgressData } from 'ng2-pdf-viewer';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  sub: any;
  item: any;
  type: any;
  books : any = [];
  mbindi : boolean = false;

  selectedWord: any;


  userInfo: any | null;
  user: any | null;
  clicked: boolean = false;
  items: any;
  book: any;
  document: { name: any; description: string; url: { url: string; withCredentials: boolean; }; };
  s: any | null;
  range: any | null;
  node: any | null;
  selected: any | null;
  text: any | null;
  speech: any;
  typo: any;
  activequiz: boolean = false;

  constructor(
    private _location: Location,
    private route : ActivatedRoute,
    private router:Router,
    private con: ConnexionService,
  ) { }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
/*       if(this.user.age.years_start == 3){
        this.mbindi = true;
      }
      else{
        this.mbindi = false;
      } */
      this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params.type);
        this.item = params.item;
        this.type = params.type;
        this.typo = params.typo;
        //console.log("console", this.type)
        if(this.type == "read"){
          this.getBook(this.item);
        }
        if(this.type == "hear"){
          this.getBookHear(this.item);
        }
        else{

        }
        
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  highlight(event) {
    this.selectedWord = window.getSelection();
    console.log(this.selectedWord.anchorNode.data);
    //console.log(event);
/*     this.text = this.text.replace(
      this.selectedWord,
      "<mark>" + this.selectedWord + "</mark>"
    ); */
  }

  testWord(){
    this.s = window.getSelection();
    this.range = this.s.getRangeAt(0);
    this.node = this.s.anchorNode;

    // Find starting point
    while(this.range.toString().indexOf(' ') != 0) {                 
       this.range.setStart(this.node,(this.range.startOffset -1));
    }
    this.range.setStart(this.node, this.range.startOffset +1);

    // Find ending point
    do{
      this.range.setEnd(this.node,this.range.endOffset + 1);

   }while(this.range.toString().indexOf(' ') == -1 && this.range.toString().trim() != '');
   // Alert result
   const str = this.range.toString().trim();
   alert(str);
  }

  testTwo(){
    if(this.type=='read'){
        var selection = window.getSelection();
        if (!selection || selection.rangeCount < 1) return true;
        var range = selection.getRangeAt(0);
        this.node = selection.anchorNode;
        var word_regexp = /^\w*$/;

        // Extend the range backward until it matches word beginning
        while ((range.startOffset > 0) && range.toString().match(word_regexp)) {
          range.setStart(this.node, (range.startOffset - 1));
        }
        // Restore the valid word match after overshooting
        if (!range.toString().match(word_regexp)) {
          range.setStart(this.node, range.startOffset + 1);
        }

        // Extend the range forward until it matches word ending
        while ((range.endOffset < this.node.length) && range.toString().match(word_regexp)) {
          range.setEnd(this.node, range.endOffset + 1);
        }
        // Restore the valid word match after overshooting
        if (!range.toString().match(word_regexp)) {
          range.setEnd(this.node, range.endOffset - 1);
        }

        const word = range.toString();
        //alert(word);
        this.s_init(word);
    }
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

  getSentence(){
    if(this.type=='hear'){
        this.text = document.getElementById("text");
        this.text = this.text.innerText;
        this.p_init(this.text);
    }
  }


  p_init(sentence) {
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
       this.readSentence(speech, sentence)
      })
      .catch(e => {
        console.error("An error occured while initializing : ", e);
      });
    const text = speech.hasBrowserSupport()
      ? "Hurray, your browser supports speech synthesis"
      : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
    //document.getElementById("support").innerHTML = text;
  }

  readSentence(speech, sentence){
    console.log(sentence);
    this.speech = speech;
    this.speech
          .speak({
            text: sentence,
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

  pause(){
    this.speech.pause();
  }

  resume(){
    this.speech.resume();
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

    



  getBookHear(item: any) {
    let livre = {
      id : item
    }
    this.con.getDatas("getressource", livre).subscribe( async (da:any)=>{
      console.log(da.data[0]);
      this.book = da.data[0];
    })
  }


  getBook(item) {
    let livre = {
      id : item
    }
    this.con.getDatas("getressource", livre).subscribe( async (da:any)=>{
      console.log(da.data[0]);
      this.book = da.data[0];
    })
  }

  backClicked() {
    this._location.back();
  }


  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
    //console.log(this.page);
    if(this.page==this.totalPages){
      this.activequiz = true;
      //console.log("Fini");
      this.markRead();
    }
    //console.log(this.activequiz)
  }


  markRead() {
    let reads = {
      status : "read",
      type : this.type,
      student : this.user.id,
      ressource : this.item
    }
    this.con.getDatas("addreading", reads).subscribe( async (da:any)=>{
      console.log(da);
      //this.book = da.data[0];
    })
/*     this.router.navigate(['/quiz'], { queryParams: {
      item: this.item,
      book : this.item,
      type : this.typo,

       }
     }); */
  }


  goToQuiz(){
    this.router.navigate(['/quiz'], { queryParams: {
          item: this.item,
          book : this.item,
          type : this.typo,
          }
        }); 
  }



  prevPage() {
    this.page--;
  }



}
