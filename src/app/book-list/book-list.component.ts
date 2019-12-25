import { Component, OnInit } from '@angular/core';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { Observable } from "rxjs";
import { BookService } from "../book.service";
import { Book } from "../book";
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:Book[];
book:Book;

  constructor(private bookService:BookService, private router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.getBooks();
      console.log(this.getBooks);
    }, 1000);
  }


  getBooks(): void {
    this.bookService.getBooks()
        .subscribe(books => this.books = books);
  }

  

  deleteBook(book:Book): void {
    this.bookService.deleteBook(book).subscribe(
      data => {
        console.log(data);
        this.getBooks();
      },
      error => console.log(error)
    );
    //window.location.replace('/books');

  }

  bookDetails(id: number){
    this.router.navigate(['detail', id]);
  }

  EditBook(id: number){
    this.router.navigate(['edit', id]);
  }

}
