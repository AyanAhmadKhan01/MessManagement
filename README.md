# Mess Management System

A full-stack web application for managing mess operations, including user attendance, meal planning, inventory, and user subscriptions. Built with Node.js (Express, MongoDB) for the backend and Next.js (React, Tailwind CSS) for the frontend.

## 🤝 Contributors

| Name            | Contributions                                                                 |
|-----------------|--------------------------------------------------------------------------------|
| **Anas Najam**  | Built the entire backend (APIs, DB models, routes), designed the **Admin Dashboard**, and created the **data flow diagrams (DFD & ER)** for system planning and documentation. |
| **Ayan Ahmad Khan** | Developed the **User Dashboard**, designed the **Landing Page** and handled **SEO**, **Authentication**, and **Deployment**. |

## Features

### User Features
- Mark daily meal attendance (breakfast, lunch, dinner)
- View personal attendance history on a calendar
- See today's menu and personal plan
- Secure authentication and role-based access

### Admin Features
- Manage users, plans, menus, and inventory
- Assign plans to users
- View and manage all attendance records

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT-based
- **State Management:** React Query

## Data Flow Diagram (DFD)

### Level 0 DFD (Context Diagram)
```
                    ┌─────────────────┐
                    │      USER       │
                    │   (Student/     │
                    │   Employee)     │
                    └─────────┬───────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        │        MESS MANAGEMENT SYSTEM           │
        │                                         │
        └─────────┬───────────────────┬───────────┘
                  │                   │
                  ▼                   ▼
        ┌─────────────────┐ ┌─────────────────┐
        │      ADMIN      │ │    DATABASE     │
        │   (Manager)     │ │   (MongoDB)     │
        └─────────────────┘ └─────────────────┘
```

### Level 1 DFD (System Overview)
```
┌─────────────┐    Login/Register    ┌──────────────────┐
│    USER     │◄────────────────────►│  1. AUTHENTICATION │
└─────────────┘                      │     PROCESS      │
       │                             └──────────────────┘
       │ Mark Attendance                       │ User Data
       ▼                                       ▼
┌──────────────────┐                 ┌─────────────────┐
│  2. ATTENDANCE   │◄────────────────│   USER STORE    │
│    MANAGEMENT    │  User Info      │   (Database)    │
└──────────────────┘                 └─────────────────┘
       │                                       ▲
       │ Attendance Data                       │
       ▼                                       │
┌─────────────────┐                           │
│ ATTENDANCE STORE│                           │
│   (Database)    │                           │
└─────────────────┘                           │
                                               │
┌─────────────┐    Manage Data       ┌──────────────────┐
│    ADMIN    │◄────────────────────►│  3. ADMIN        │
└─────────────┘                      │    MANAGEMENT    │
                                     └──────┬───────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
                    ▼                       ▼                       ▼
            ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
            │ PLAN STORE  │        │ MENU STORE  │        │INVENTORY    │
            │ (Database)  │        │ (Database)  │        │  STORE      │
            └─────────────┘        └─────────────┘        │(Database)   │
                                                          └─────────────┘
```

### Level 2 DFD (Detailed Processes)

#### 2.1 Attendance Management Process
```
┌─────────────┐    Meal Type & Time   ┌──────────────────────┐
│    USER     │──────────────────────►│  2.1 VALIDATE        │
└─────────────┘                       │   MEAL TIME          │
                                      └──────┬───────────────┘
                                             │ Valid Request
                                             ▼
                                    ┌──────────────────────┐
                                    │  2.2 MARK            │
                                    │   ATTENDANCE         │◄─── User ID
                                    └──────┬───────────────┘
                                           │ Attendance Record
                                           ▼
┌─────────────┐    Attendance History ┌──────────────────────┐
│    USER     │◄─────────────────────│  2.3 RETRIEVE        │
└─────────────┘                      │   ATTENDANCE         │
                                     └──────┬───────────────┘
                                            │ Query
                                            ▼
                                   ┌─────────────────┐
                                   │ ATTENDANCE STORE│
                                   │   (Database)    │
                                   └─────────────────┘
```

#### 2.2 Admin Management Process
```
┌─────────────┐     CRUD Operations    ┌──────────────────────┐
│    ADMIN    │──────────────────────►│  3.1 USER            │
└─────────────┘                       │   MANAGEMENT         │
      │                               └──────┬───────────────┘
      │                                      │ User Data
      │ Plan Operations                      ▼
      ▼                              ┌─────────────────┐
┌──────────────────────┐             │   USER STORE    │
│  3.2 PLAN            │             │   (Database)    │
│   MANAGEMENT         │             └─────────────────┘
└──────┬───────────────┘
       │ Plan Data
       ▼
┌─────────────────┐
│   PLAN STORE    │
│   (Database)    │
└─────────────────┘

┌─────────────┐     Menu Operations    ┌──────────────────────┐
│    ADMIN    │──────────────────────►│  3.3 MENU            │
└─────────────┘                       │   MANAGEMENT         │
      │                               └──────┬───────────────┘
      │                                      │ Menu Data
      │ Inventory Operations                 ▼
      ▼                              ┌─────────────────┐
┌──────────────────────┐             │   MENU STORE    │
│  3.4 INVENTORY       │             │   (Database)    │
│   MANAGEMENT         │             └─────────────────┘
└──────┬───────────────┘
       │ Inventory Data
       ▼
┌─────────────────┐
│ INVENTORY STORE │
│   (Database)    │
└─────────────────┘
```

### Data Stores
- **USER STORE**: User profiles, authentication data, roles
- **ATTENDANCE STORE**: Daily meal attendance records
- **PLAN STORE**: Subscription plans and user assignments
- **MENU STORE**: Daily meal menus and schedules
- **INVENTORY STORE**: Stock items and quantities

### External Entities
- **USER**: Students/Employees who mark attendance and view menus
- **ADMIN**: Managers who oversee mess operations and data

## Entity-Relationship (ER) Diagram

### ER Diagram
```
                    ┌─────────────────────────────────────┐
                    │               USER                  │
                    │─────────────────────────────────────│
                    │ userId (PK)                         │
                    │ name                                │
                    │ email (UNIQUE)                      │
                    │ mobileno                            │
                    │ role (0=Student, 1=Employee, 2=Admin)│
                    │ password                            │
                    │ cpassword                           │
                    │ profilePicture                      │
                    │ notificationPreferences             │
                    │ timestamps                          │
                    └─────────────┬───────────────────────┘
                                  │
                                  │ 1:M (subscribes to)
                                  │
                    ┌─────────────▼───────────────────────┐
                    │             USERPLAN                │
                    │─────────────────────────────────────│
                    │ _id (PK)                            │
                    │ userId (FK) ─────────────────────┐  │
                    │ planId (FK) ─────────────────┐   │  │
                    │ start_date                   │   │  │
                    │ end_date                     │   │  │
                    │ fees                         │   │  │
                    │ fee_status                   │   │  │
                    │ isavailable[]                │   │  │
                    │ timestamps                   │   │  │
                    └─────────────┬────────────────┘   │  │
                                  │                    │  │
                                  │                    │  │
                    ┌─────────────▼────────────────────┘  │
                    │             PLAN                    │
                    │─────────────────────────────────────│
                    │ planId (PK)                         │
                    │ plan_type                           │
                    │ plan_desc                           │
                    │ plan_price                          │
                    │ plan_duration                       │
                    │ max_users                           │
                    │ timestamps                          │
                    └─────────────────────────────────────┘
                                  
                    ┌─────────────────────────────────────┐
                    │           ATTENDANCE                │
                    │─────────────────────────────────────│
                    │ attendanceId (PK)                   │
                    │ userId (FK) ─────────────────────┐  │
                    │ date                             │  │
                    │ breakfast: {                     │  │
                    │   status (present/absent)        │  │
                    │   timestamp                      │  │
                    │ }                                │  │
                    │ lunch: {                         │  │
                    │   status (present/absent)        │  │
                    │   timestamp                      │  │
                    │ }                                │  │
                    │ dinner: {                        │  │
                    │   status (present/absent)        │  │
                    │   timestamp                      │  │
                    │ }                                │  │
                    │ timestamps                       │  │
                    └─────────────┬───────────────────────┘
                                  │
                                  │ M:1 (belongs to)
                                  │
                    ┌─────────────▲───────────────────────┐
                    │             USER                    │
                    │          (Reference)                │
                    └─────────────────────────────────────┘

                    ┌─────────────────────────────────────┐
                    │              MENU                   │
                    │─────────────────────────────────────│
                    │ menuId (PK)                         │
                    │ date                                │
                    │ breakfast: {                        │
                    │   name, description, price,         │
                    │   ingredients[], nutritional_info   │
                    │ }                                   │
                    │ lunch: {                            │
                    │   name, description, price,         │
                    │   ingredients[], nutritional_info   │
                    │ }                                   │
                    │ dinner: {                           │
                    │   name, description, price,         │
                    │   ingredients[], nutritional_info   │
                    │ }                                   │
                    │ is_special                          │
                    │ timestamps                          │
                    └─────────────────────────────────────┘

                    ┌─────────────────────────────────────┐
                    │            INVENTORY                │
                    │─────────────────────────────────────│
                    │ inventoryId (PK)                    │
                    │ name                                │
                    │ storeType                           │
                    │ qty                                 │
                    │ usedqty                             │
                    │ remainqty                           │
                    │ single_price                        │
                    │ date                                │
                    │ timestamps                          │
                    └─────────────────────────────────────┘
```

### Database Relationships

#### 1. **USER ──(1:M)──► USERPLAN**
- One user can have multiple subscription plans over time
- Foreign Key: `userId` in USERPLAN references `userId` in USER

#### 2. **PLAN ──(1:M)──► USERPLAN** 
- One plan can be assigned to multiple users
- Foreign Key: `planId` in USERPLAN references `planId` in PLAN

#### 3. **USER ──(1:M)──► ATTENDANCE**
- One user can have multiple attendance records
- Foreign Key: `userId` in ATTENDANCE references `userId` in USER
- Unique constraint: `userId + date` (one attendance record per user per day)

#### 4. **Independent Entities:**
- **MENU**: Standalone daily menu records
- **INVENTORY**: Standalone inventory management records

### Entity Descriptions

| Entity | Description | Key Attributes |
|--------|-------------|----------------|
| **USER** | System users (students, employees, admins) | userId, email, role, authentication data |
| **PLAN** | Subscription plans offered by mess | planId, plan_type, plan_price, duration |
| **USERPLAN** | Junction table linking users to their subscribed plans | userId (FK), planId (FK), dates, fees |
| **ATTENDANCE** | Daily meal attendance records | userId (FK), date, meal statuses & timestamps |
| **MENU** | Daily meal menus with nutritional info | menuId, date, meal details |
| **INVENTORY** | Stock management for mess supplies | inventoryId, quantities, prices |

### Key Constraints
- **Primary Keys**: Auto-incremented IDs for each entity
- **Foreign Keys**: Maintain referential integrity
- **Unique Constraints**: 
  - User email addresses
  - User-Date combination for attendance
- **Indexes**: On userId, date fields for performance

## Project Structure

```
MessManagement/
  backend/
    Controller/
    Models/
    Routes/
    config/
    database/
    index.js
    package.json
  frontend/
    src/
      app/
      components/
      hooks/
      services/
      utils/
    public/
    package.json
    tailwind.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd MessManagement/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI and JWT secret:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:5000` by default.

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd MessManagement/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:3000` by default.

## Usage
- Register or log in as a user or admin.
- Mark your attendance for each meal.
- View your attendance history in the calendar.
- Admins can manage users, plans, menus, and inventory from the dashboard.

## API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### User Routes (`/user`)
- `GET /user/profile/:userId` - Get user profile
- `PUT /user/profile/:userId` - Update user profile
- `GET /user/all` - Get all users (Admin only)

### Attendance Routes (`/attendance`)
- `GET /attendance/user/:userId` - Get user attendance history
- `GET /attendance/today/:userId` - Get today's attendance
- `POST /attendance/mark/:userId` - Mark meal attendance

### Plan Routes (`/plan`)
- `GET /plan/all` - Get all plans
- `POST /plan/create` - Create new plan (Admin only)
- `PUT /plan/update/:planId` - Update plan (Admin only)
- `DELETE /plan/delete/:planId` - Delete plan (Admin only)

### User Plan Routes (`/userplan`)
- `GET /userplan/user/:userId` - Get user's plans
- `POST /userplan/assign` - Assign plan to user (Admin only)

### Menu Routes (`/menu`)
- `GET /menu/today` - Get today's menu
- `GET /menu/date/:date` - Get menu by date
- `POST /menu/create` - Create menu (Admin only)
- `PUT /menu/update/:menuId` - Update menu (Admin only)

### Inventory Routes (`/inventory`)
- `GET /inventory/all` - Get all inventory items
- `POST /inventory/add` - Add inventory item (Admin only)
- `PUT /inventory/update/:inventoryId` - Update inventory (Admin only)
- `DELETE /inventory/delete/:inventoryId` - Delete inventory (Admin only)

## Environment Variables

### Backend (.env)
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mess-management
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mess-management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (optional)
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Mess Management System
```

## Deployment

### Backend Deployment (Node.js)
1. **Production Environment Setup:**
   ```bash
   # Install PM2 for process management
   npm install -g pm2
   
   # Start application with PM2
   pm2 start index.js --name "mess-backend"
   pm2 startup
   pm2 save
   ```

2. **Environment Variables:**
   - Set `NODE_ENV=production`
   - Use MongoDB Atlas for cloud database
   - Configure proper JWT secrets

### Frontend Deployment (Next.js)
1. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

2. **Deploy to Vercel (Recommended):**
   ```bash
   npm install -g vercel
   vercel
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration for code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when adding new features

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues:**
   ```bash
   # Check if MongoDB is running
   sudo systemctl status mongod
   # Start MongoDB service
   sudo systemctl start mongod
   ```

2. **Port Already in Use:**
   ```bash
   # Kill process on port 5000
   npx kill-port 5000
   # Or change PORT in .env file
   ```

3. **JWT Token Issues:**
   - Ensure JWT_SECRET is set in environment variables
   - Check token expiration settings
   - Clear browser localStorage/cookies

4. **CORS Issues:**
   - Verify FRONTEND_URL in backend .env
   - Check corsOptions.js configuration

## Performance Optimization

- **Database Indexing:** Indexes are created on userId and date fields
- **API Caching:** Consider implementing Redis for frequent queries
- **Image Optimization:** Use Next.js Image component for profile pictures
- **Bundle Size:** Regularly audit and optimize bundle size

## Security Considerations

- **Authentication:** JWT tokens with secure expiration
- **Authorization:** Role-based access control (RBAC)
- **Data Validation:** Input validation on both frontend and backend
- **Password Security:** Bcrypt hashing for password storage
- **Environment Variables:** Sensitive data stored in .env files

## Future Enhancements

- [ ] Push notifications for meal reminders
- [ ] QR code-based attendance marking
- [ ] Integration with payment gateways
- [ ] Mobile app development (React Native)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Offline functionality with PWA

## Support

For support and questions:
- **Email:** [your-email@example.com]
- **GitHub Issues:** [Repository Issues](https://github.com/AyanAhmadKhan01/MessManagement/issues)
- **Documentation:** This README and inline code comments

## Customization
- Update meal times, plan types, and menu items in the backend models/controllers as needed.
- Tailwind CSS is used for easy UI customization.

## License
MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for efficient mess management**
