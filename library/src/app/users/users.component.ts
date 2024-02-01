import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { GuidId } from '../library/guid-id';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
  // userForm: FormControl;

  ngOnInit(): void {
    this.userForm;
    this.addUser();
  }

  constructor(private userService: UserService) {}
  

  userForm = new FormGroup({
    id: new FormControl (''),
    title: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  addUser(): void {
    const newUser= {
      id: new GuidId().id,
      title: this.userForm.value.title,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName, 
    }
    const user = this.userForm.value;
    this.userService.addUser(newUser);
    this.userForm.reset();
  }
}
