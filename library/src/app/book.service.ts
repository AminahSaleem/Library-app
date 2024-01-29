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
    //save the updated array of books back to local storage 
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
    const acc: { [key: string]: number } = {};
    // the key is a string and sets the value as a number 
     this.getBooks().forEach((book) => {
      //iterates through each book using getbook method
      const key = book.title + book.author;
      //creates a key by concatenating thr title and author
      acc[key] = (acc[key] || 0) + 1;
     // uses the key to access the correspronding property in the accumulator object if it exists use current value and add 1 if not then use 0 (thus getting 1)
      });
      return acc;
      //returns final accumulator object 
  }

  updateBook(updatedBook: any): void {
    const books = this.getBooks();
    //calls the getbook method
    const index = books.findIndex(book => book.id === updatedBook.id);
    //findIndex method locates the book that matches the id of the updated book
    if (index !== -1) {
      //if index is not euqal to -1 then n id has matched in the array
      books[index] = updatedBook;
      //replaces the book at the found index with the updated book
      localStorage.setItem(this.storageKey, JSON.stringify(books));
      // updates locals storage with the modified array of books 
    }
  }
}
