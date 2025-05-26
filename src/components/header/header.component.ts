import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ChallengeService } from '../../services/challenge/challenge.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  chartColors = ['#00CED1', '#1E90FF', '#FFA500', '#FF4560', '#775DD0', '#38C172'];
  sidebarOpen = true;

  constructor(private challengeService: ChallengeService, private authService: AuthService, private router: Router) { }

  getFromLocalStorageStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  logOut(){
    this.authService.Logout()
    this.router.navigate(['/home']);
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
