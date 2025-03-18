import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule],
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent {
  title: string = '';
  description: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddChallengeComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any 
  ){}

  onSubmit(): void {
    const challengeData = {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.dialogRef.close(challengeData); // סגירת הדיאלוג עם נתוני הקורס
  }

  Close(): void {
    this.dialogRef.close();
  }
}
