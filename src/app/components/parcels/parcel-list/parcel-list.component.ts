import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParcelService } from '../../../services/parcel.service';
import { AuthService } from '../../../services/auth.service';
import { Parcel, ParcelStatus } from '../../../models/parcel.model';
import { User, UserRole } from '../../../models/user.model';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.scss']
})
export class ParcelListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['trackingNumber', 'sender', 'recipient', 'destination', 'status', 'estimatedDelivery', 'actions'];
  dataSource = new MatTableDataSource<Parcel>();
  currentUser$: Observable<User | null>;
  isLoading = true;
  selectedStatus = '';
  searchTerm = '';

  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: ParcelStatus.PENDING, label: 'Pending' },
    { value: ParcelStatus.PICKED_UP, label: 'Picked Up' },
    { value: ParcelStatus.IN_TRANSIT, label: 'In Transit' },
    { value: ParcelStatus.OUT_FOR_DELIVERY, label: 'Out for Delivery' },
    { value: ParcelStatus.DELIVERED, label: 'Delivered' },
    { value: ParcelStatus.CANCELLED, label: 'Cancelled' }
  ];

  constructor(
    private parcelService: ParcelService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.loadParcels();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Custom filter for the data source
    this.dataSource.filterPredicate = (data: Parcel, filter: string) => {
      const searchStr = (
        data.trackingNumber +
        data.senderName +
        data.recipientName +
        data.recipientAddress.city +
        data.status
      ).toLowerCase();
      return searchStr.includes(filter);
    };
  }

  loadParcels(): void {
    this.isLoading = true;
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser?.role === UserRole.CUSTOMER) {
      // For customers, show only their parcels
      this.parcelService.getParcelsBySender(currentUser.id).subscribe({
        next: (parcels) => {
          this.dataSource.data = parcels;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading parcels:', error);
          this.isLoading = false;
        }
      });
    } else {
      // For admin and other roles, show all parcels
      this.parcelService.getAllParcels().subscribe({
        next: (parcels) => {
          this.dataSource.data = parcels;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading parcels:', error);
          this.isLoading = false;
        }
      });
    }
  }

  applyFilter(): void {
    let filteredData = [...this.dataSource.data];
    
    // Filter by status
    if (this.selectedStatus) {
      filteredData = filteredData.filter(parcel => parcel.status === this.selectedStatus);
    }
    
    // Filter by search term
    if (this.searchTerm) {
      const searchStr = this.searchTerm.toLowerCase();
      filteredData = filteredData.filter(parcel => {
        const searchableText = (
          parcel.trackingNumber +
          parcel.senderName +
          parcel.recipientName +
          parcel.recipientAddress.city +
          parcel.status
        ).toLowerCase();
        return searchableText.includes(searchStr);
      });
    }
    
    this.dataSource.data = filteredData;
  }

  onStatusFilterChange(): void {
    this.applyFilter();
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  clearFilters(): void {
    this.selectedStatus = '';
    this.searchTerm = '';
    this.loadParcels();
  }

  viewParcel(parcelId: string): void {
    this.router.navigate(['/parcels', parcelId]);
  }

  createParcel(): void {
    this.router.navigate(['/parcels/create']);
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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isCustomer(): boolean {
    return this.authService.isCustomer();
  }
}