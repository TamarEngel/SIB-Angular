import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ChallengeManagementComponent } from '../components/challenge-management/challenge-management.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';
import { AdminGraghComponent } from '../components/admin-gragh/admin-gragh.component';
import { AuthGuard } from '../guards/auth.guard';
import { HeaderComponent } from '../components/header/header.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: 'home2', component: HeaderComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'callenges', component: ChallengeManagementComponent,canActivate: [AuthGuard]},
    { path: 'userManagement', component: UserManagementComponent,canActivate: [AuthGuard]},
    { path: 'adminGraghs', component: AdminGraghComponent,canActivate: [AuthGuard]},
];
