import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private storageKey = 'bookList';

  constructor() {}

  getBooks(): any[] {
    const storedBooks = localStorage.getItem(this.storageKey);
    //retrieves the stored books from local storage 
    return storedBooks ? JSON.parse(storedBooks) : [];
    //if there are stored books, parse the JSON string otherwise return an empty array
  }

  addBook(book: any): void {
    // retrieves the exisiting books from local storage 
    const books = this.getBooks();
    books.push(book);
    // add the new book to the array of exisiting books 
    localStorage.setItem(this.storageKey, JSON.stringify(books));
    //save the updated array of books baclk to local storage 
  }

  getBookById(id: string): any {
    const books = this.getBooks();
    //calls getBooks to get an array of books 
    return books.find(book => book.id === id);
    // uses the find method to return the first element in the array with the id that matches the book
  }

  deleteBookById(id: string): void {
    const books = this.getBooks().filter((book: any )=> book.id !== id);
    //retrieves the current list of books by using the get books method it then filters through the books and removed the specified id from the array
    localStorage.setItem(this.storageKey, JSON.stringify(books));
    //updates the local storage with the modified array of books 
  }
  // deleteBookById(id: string): void {
  //   const books = this.getBooks();
  //   const index = books.findIndex((book: any) => book.id === id);
  
  //   if (index !== -1) {
  //     books.splice(index, 1);
  //     localStorage.setItem(this.storageKey, JSON.stringify(books));
  //   }}  ==> another way to write the deletebookbyid 

  countOccurrences(): {[key: string]: number} {
    return this.getBooks().reduce((acc, book) => {
      const key = String(book.title || book.author);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
      }, {});
  }
}
