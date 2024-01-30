import { BookService } from '../book.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {

  books: any[] = [];
  //declares a property of books and initilaising it to an empty array 
// assumes that the bookservice returns an array of books 
  
  bookOccurrences: { [key: string]: number } = {};
  //declares bookoccurrences property with a key of string and value of number which is initialised to an empty object

  public filterTerm: string;
  //sets public property filterTerm with type string

  constructor(private bookService: BookService) {
    this.filterTerm = '';
    //initilaizes filterTerm with an empty string
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.count();
  }
  


  getAllBooks(): void {
    this.books = this.bookService.getBooks();
  }
  //sets the method getAllBooks here, sets this.books(set at the top earlier)
  //this.bookService.getBooks(); fetches the list of books from the bookservice and assigns it to the books property
  
  count():void {
    this.bookOccurrences = this.bookService.countOccurrences();
   //  calls countoccurrences method from book service and assigns it to bookoccurences 
  }
}
