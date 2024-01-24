import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      //this.route using the activatedroute service .params.subscribe subscribes to the changes in the route parameter 
      const id: string =  params['id']
      //extracts the id parameter from the route parameter and assigns it to the id variable 
        this.book = this.bookService.getBookById(id);
        //uses the service get book by id function to retrieve the coprresponding book
        this.newForm();
        // calls the newform here
    })
  }

  newForm() {
    this.bookForm = new FormGroup({
      id: new FormControl(this.book.id),
      title: new FormControl(this.book.title, Validators.required),
      author: new FormControl(this.book.author, Validators.required),
      year: new FormControl(this.book.year, Validators.required),
      description: new FormControl(this.book.description, Validators.required),
    });
  }
  //calls the bookform property from above and sets it to a new form group (similar to library component)
  // by doign this.book.title I am setting the initial value to this 
  //validators required ensures that the field is required and must not be empty

  deleteBook(id: string): void {
    this.bookService.deleteBookById(id);
  //deletes book from the local storage 
    alert(`"${this.book.title}" has been deleted successfully`);
    // send an alert for the successfully deleted book by title 
    this.book = this.bookService.getBooks();
    // updates the book list property after the book has been deleted 
    this.router.navigate(['library']);
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }
//toggles between true and false so that  the fields can become editable

  onSubmit(): void {
    if(this.editMode){
      //if edit mode is true 
      const editedBook = this.bookForm.value;
      // extracts the current value from the form and assigns it to edited book
      this.bookService.updateBook(editedBook);
      //invokes service and the editedbook object is passed to this method to carry out the update
      alert(`"${editedBook.title} has been updated successfully`);
      this.book = editedBook;
      //sets book to edited book
      this.editMode = false;
      //turns edit mode false after updating book
      // this.router.navigate(['library']);
    }
  }
 
}
