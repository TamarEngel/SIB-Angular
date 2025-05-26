import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-challenge-dialog',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogTitle,
    MatDialogContent,
  ],
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
  ){}

  onSubmit(form: any): void {
    if (!form.valid) return;
    const challengeData = {
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.dialogRef.close(challengeData); 
  }

  Close(): void {
    this.dialogRef.close();
  }
}