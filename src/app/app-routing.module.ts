import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { StudentGuard } from './student.guard';
import { MbindiGuard } from './mbindi.guard';
import { TestComponent } from './test/test.component';
import { CguComponent } from './cgu/cgu.component';  


const routes: Routes = [
  { 
  path: 'home', 
  canActivate: [StudentGuard, MbindiGuard],
  component: HomeComponent 
  },
  { path: 'cgu', component: CguComponent },

  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { 
  path: 'reading', 
  canActivate: [StudentGuard, MbindiGuard],
  component: ReadingComponent 
  },
  { path: 'leveled',
  canActivate: [StudentGuard, MbindiGuard],
   component: LeveledComponent 
  },
  { path: 'forgot', component: ForgotComponent },
  { path: 'books', component: BooksComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'reset', component: ResetComponent },
  { 
    path: 'item', 
    canActivate: [StudentGuard],
    component: ItemComponent 
  },
  { 
    path: 'quiz', 
    canActivate: [StudentGuard],
    component: QuizComponent 
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
