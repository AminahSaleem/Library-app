import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GuidId } from '../library/guid-id';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  @Input() countMethod!: () => void;
  @Input() getAllBooksMethod!: () => void;
  @Input() books: any[] = [];
  @Input() bookOccurrences: { [key: string]: number } = {}
  //@Input allows values to be passed from parent to the child component.
  //the countMethod and the getAllBooksMethod is passed from the html of the library component
  //! tells typescript to treat the property as if it is definitely assigned and not nullable 
  // (): => void; is an annotation for a function that takes no arguments and does not return any value(void)
  @Input() id = '';
  @Input() editMode: boolean = false;
  @Input() book: any;
  @Input() formButtonText = '';
  updatedBook: any;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    
    // responsible for counting the occurences of books and updating the book occurence property
    //getAllBooks is initilaized here
    this.route.params.subscribe(params => {
      //this.route using the activatedroute service .params.subscribe subscribes to the changes in the route parameter 
       this.id =  params['id']
      //extracts the id parameter from the route parameter and assigns it to the id variable 
        this.book = this.bookService.getBookById(this.id);
        this.bookForm;
        this.formButtonText = 'create'
        if(this.id === undefined) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
       this.formButtonText = this.id === undefined ? 'Create book' : 'Submit';
       // toggles between the create and submit button depending if an id is present 
    })
  }

  
  bookForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  editForm() {
    if(this.book){
        this.bookForm.patchValue({
      id: this.book.id,
      title: this.book.title,
      author: this.book.author,
      year: this.book.year,
      description: this.book.description,
    });
    this.bookForm.markAllAsTouched();
    //marks the form field as touched 
    }
  
  }
  //form group represents adding the form for adding books 

submittedForm(){
  if(this.id===undefined){
    this.addBook();
  } else if (this.id!==undefined) {
    this.bookService.updateBook(this.updatedBook);
    this.onSubmit();
  }
  // if there is no id, add a book and if there is an id edit the book

}
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
    window.location.reload()
    //automatically refreshes the page
    this.countMethod();
    //calls count here to automatically update the browser
    this.getAllBooksMethod();
    //call getallbooks to display the books on the browser straight away 
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if(this.editMode === true){
      this.editForm();
    }
  }
//toggles between true and false so that  the fields can become editable

  onSubmit(): void {
    if(this.editMode){
      //if edit mode is true 
      const editedBook = this.bookForm.value;
      // extracts the current value from the form and assigns it to edited book
      this.bookService.updateBook(editedBook);
      //invokes service and the editedbook object is passed to this method to carry out the update
      alert(`"${editedBook.title}" has been updated successfully`);
      this.book = editedBook;
      //sets book to edited book
      this.editMode = false;
      //turns edit mode false once the book has been edited 
      this.router.navigate(['library']);
      // naviagtes us back to the library page after editing book
    }
  }
}
