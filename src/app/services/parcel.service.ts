import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { 
  Parcel, 
  ParcelStatus, 
  PackageType, 
  PaymentStatus, 
  CreateParcelRequest, 
  UpdateParcelStatusRequest,
  TrackingEvent 
} from '../models/parcel.model';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private parcelsSubject = new BehaviorSubject<Parcel[]>([]);
  public parcels$ = this.parcelsSubject.asObservable();

  // Mock data for demonstration
  private mockParcels: Parcel[] = [
    {
      id: '1',
      trackingNumber: 'PMS001234567',
      senderId: '2',
      senderName: 'John Doe',
      senderAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      },
      senderPhone: '+1234567891',
      senderEmail: 'john.doe@email.com',
      recipientId: '3',
      recipientName: 'Jane Smith',
      recipientAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'USA'
      },
      recipientPhone: '+1987654321',
      recipientEmail: 'jane.smith@email.com',
      packageDetails: {
        weight: 2.5,
        dimensions: {
          length: 20,
          width: 15,
          height: 10,
          unit: 'cm'
        },
        packageType: PackageType.SMALL_BOX,
        description: 'Electronics - Smartphone',
        value: 599.99,
        isFragile: true,
        requiresSignature: true
      },
      status: ParcelStatus.IN_TRANSIT,
      estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      createdDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      updatedDate: new Date(),
      deliveryInstructions: 'Leave at front door if no answer',
      cost: 15.99,
      paymentStatus: PaymentStatus.PAID,
      trackingHistory: [
        {
          id: '1',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: ParcelStatus.PENDING,
          location: 'New York, NY',
          description: 'Parcel created and awaiting pickup',
          updatedBy: 'System'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
          status: ParcelStatus.PICKED_UP,
          location: 'New York, NY',
          description: 'Parcel picked up from sender',
          updatedBy: 'Delivery Agent 001'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          status: ParcelStatus.IN_TRANSIT,
          location: 'Chicago, IL',
          description: 'Parcel in transit - arrived at sorting facility',
          updatedBy: 'System'
        }
      ]
    },
    {
      id: '2',
      trackingNumber: 'PMS001234568',
      senderId: '2',
      senderName: 'John Doe',
      senderAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      },
      senderPhone: '+1234567891',
      senderEmail: 'john.doe@email.com',
      recipientId: '4',
      recipientName: 'Bob Johnson',
      recipientAddress: {
        street: '789 Pine St',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA'
      },
      recipientPhone: '+1555666777',
      recipientEmail: 'bob.johnson@email.com',
      packageDetails: {
        weight: 0.5,
        dimensions: {
          length: 25,
          width: 18,
          height: 2,
          unit: 'cm'
        },
        packageType: PackageType.ENVELOPE,
        description: 'Documents',
        value: 0,
        isFragile: false,
        requiresSignature: false
      },
      status: ParcelStatus.DELIVERED,
      estimatedDeliveryDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      actualDeliveryDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      cost: 8.99,
      paymentStatus: PaymentStatus.PAID,
      trackingHistory: [
        {
          id: '4',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: ParcelStatus.PENDING,
          location: 'New York, NY',
          description: 'Parcel created and awaiting pickup',
          updatedBy: 'System'
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: ParcelStatus.PICKED_UP,
          location: 'New York, NY',
          description: 'Parcel picked up from sender',
          updatedBy: 'Delivery Agent 002'
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
          status: ParcelStatus.IN_TRANSIT,
          location: 'Denver, CO',
          description: 'Parcel in transit',
          updatedBy: 'System'
        },
        {
          id: '7',
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
          status: ParcelStatus.OUT_FOR_DELIVERY,
          location: 'Seattle, WA',
          description: 'Out for delivery',
          updatedBy: 'Delivery Agent 003'
        },
        {
          id: '8',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          status: ParcelStatus.DELIVERED,
          location: 'Seattle, WA',
          description: 'Package delivered successfully',
          updatedBy: 'Delivery Agent 003'
        }
      ]
    }
  ];

  constructor() {
    this.parcelsSubject.next(this.mockParcels);
  }

  getAllParcels(): Observable<Parcel[]> {
    return this.parcels$.pipe(delay(500));
  }

  getParcelById(id: string): Observable<Parcel | null> {
    return this.parcels$.pipe(
      delay(300),
      map(parcels => parcels.find(p => p.id === id) || null)
    );
  }

  getParcelByTrackingNumber(trackingNumber: string): Observable<Parcel | null> {
    return this.parcels$.pipe(
      delay(300),
      map(parcels => parcels.find(p => p.trackingNumber === trackingNumber) || null)
    );
  }

  getParcelsBySender(senderId: string): Observable<Parcel[]> {
    return this.parcels$.pipe(
      delay(300),
      map(parcels => parcels.filter(p => p.senderId === senderId))
    );
  }

  getParcelsByRecipient(recipientId: string): Observable<Parcel[]> {
    return this.parcels$.pipe(
      delay(300),
      map(parcels => parcels.filter(p => p.recipientId === recipientId))
    );
  }

  getParcelsByStatus(status: ParcelStatus): Observable<Parcel[]> {
    return this.parcels$.pipe(
      delay(300),
      map(parcels => parcels.filter(p => p.status === status))
    );
  }

  createParcel(request: CreateParcelRequest): Observable<Parcel> {
    const newParcel: Parcel = {
      id: (this.mockParcels.length + 1).toString(),
      trackingNumber: this.generateTrackingNumber(),
      senderId: '2', // Mock sender ID
      senderName: request.senderName,
      senderAddress: request.senderAddress,
      senderPhone: request.senderPhone,
      senderEmail: request.senderEmail,
      recipientId: Math.random().toString(36).substr(2, 9),
      recipientName: request.recipientName,
      recipientAddress: request.recipientAddress,
      recipientPhone: request.recipientPhone,
      recipientEmail: request.recipientEmail,
      packageDetails: request.packageDetails,
      status: ParcelStatus.PENDING,
      estimatedDeliveryDate: this.calculateEstimatedDeliveryDate(),
      createdDate: new Date(),
      updatedDate: new Date(),
      deliveryInstructions: request.deliveryInstructions,
      cost: this.calculateCost(request.packageDetails),
      paymentStatus: PaymentStatus.PENDING,
      trackingHistory: [{
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        status: ParcelStatus.PENDING,
        location: `${request.senderAddress.city}, ${request.senderAddress.state}`,
        description: 'Parcel created and awaiting pickup',
        updatedBy: 'System'
      }]
    };

    return of(newParcel).pipe(
      delay(1000),
      tap(parcel => {
        this.mockParcels.push(parcel);
        this.parcelsSubject.next([...this.mockParcels]);
      })
    );
  }

  updateParcelStatus(request: UpdateParcelStatusRequest): Observable<Parcel> {
    const parcelIndex = this.mockParcels.findIndex(p => p.id === request.parcelId);
    
    if (parcelIndex === -1) {
      return throwError(() => new Error('Parcel not found'));
    }

    const parcel = { ...this.mockParcels[parcelIndex] };
    parcel.status = request.status;
    parcel.updatedDate = new Date();

    if (request.status === ParcelStatus.DELIVERED) {
      parcel.actualDeliveryDate = new Date();
    }

    const trackingEvent: TrackingEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      status: request.status,
      location: request.location,
      description: request.description,
      updatedBy: request.updatedBy
    };

    parcel.trackingHistory = [...parcel.trackingHistory, trackingEvent];

    return of(parcel).pipe(
      delay(500),
      tap(updatedParcel => {
        this.mockParcels[parcelIndex] = updatedParcel;
        this.parcelsSubject.next([...this.mockParcels]);
      })
    );
  }

  deleteParcel(id: string): Observable<boolean> {
    const parcelIndex = this.mockParcels.findIndex(p => p.id === id);
    
    if (parcelIndex === -1) {
      return throwError(() => new Error('Parcel not found'));
    }

    return of(true).pipe(
      delay(500),
      tap(() => {
        this.mockParcels.splice(parcelIndex, 1);
        this.parcelsSubject.next([...this.mockParcels]);
      })
    );
  }

  getParcelStats(): Observable<any> {
    return this.parcels$.pipe(
      delay(300),
      map(parcels => {
        const stats = {
          total: parcels.length,
          pending: parcels.filter(p => p.status === ParcelStatus.PENDING).length,
          inTransit: parcels.filter(p => p.status === ParcelStatus.IN_TRANSIT).length,
          delivered: parcels.filter(p => p.status === ParcelStatus.DELIVERED).length,
          cancelled: parcels.filter(p => p.status === ParcelStatus.CANCELLED).length,
          totalRevenue: parcels.reduce((sum, p) => sum + p.cost, 0)
        };
        return stats;
      })
    );
  }

  private generateTrackingNumber(): string {
    const prefix = 'PMS';
    const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    return prefix + number;
  }

  private calculateEstimatedDeliveryDate(): Date {
    const daysToAdd = Math.floor(Math.random() * 5) + 1; // 1-5 days
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);
    return estimatedDate;
  }

  private calculateCost(packageDetails: any): number {
    let baseCost = 5.99;
    
    // Add cost based on weight
    baseCost += packageDetails.weight * 2;
    
    // Add cost based on package type
    switch (packageDetails.packageType) {
      case PackageType.ENVELOPE:
        baseCost += 0;
        break;
      case PackageType.SMALL_BOX:
        baseCost += 3;
        break;
      case PackageType.MEDIUM_BOX:
        baseCost += 6;
        break;
      case PackageType.LARGE_BOX:
        baseCost += 10;
        break;
      default:
        baseCost += 5;
    }
    
    // Add extra cost for fragile items
    if (packageDetails.isFragile) {
      baseCost += 5;
    }
    
    // Add extra cost for signature requirement
    if (packageDetails.requiresSignature) {
      baseCost += 3;
    }
    
    return Math.round(baseCost * 100) / 100; // Round to 2 decimal places
  }
}