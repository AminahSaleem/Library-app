import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { GuidId } from './guid-id';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {

  books: any[] = [];
  //declares a property of books and initilaising it to an empty array 
// assumes that the bookservice returns an array of books 
  
  bookOccurrences: { [key: string]: number } = {};
  //decalres bookoccurrences property with a key of string and value of number which is initialised to an empty object

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {}

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  //form group represents adding the form for adding books 

  ngOnInit(): void {
    this.getAllBooks();
    this.count();
    // responsible for counting the occurences of books and updating the book occurence property
  }
  //getAllBooks method is initialised here 

  getAllBooks(): void {
    this.books = this.bookService.getBooks();
  }
  //sets the method getAllBooks here, sets this.books(set at the top earlier)
  //this.bookService.getBooks(); fetches the list of books from the bookservice and assigns it to the books property

  addBook(): void {
    const newBook = { 
      id: new GuidId().id,
      //adds a guid to each book 
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      year: this.bookForm.value.year,
      description: this.bookForm.value.description,
    };
    //new book created from the form values
    this.bookService.addBook(newBook);
    //passes it to the add book method of book service 
    this.bookForm.reset();
    //resets the form  
    this.count();
    //calls count here to automatically update the browser
    this.getAllBooks();
    //call getallbooks to display the books on the browser straight away 
  }
  
  count():void {
    this.bookOccurrences = this.bookService.countOccurrences();
   //  calls countoccurrences method from book service and assigns it to bookoccurences 
  }

}
