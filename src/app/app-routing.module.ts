import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ParcelListComponent } from './components/parcels/parcel-list/parcel-list.component';
import { ParcelDetailsComponent } from './components/parcels/parcel-details/parcel-details.component';
import { CreateParcelComponent } from './components/parcels/create-parcel/create-parcel.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tracking', component: TrackingComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'parcels', 
    component: ParcelListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'parcels/create', 
    component: CreateParcelComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'parcels/:id', 
    component: ParcelDetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }