import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  providers: [DatePipe]
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  
  chartColors = ['#00CED1', '#1E90FF', '#FFA500', '#FF4560', '#775DD0', '#38C172'];
  
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = [...this.users];
        this.calculatePagination();
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e.message);
        this.isLoading = false;
      }
    });
  }


  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true;
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          this.users = response;
          this.filterUsers();
          this.isLoading = false;
        },
        error: (e) => {
          console.error(e.message);
          this.isLoading = false;
        }
      });
    }
  }


  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.userId.toString().includes(term)
      );
    }
    this.calculatePagination();
    this.currentPage = 1; 
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (this.totalPages === 0) this.totalPages = 1;
  }

  getActiveUsers(): number {
    return this.users.filter(user => !user.isDeleted).length;
  }

  getInactiveUsers(): number {
    return this.users.filter(user => user.isDeleted).length;
  }

  formatDate(date: string | Date): string {
    if (!date) return 'N/A';
    return this.datePipe.transform(date, 'MMM d, yyyy') || 'N/A';
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getCurrentPageItems(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }
}

