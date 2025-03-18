import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ChallengeManagementComponent } from '../components/challenge-management/challenge-management.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent, },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'callenges', component: ChallengeManagementComponent},
    { path: 'userManagement', component: UserManagementComponent},
    // { path: 'myCourses', component: MyCoursesComponent ,canActivate:[authGuard]},
];
