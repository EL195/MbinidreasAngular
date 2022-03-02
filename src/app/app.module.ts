import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ItemComponent } from './item/item.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LeveledComponent } from './leveled/leveled.component';
import { GenreComponent } from './genre/genre.component';
import { ThemeComponent } from './theme/theme.component';
import { AgegroupComponent } from './agegroup/agegroup.component';
import { MbinditimeComponent } from './mbinditime/mbinditime.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResetComponent } from './reset/reset.component';
import { BooksComponent } from './books/books.component';
import { ReadingComponent } from './reading/reading.component';
import { StatsComponent } from './stats/stats.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NotfoundComponent } from './notfound/notfound.component';
import { NotmemberComponent } from './notmember/notmember.component';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import { TestComponent } from './test/test.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxSpinnerModule } from "ngx-spinner";
import { CguComponent } from './cgu/cgu.component';  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    ItemComponent,
    HomeComponent,
    ProfileComponent,
    LeveledComponent,
    GenreComponent,
    ThemeComponent,
    AgegroupComponent,
    MbinditimeComponent,
    QuizComponent,
    HeaderComponent,
    FooterComponent,
    ResetComponent,
    BooksComponent,
    ReadingComponent,
    StatsComponent,
    NotfoundComponent,
    NotmemberComponent,
    TestComponent,
    CguComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    JwPaginationModule,
    NgbModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
