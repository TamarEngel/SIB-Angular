import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ChallengeManagementComponent } from '../components/challenge-management/challenge-management.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';
import { AdminGraghComponent } from '../components/admin-gragh/admin-gragh.component';
import { HeaderComponent } from '../components/header/header.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: HeaderComponent, },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'callenges', component: ChallengeManagementComponent},
    { path: 'userManagement', component: UserManagementComponent},
    { path: 'adminGraghs', component: AdminGraghComponent},
    // { path: 'myCourses', component: MyCoursesComponent ,canActivate:[authGuard]},
];
