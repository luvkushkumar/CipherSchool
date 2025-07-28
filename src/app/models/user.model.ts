export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdDate: Date;
  lastLoginDate?: Date;
  profile: UserProfile;
}

export interface UserProfile {
  address?: Address;
  dateOfBirth?: Date;
  avatar?: string;
  preferences: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  language: string;
  theme: 'light' | 'dark';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  parcelUpdates: boolean;
  promotionalEmails: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  DELIVERY_AGENT = 'delivery_agent',
  MANAGER = 'manager'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  role?: UserRole;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address?: Address;
  preferences: UserPreferences;
}