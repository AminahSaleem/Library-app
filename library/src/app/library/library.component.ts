import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {

  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    year: new FormControl(''),
    description: new FormControl('')
  })

}
