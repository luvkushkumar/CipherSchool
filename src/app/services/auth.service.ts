import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User, UserRole, LoginRequest, LoginResponse, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Mock users for demonstration
  private mockUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@pms.com',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: UserRole.ADMIN,
      isActive: true,
      createdDate: new Date(),
      lastLoginDate: new Date(),
      profile: {
        preferences: {
          notifications: {
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: true,
            parcelUpdates: true,
            promotionalEmails: false
          },
          language: 'en',
          theme: 'light'
        }
      }
    },
    {
      id: '2',
      username: 'customer',
      email: 'customer@email.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      role: UserRole.CUSTOMER,
      isActive: true,
      createdDate: new Date(),
      lastLoginDate: new Date(),
      profile: {
        preferences: {
          notifications: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            parcelUpdates: true,
            promotionalEmails: true
          },
          language: 'en',
          theme: 'light'
        }
      }
    }
  ];

  constructor() {
    // Check if user is logged in on service initialization
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // Mock authentication - in real app, this would call an API
    const user = this.mockUsers.find(u => 
      u.username === loginRequest.username || u.email === loginRequest.username
    );

    if (!user) {
      return throwError(() => new Error('User not found'));
    }

    // Mock password validation (in real app, password would be hashed and verified server-side)
    const mockPassword = user.role === UserRole.ADMIN ? 'admin123' : 'password123';
    if (loginRequest.password !== mockPassword) {
      return throwError(() => new Error('Invalid password'));
    }

    const loginResponse: LoginResponse = {
      user: user,
      token: 'mock-jwt-token-' + user.id,
      refreshToken: 'mock-refresh-token-' + user.id,
      expiresIn: 3600 // 1 hour
    };

    return of(loginResponse).pipe(
      delay(1000), // Simulate API delay
      tap(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('authToken', response.token);
        this.currentUserSubject.next(response.user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<User> {
    // Mock registration - in real app, this would call an API
    if (this.mockUsers.some(u => u.username === registerRequest.username || u.email === registerRequest.email)) {
      return throwError(() => new Error('User already exists'));
    }

    const newUser: User = {
      id: (this.mockUsers.length + 1).toString(),
      username: registerRequest.username,
      email: registerRequest.email,
      firstName: registerRequest.firstName,
      lastName: registerRequest.lastName,
      phone: registerRequest.phone,
      role: registerRequest.role || UserRole.CUSTOMER,
      isActive: true,
      createdDate: new Date(),
      profile: {
        preferences: {
          notifications: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            parcelUpdates: true,
            promotionalEmails: false
          },
          language: 'en',
          theme: 'light'
        }
      }
    };

    return of(newUser).pipe(
      delay(1000),
      tap(user => {
        this.mockUsers.push(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === UserRole.ADMIN;
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === UserRole.CUSTOMER;
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  refreshToken(): Observable<string> {
    // Mock token refresh
    const newToken = 'mock-refreshed-token-' + Date.now();
    localStorage.setItem('authToken', newToken);
    return of(newToken).pipe(delay(500));
  }
}