import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {

  constructor(private bookService: BookService) {}

  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    year: new FormControl(''),
    description: new FormControl('')
  })

  //form group represents adding the form for adding books 

  addBook(): void {
    const newBook = { 
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
  }
}
