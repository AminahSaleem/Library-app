import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  book: any;
  
  constructor (private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //this.route using the activatedroute service .params.subscribe subscribes to the changes in the route parameter 
      const id: string =  params['id']
      //extracts the id parameter from the route parameter and assigns it to the id variable 
        this.book = this.bookService.getBookById(id);
        //uses the service get book by id function to retrieve the coprresponding book
    })
  }

  deleteBook(id: string): void {
    this.bookService.deleteBookById(id);
  //deletes book from the local storage 
    alert(`"${this.book.title}" has been deleted successfully`);
    // send an alert for the successfully deleted book by title 
    this.book = this.bookService.getBooks();
    // updates the book list property after the book has been deleted 
    this.router.navigate(['library']);
  }
 
}
