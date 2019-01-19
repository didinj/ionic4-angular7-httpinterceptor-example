import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  books: Book[];

  constructor(private bookService: BookService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.books = books;
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(res => {
        console.log(res);
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      });
  }

}
