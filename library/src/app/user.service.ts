import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'users';

  constructor() { }

  getUsers(): any[] {
    const storedUsers = localStorage.getItem(this.userKey);
    return storedUsers ? JSON.parse(storedUsers): [];
  }

  addUser(user: any): void {
    const users = this.getUsers();
    users.push(user)
    localStorage.setItem(this.userKey, JSON.stringify(users));
  }

  getUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1){
    users[index]= updatedUser;
    localStorage.setItem(this.userKey, JSON.stringify(users))
    }
  }
}

