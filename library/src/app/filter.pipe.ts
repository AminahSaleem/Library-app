import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], keys: string, term: string ) {
    // value is the array of objects you want to filter, keys is a string representing the keys on which the filtering should be performed
    //term is the search term that that is used to filter the array
    if(!term) return value;
    //checks if search is falsy and if it is original array is returned
    return (value || []).filter(book => keys.split(',').some(key => book.hasOwnProperty(key) && new RegExp(term, 'gi').test(book[key])))
    // value || [] if value is undefined or null it is treated as an empty array
    // .filter(book uses filter method to create a new array containing only elements that meet the specified conditions
    //keys.split(','), splits the key string into an array of individual keys 
    // some(key =>, checks if atleast one of the key satisfies the condition of book.hasOwnProperty(key) which ensures that the current objet  has the specified key
    // new RegExp(term, 'gi').test(book[key] performs a case insensitive global search on the value of the specified key.
  }

}
