import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../models/challenge';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-challenge-management',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule],
  templateUrl: './challenge-management.component.html',
  styleUrl: './challenge-management.component.css'
})
export class ChallengeManagementComponent implements OnInit{

  challengs: Challenge[] = [];

  constructor(private challengeService:ChallengeService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadChallengs();
  }

  loadChallengs() {
    this.challengeService.getChallenges().subscribe({
      next: (response) => { this.challengs = response},
      error: (e) => { console.error(e.messege) }
    })
  }

  openAddCourseDialog() {
    const dialogRef = this.dialog.open(AddChallengeComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.challengeService.addChallenge(result).subscribe({
        next: (response) => { alert('✅' + response.message), this.loadChallengs() },
        error: (e) => { console.error('❌ ERROR:', e); alert('❌ ERROR: ' + (e.error?.message || 'משהו השתבש')); }
      })
      }
    });
  }

  
}
