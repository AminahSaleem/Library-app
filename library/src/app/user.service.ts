import { Injectable } from '@angular/core';

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

  getUserById(id: string): void {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }
}
