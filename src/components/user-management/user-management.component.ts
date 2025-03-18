import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  users: User[] = [];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => { this.users = response},
      error: (e) => { console.error(e.messege) }
    })
  }

  deleteUser(userId:number){
    this.userService.deleteUser(userId).subscribe({
      next: (response) => { this.users = response,this.loadUsers();},
      error: (e) => { console.error(e.messege) }
    })
  }
}
