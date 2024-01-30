import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  book: any;
  bookForm!: FormGroup;

//sets property of bookform and it holds an instance of form group
  id = '';
  //  to use this when creating form component 
  editMode: boolean = false;
  //sets editmode to be false

  constructor (private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
    //   //this.route using the activatedroute service .params.subscribe subscribes to the changes in the route parameter 
      const id: string =  params['id']
    //   //extracts the id parameter from the route parameter and assigns it to the id variable 
        this.book = this.bookService.getBookById(id);
        //uses the service get book by id function to retrieve the corresponding book
        // this.book = this.bookService.getBooks().map(book => ({...book, loaned: false}));
    })
  }


  deleteBook(id: string): void {
    if(this.book){
       this.bookService.deleteBookById(id);
  //deletes book from the local storage 
    alert(`"${this.book.title}" has been deleted successfully`);
    // send an alert for the successfully deleted book by title 
    this.book = this.bookService.getBooks();
    // updates the book list property after the book has been deleted 
    this.router.navigate(['library']);
  }
    }
    
    loanBook(): void{     
      this.book.availability = false;
      this.bookService.updateBook(this.book);
      // sets book availabiltiy to false and then updates book
     }
 
     returnBook(): void{
      this.book.availability = true;
      this.bookService.updateBook(this.book);
      // sets book availabiltiy to true and then updates book

     }
 
}
