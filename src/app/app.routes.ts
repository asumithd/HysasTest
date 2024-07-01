import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './gurds/auth.guard';
import { UserComponent } from './components/user/user.component';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { role: 'User' },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [];

export const routing = provideRouter(routes);
