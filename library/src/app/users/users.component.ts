import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { GuidId } from '../library/guid-id';
import { User } from '../user';
import { BookService } from '../book.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
  users: User[] = [];
  books: any;
  userId: string | null = null;
  selectedUser: User | undefined;
  loanedBook: any;

  userForm = new FormGroup({
    id: new FormControl (''),
    title: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });


  constructor(private userService: UserService, private bookService: BookService) {}
  
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllBooks();
  }


  addUser(): void {
    const newUser: User = {
      id: new GuidId().id,
      title: this.userForm.value.title || '',
      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '', 
      borrowBooks: [],
    }
    this.userService.addUser(newUser);
    this.userForm.reset();
    window.location.reload();
  }

  getAllUsers(): void {
    this.users = this.userService.getUsers();
  }

  getAllBooks(): void {
    this.books = this.bookService.getBooks()
  }
  
  onUserSelect(event: Event): void {
    event.preventDefault();
    const userId = this.userForm.value.id;
    if (userId) {
      this.selectedUser = this.userService.getUserById(userId);
    }
  }

  onLoanReturnBook(book: any): void {
    if (this.selectedUser) {
      if (this.isBookLoaned(book)) {
        this.returnBook(book);
      } else {
        this.loanBook(book);
      }
    }
    this.loanedBook = book.availability ? null : book;
  }

  loanBook(book: any): void {
    if(this.selectedUser && book.availability){
        book.availability = false;
        this.bookService.updateBook(book);
        this.selectedUser.borrowBooks = this.selectedUser.borrowBooks || [];
        this.selectedUser.borrowBooks.push(book.id);
        this.userService.updateUser(this.selectedUser);
        this.loanedBook = book;
      } else {
        alert('The book is already on loan')
      
     
    }
  }

  returnBook(book: any): void {
    book.availability = true;
    this.bookService.updateBook(book);
    if (this.selectedUser) {
      this.selectedUser.borrowBooks = this.selectedUser.borrowBooks.filter(bookId => bookId !== book.id);
      this.userService.updateUser(this.selectedUser);
    }
    this.loanedBook.delete(book.id);
  }

  isBookLoaned(book: any): boolean {
    return !!this.selectedUser && this.selectedUser.borrowBooks.includes(book.id);;
  }
}

