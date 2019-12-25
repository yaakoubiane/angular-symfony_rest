import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'add', component: CreateBookComponent },
  { path: 'detail/:id', component: BookDetailComponent },
  { path: 'edit/:id', component: EditBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
