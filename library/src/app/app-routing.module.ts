import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, title: 'Home'},
  {path: 'library', component: LibraryComponent, title: 'Library'},
  {path: 'book-details/:id', component: BookDetailsComponent, title: 'Book Details'},
  // id is not a part of the url
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
