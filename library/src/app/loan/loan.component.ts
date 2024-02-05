import { Component, Input } from '@angular/core';
import { Book } from '../library/book.model';
import { BookService } from '../book.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent {

  book: any;
  userId: string | null = null;
  @Input() users: User[] = [];

  constructor(private bookService: BookService, private userService: UserService){}

  loanBook(): void{  
    if(this.userId && this.book && this.book.availability){
      const user = this.userService.getUserById(this.userId);
      if (user ) {
        this.book.availability = false;
        this.bookService.updateBook(this.book);
        // sets book availabiltiy to false and then updates book
        user.borrowBooks.push(this.book.id);
        this.userService.updateUser(user);
        }
      }
   
    }
 

  returnBook(): void{
    if(this.book && !this.book.availability){
      this.book.availability = true;
      this.bookService.updateBook(this.book);

      if(this.userId){
        const user = this.userService.getUserById(this.userId);
        if(user){
          user.borrowBooks = user.borrowBooks.filter(bookId => bookId !== this.book.id)
          this.userService.updateUser(user);
        }
      }
    }
    }
  }

