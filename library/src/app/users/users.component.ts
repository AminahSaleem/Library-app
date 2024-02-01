import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { GuidId } from '../library/guid-id';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
  // userForm: FormControl;
  users: User[] = [];

  ngOnInit(): void {
    this.userForm;
    this.getAllUsers();
  }

  constructor(private userService: UserService) {}
  

  userForm = new FormGroup({
    id: new FormControl (''),
    title: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  addUser(): void {
    const newUser: User = {
      id: new GuidId().id,
      title: this.userForm.value.title || '',
      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '', 
    }
    this.userService.addUser(newUser);
    this.userForm.reset();
    window.location.reload();
  }

  getAllUsers(): void {
    this.users = this.userService.getUsers();
  }
}
