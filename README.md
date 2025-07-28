# Parcel Management System (PMS)

A comprehensive Angular-based Parcel Management System that efficiently handles the complete parcel lifecycle — including booking, tracking, delivery status updates, and customer communication. The system streamlines operations for courier service agencies and provides role-based access to Admins and Customers.

## 🚀 Features

### Core Functionality
- **Parcel Booking & Management**: Create, update, and manage parcel shipments
- **Real-time Tracking**: Track packages with detailed status updates and location information
- **Role-based Access Control**: Different interfaces for Admins and Customers
- **Responsive Design**: Modern, mobile-friendly interface using Angular Material
- **Dashboard Analytics**: Comprehensive statistics and reports
- **Status Management**: Complete parcel lifecycle tracking from booking to delivery

### User Roles & Access

#### Admin Features
- View all parcels in the system
- Create new parcels
- Update parcel status and tracking information
- Access comprehensive dashboard with statistics
- View revenue and performance metrics
- Manage customer communications

#### Customer Features
- View only their own parcels
- Track packages by tracking number
- Access personal dashboard
- View delivery history and status updates
- Public package tracking (no login required)

### Technical Features
- **Angular 17**: Latest Angular framework with standalone components
- **Angular Material**: Modern, accessible UI components
- **TypeScript**: Strong typing for better development experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Mock Services**: Realistic data simulation for demonstration
- **Form Validation**: Comprehensive client-side validation
- **Route Guards**: Protected routes based on authentication and authorization

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/              # User authentication
│   │   │   └── register/           # User registration
│   │   ├── dashboard/              # Main dashboard
│   │   ├── layout/
│   │   │   └── navigation/         # App navigation header
│   │   ├── parcels/
│   │   │   ├── parcel-list/        # List all parcels
│   │   │   ├── parcel-details/     # Parcel details view
│   │   │   └── create-parcel/      # Create new parcel
│   │   └── tracking/               # Public tracking interface
│   ├── guards/
│   │   ├── auth.guard.ts           # Authentication guard
│   │   └── admin.guard.ts          # Admin access guard
│   ├── models/
│   │   ├── parcel.model.ts         # Parcel data models
│   │   └── user.model.ts           # User data models
│   ├── services/
│   │   ├── auth.service.ts         # Authentication service
│   │   └── parcel.service.ts       # Parcel management service
│   ├── app.component.*             # Root component
│   ├── app.module.ts               # App module
│   └── app-routing.module.ts       # Routing configuration
├── styles.scss                    # Global styles
└── index.html                     # Main HTML file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v17 or higher)

### Installation Steps

1. **Clone or download the project files**
   ```bash
   # If you have the project files, navigate to the project directory
   cd parcel-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Angular Material (if needed)**
   ```bash
   ng add @angular/material
   ```

4. **Start the development server**
   ```bash
   ng serve
   # or
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:4200`

## 🔐 Demo Accounts

The system comes with pre-configured demo accounts for testing:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full system access, all parcels, analytics

### Customer Account
- **Username**: `customer`
- **Password**: `password123`
- **Access**: Personal parcels only, limited dashboard

## 📱 Usage Guide

### For Customers

1. **Login**: Use the customer demo account or register a new account
2. **Dashboard**: View your parcel statistics and recent shipments
3. **Track Package**: Use the tracking feature with tracking numbers like `PMS001234567`
4. **View Parcels**: Access your complete parcel history

### For Admins

1. **Login**: Use the admin demo account
2. **Dashboard**: Access comprehensive system analytics
3. **Manage Parcels**: View, create, and update all parcels in the system
4. **Create Parcel**: Add new parcels to the system
5. **Update Status**: Modify parcel status and tracking information

### Public Tracking

- Navigate to `/tracking` (accessible without login)
- Enter a tracking number (e.g., `PMS001234567` or `PMS001234568`)
- View real-time tracking information

## 🎯 Key Components

### Authentication System
- JWT-based authentication simulation
- Role-based access control
- Protected routes and navigation

### Parcel Management
- Complete CRUD operations for parcels
- Status tracking with timeline
- Cost calculation based on package details
- Delivery estimation

### Tracking System
- Real-time status updates
- Location-based tracking
- Detailed tracking history
- Progress visualization

### Dashboard Analytics
- Parcel statistics by status
- Revenue tracking (admin only)
- Performance metrics
- Quick action cards

## 🔧 Development

### Build for Production
```bash
ng build --prod
```

### Run Tests
```bash
ng test
```

### Code Linting
```bash
ng lint
```

## 🎨 Customization

### Styling
- Global styles are in `src/styles.scss`
- Component-specific styles in each component's `.scss` file
- Angular Material theme can be customized in `src/styles.scss`

### Data Models
- Modify `src/app/models/` for different data structures
- Update services in `src/app/services/` for API integration
- Customize mock data in service files

### Adding Features
- Create new components using `ng generate component`
- Add routes in `app-routing.module.ts`
- Implement new services for additional functionality

## 🌟 Features Highlights

### Modern UI/UX
- Material Design principles
- Responsive grid layouts
- Interactive data tables
- Progress indicators and loading states
- Smooth animations and transitions

### Business Logic
- Automatic tracking number generation
- Cost calculation based on package attributes
- Estimated delivery date calculation
- Status workflow management

### Security
- Route guards for access control
- Form validation and error handling
- XSS protection through Angular's built-in security

## 📄 License

This project is developed for educational and demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the browser console for error messages
- Ensure all dependencies are properly installed
- Verify Node.js and Angular CLI versions
- Clear browser cache if experiencing issues

---

**Happy Shipping with PMS! 📦**