import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ParcelService } from '../../services/parcel.service';
import { User, UserRole } from '../../models/user.model';
import { Parcel, ParcelStatus } from '../../models/parcel.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  stats$: Observable<any>;
  recentParcels$: Observable<Parcel[]>;
  UserRole = UserRole;

  constructor(
    private authService: AuthService,
    private parcelService: ParcelService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.stats$ = this.parcelService.getParcelStats();
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser?.role === UserRole.CUSTOMER) {
      // For customers, show only their parcels
      this.recentParcels$ = this.parcelService.getParcelsBySender(currentUser.id);
    } else {
      // For admin and other roles, show all recent parcels
      this.recentParcels$ = this.parcelService.getAllParcels();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isCustomer(): boolean {
    return this.authService.isCustomer();
  }

  getStatusColor(status: ParcelStatus): string {
    switch (status) {
      case ParcelStatus.PENDING:
        return 'warn';
      case ParcelStatus.IN_TRANSIT:
      case ParcelStatus.PICKED_UP:
      case ParcelStatus.OUT_FOR_DELIVERY:
        return 'accent';
      case ParcelStatus.DELIVERED:
        return 'primary';
      default:
        return 'warn';
    }
  }

  getStatusIcon(status: ParcelStatus): string {
    switch (status) {
      case ParcelStatus.PENDING:
        return 'schedule';
      case ParcelStatus.PICKED_UP:
        return 'local_shipping';
      case ParcelStatus.IN_TRANSIT:
        return 'flight';
      case ParcelStatus.OUT_FOR_DELIVERY:
        return 'delivery_dining';
      case ParcelStatus.DELIVERED:
        return 'check_circle';
      case ParcelStatus.CANCELLED:
        return 'cancel';
      default:
        return 'help';
    }
  }
}