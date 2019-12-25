import { BookService } from '../book.service';
import { Book } from '../book';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book = new Book();
  submitted = false;
  id:number;

  constructor(private route: ActivatedRoute,private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));
  }

  newBook(): void {
    this.submitted = false;
    this.book = new Book();
  }

  edit() {
    this.bookService.updateBook(this.id, this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }

  gotoList() {
    this.router.navigate(['/books']);
  }


}
