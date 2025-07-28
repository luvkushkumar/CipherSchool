import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParcelService } from '../../services/parcel.service';
import { Parcel, ParcelStatus } from '../../models/parcel.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  trackingForm: FormGroup;
  parcel: Parcel | null = null;
  isLoading = false;
  notFound = false;

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService
  ) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.pattern(/^PMS\d{9}$/)]]
    });
  }

  ngOnInit(): void {}

  onTrack(): void {
    if (this.trackingForm.valid) {
      this.isLoading = true;
      this.notFound = false;
      this.parcel = null;

      const trackingNumber = this.trackingForm.value.trackingNumber;

      this.parcelService.getParcelByTrackingNumber(trackingNumber).subscribe({
        next: (parcel) => {
          this.isLoading = false;
          if (parcel) {
            this.parcel = parcel;
          } else {
            this.notFound = true;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.notFound = true;
        }
      });
    }
  }

  getStatusColor(status: ParcelStatus): string {
    switch (status) {
      case ParcelStatus.PENDING:
        return '#ff9800';
      case ParcelStatus.PICKED_UP:
      case ParcelStatus.IN_TRANSIT:
      case ParcelStatus.OUT_FOR_DELIVERY:
        return '#2196f3';
      case ParcelStatus.DELIVERED:
        return '#4caf50';
      case ParcelStatus.CANCELLED:
      case ParcelStatus.FAILED_DELIVERY:
        return '#f44336';
      default:
        return '#9e9e9e';
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
      case ParcelStatus.FAILED_DELIVERY:
        return 'error';
      default:
        return 'help';
    }
  }

  getProgressPercentage(status: ParcelStatus): number {
    switch (status) {
      case ParcelStatus.PENDING:
        return 20;
      case ParcelStatus.PICKED_UP:
        return 40;
      case ParcelStatus.IN_TRANSIT:
        return 60;
      case ParcelStatus.OUT_FOR_DELIVERY:
        return 80;
      case ParcelStatus.DELIVERED:
        return 100;
      default:
        return 0;
    }
  }

  clearResults(): void {
    this.parcel = null;
    this.notFound = false;
    this.trackingForm.reset();
  }
}