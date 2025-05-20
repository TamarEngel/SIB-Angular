// import { Component, OnInit } from '@angular/core';
// import { Challenge } from '../../models/challenge';
// import { ChallengeService } from '../../services/challenge/challenge.service';
// import { MatCardModule } from '@angular/material/card';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-challenge-management',
//   standalone: true,
//   imports: [MatCardModule, MatExpansionModule],
//   templateUrl: './challenge-management.component.html',
//   styleUrl: './challenge-management.component.css'
// })
// export class ChallengeManagementComponent implements OnInit{

//   challengs: Challenge[] = [];

//   constructor(private challengeService:ChallengeService,public dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.loadChallengs();
//   }

//   loadChallengs() {
//     this.challengeService.getChallenges().subscribe({
//       next: (response) => { this.challengs = response},
//       error: (e) => { console.error(e.messege) }
//     })
//   }

//   openAddCourseDialog() {
//     const dialogRef = this.dialog.open(AddChallengeComponent, {});

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.challengeService.addChallenge(result).subscribe({
//         next: (response) => { alert('✅' + response.message), this.loadChallengs() },
//         error: (e) => { console.error('❌ ERROR:', e); alert('❌ ERROR: ' + (e.error?.message || 'משהו השתבש')); }
//       })
//       }
//     });
//   }

  
// }


// challenge-management.component.ts
import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../models/challenge';
import { ChallengeService } from '../../services/challenge/challenge.service';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenge-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './challenge-management.component.html',
  styleUrl: './challenge-management.component.scss'
})
export class ChallengeManagementComponent implements OnInit {
  chartColors = ['#00CED1', '#1E90FF', '#FFA500', '#FF4560', '#775DD0', '#38C172'];
  challengs: Challenge[] = [];
  filteredChallenges: Challenge[] = [];
  expandedChallenge: number | null = null;
  searchTerm: string = '';
  sidebarOpen = true;

  constructor(private challengeService: ChallengeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadChallengs();
  }

  loadChallengs() {
    this.challengeService.getChallenges().subscribe({
      next: (response) => { 
        this.challengs = response; 
       this.filterChallenges();
      },
      error: (e) => { console.error(e.message) }
    });
  }

  filterChallenges() {
    if (!this.searchTerm) {
      this.filteredChallenges = [...this.challengs];
      return;
    }
    
    this.filteredChallenges = this.challengs.filter(challenge => 
      challenge.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleExpand(id: number) {
    this.expandedChallenge = this.expandedChallenge === id ? null : id;
  }

  openAddChallengeDialog() {
    const dialogRef = this.dialog.open(AddChallengeComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.challengeService.addChallenge(result).subscribe({
          next: (response) => { 
            alert('✅' + response.message);
            this.loadChallengs();
          },
          error: (e) => { 
            console.error('❌ ERROR:', e); 
            alert('❌ ERROR: ' + (e.error?.message || 'משהו השתבש')); 
          }
        });
      }
    });
  }

  getCompletionRate(challenge: Challenge): number {
    // This is a placeholder. You can implement your own logic to calculate completion rate
    return Math.round((challenge.countCreations / (challenge.countCreations + 50)) * 100);
  }

 

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}