import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../services/connecion.service';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'primeng/carousel';
import { SoundService } from '../services/sound.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [NgbPopoverConfig] // add NgbPopoverConfig to the component providers
})
export class BooksComponent implements OnInit{
  sub: any;
  item: any;
  type: number;
  books : any = [];
  Booksreturned : any = [];
  reading : any = [];
  mbindi : boolean = false;
  //private _subscription:Subscription;


  //images; 
  responsiveOptions;




  userInfo: any | null;
  user: any | null;
  clicked: boolean = false;
  items: any;
  checked: any;
  AllReadsBooks: any;
  vrai: boolean;
  readNote: number;
  hearNote: number;
  quizNote: number;
  itemi: any;
  images: any[];
  newBook: any[];
  clickeds: boolean = false;
  itemss: any;

  constructor(
    private route : ActivatedRoute,
    private router:Router,
    private con: ConnexionService,
    private play: SoundService,
    config: NgbPopoverConfig
  ) { 
        // customize default values of popovers used by this component tree
        config.placement = 'center-center';
        config.triggers = 'click';

        this.responsiveOptions = [{
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 3
      }];
  }

  ngOnInit(): void {

    this.images = [
      {random: 'Random', picture: 'https://picsum.photos/id/944/900/500'},
      {random: 'Samoa', picture: 'https://picsum.photos/id/1011/900/500'},
      {random: 'Tonga', picture: 'https://picsum.photos/id/984/900/500'},
      {random: 'Cook Island', picture: 'https://picsum.photos/id/944/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/1011/900/500'},
      {random: 'American Samoa', picture: 'https://picsum.photos/id/984/900/500'}
  ];

  
    this.userInfo = localStorage.getItem('user_data');
    if(this.userInfo){
      this.user = JSON.parse(this.userInfo);
      if(this.user.age.years_start == 3){
        this.mbindi = true;
      }
      else{
        this.mbindi = false;
      }
      this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params.type);
        this.item = params.item;
        this.type = params.type;
        let datas = {
          langue : this.user.langue_id,
          age : this.user.age.id,
        }
        this.con.getDatas("getnewbooks", datas).subscribe( async (da:any)=>{
          console.log(da);
          this.newBook = da.data;
          console.log("Nouveau", this.newBook);
          this.getBooks(this.user, this.item, this.type)
        })
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  clikced(){
    this.play.playOnClick();
  }
  
  hovered(){
    this.play.playOnHover();
  }

  getBooks(user, item: any, type: any) {
    if(type=="level"){
      this.getLeveledBooks(user, item);
    }
    if(type=="subject"){
      //alert(2)
      this.getSubjectsBooks(user, item);
    }
    if(type=="theme"){
      //alert(2)
      this.getThemesBooks(user, item);
    }
    if(type=="genre"){
      //alert(2)
      this.getGenresBooks(user, item);
    }
    if(type=="age"){
      //alert(2)
      this.getTAgeBooks(user, item);
    }
  }

  moadalOpen(item){
    this.clicked = true;
    this.items = item;

  }



  moadalOpens(item){
    console.log(item);
    this.clickeds = true;
    this.itemss = item;

  }

  // Afficher un langue sélectionnée
  moadalclose(){
    this.clicked = false;
   }



  getLeveledBooks(user, id){
    console.log(user)
    let datas = {
      langue : user.langue_id,
      level : id,
      age : user.age.id,
    }
    this.con.getDatas("getleveledressources", datas).subscribe( async (da:any)=>{
      console.log(da);
      this.books = da.data;
      this.getAllReadsBook();
    })
  }

  getSubjectsBooks(user, id){
    console.log(user)
    let datas = {
      langue : user.langue_id,
      subject_id : id,
      age : user.age.id,
    }
    this.con.getDatas("getsubjectsressources", datas).subscribe( async (da:any)=>{
      console.log(da);
      this.books = da.data;
      this.getAllReadsBook();
    })
  }

  getThemesBooks(user, id){
    console.log(user)
    let datas = {
      langue : user.langue_id,
      theme_id : id,
      age : user.age.id,
    }
   // let test = false;
   // if(test==false){
    this.con.getDatas("getthemesressources", datas).subscribe( async (da:any)=>{
        console.log(da);
        this.books = da.data;
        this.getAllReadsBook();
      })
      //.unsubscribe()
   // }
   // test=true;
   //this.con.getDatas("getthemesressources", datas).unsubscribe();

  }

  getGenresBooks(user, id){
    console.log(user)
    let datas = {
      langue : user.langue_id,
      genre_id : id,
      age : user.age.id,
    }
    this.con.getDatas("getgenresressources", datas).subscribe( async (da:any)=>{
      console.log(da);
      this.books = da.data;
      this.getAllReadsBook();
    })
  }


  getTAgeBooks(user, id){
    console.log(user)
    let datas = {
      langue : user.langue_id,
      age_id : id
    }
    this.con.getDatas("getageressources", datas).subscribe( async (da:any)=>{
      console.log(da);
      this.books = da.data;
      this.getAllReadsBook();
    })
  }


  read(item){
    this.clicked = false;
    this.router.navigate(['/item'], { queryParams: {
      item: item,
      type : "read",
      typo : this.type
       }
     });
  }


  hear(item){
    this.clicked = false;
    this.router.navigate(['/item'], { queryParams: {
      item: item,
      type : "hear",
      typo : this.type
       }
     });
  }

  quiz(item){
    this.clicked = false;
    this.router.navigate(['/quiz'], { queryParams: {
      item: item,
      book : this.item,
      type : this.type,
       }
     });
  }

  getAllReadsBook(){
      let livre ={
        student : this.user.id
      }
      this.con.getDatas("getreading", livre).subscribe( async (da:any)=>{
        this.AllReadsBooks = da.data;
        //console.log(this.AllReadsBooks);

        this.getReadsBook();
      })
  }
  

  getReadsBook(){
      this.books.forEach(elt=>{
        //this.itemi = elt;
        //console.log(elt);
        //this.checkRead(elt);
        let item = {
           book : elt,
           reading :this.checkRead(elt)
        }
        this.Booksreturned.push(item)
        //console.log(elt, this.checkRead(elt))
      })
    console.log("Filtré", this.Booksreturned); 
  }

  checkRead(livre){
    this.readNote = 0;
    this.hearNote = 0;
    this.quizNote = 0;
    console.log(this.AllReadsBooks.length-1)
      for(let i=0; this.AllReadsBooks.length>i;i++){
          if(this.AllReadsBooks[i].ressource_id == livre.id && this.AllReadsBooks[i].student_id == this.user.id && this.AllReadsBooks[i].type == "read"){
            this.readNote = 1;
          }
          if(this.AllReadsBooks[i].ressource_id == livre.id && this.AllReadsBooks[i].student_id == this.user.id && this.AllReadsBooks[i].type == "hear"){
            this.hearNote = 1;
        }
        if(this.AllReadsBooks[i].ressource_id == livre.id && this.AllReadsBooks[i].student_id == this.user.id && this.AllReadsBooks[i].type == "quiz"){
          this.quizNote = 1;
        } 
      }
    let lecture = {
      read : this.readNote | 0,
      hear : this.hearNote | 0,
      quiz : this.quizNote | 0
      };

  return lecture;
  }

  



}
