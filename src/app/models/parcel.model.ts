export interface Parcel {
  id: string;
  trackingNumber: string;
  senderId: string;
  senderName: string;
  senderAddress: Address;
  senderPhone: string;
  senderEmail: string;
  recipientId: string;
  recipientName: string;
  recipientAddress: Address;
  recipientPhone: string;
  recipientEmail: string;
  packageDetails: PackageDetails;
  status: ParcelStatus;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  createdDate: Date;
  updatedDate: Date;
  deliveryInstructions?: string;
  notes?: string;
  cost: number;
  paymentStatus: PaymentStatus;
  trackingHistory: TrackingEvent[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PackageDetails {
  weight: number;
  dimensions: Dimensions;
  packageType: PackageType;
  description: string;
  value: number;
  isFragile: boolean;
  requiresSignature: boolean;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inch';
}

export interface TrackingEvent {
  id: string;
  timestamp: Date;
  status: ParcelStatus;
  location: string;
  description: string;
  updatedBy: string;
}

export enum ParcelStatus {
  PENDING = 'pending',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  FAILED_DELIVERY = 'failed_delivery',
  RETURNED = 'returned',
  CANCELLED = 'cancelled'
}

export enum PackageType {
  ENVELOPE = 'envelope',
  SMALL_BOX = 'small_box',
  MEDIUM_BOX = 'medium_box',
  LARGE_BOX = 'large_box',
  CUSTOM = 'custom'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface CreateParcelRequest {
  senderName: string;
  senderAddress: Address;
  senderPhone: string;
  senderEmail: string;
  recipientName: string;
  recipientAddress: Address;
  recipientPhone: string;
  recipientEmail: string;
  packageDetails: PackageDetails;
  deliveryInstructions?: string;
}

export interface UpdateParcelStatusRequest {
  parcelId: string;
  status: ParcelStatus;
  location: string;
  description: string;
  updatedBy: string;
}