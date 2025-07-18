# Admin Management System Documentation

## Overview

The admin management system provides comprehensive forms and interfaces to handle all CRUD operations for the mess management system. All forms are built using Shadcn UI components and maintain a consistent theme throughout the application.

## Features Created

### 1. User Management (`/dashboard/admin/manage-users`)
- **Create Users**: Form to add new users with validation
- **Edit Users**: Update existing user information
- **Delete Users**: Remove users from the system
- **User List**: View all users with their details
- **Role Management**: Assign roles (User, Admin)

**Form Fields:**
- Name (required)
- Email (required, unique)
- Mobile Number (required, 10 digits)
- Role (required, dropdown: User=0, Admin=2)
- Password (required for new users)
- Confirm Password (required for new users)

**Role Structure:**
- **Role 0**: User (regular mess users)
- **Role 1**: Employee (legacy, for backward compatibility)
- **Role 2**: Admin (system administrators)

**API Endpoints Used:**
- GET `/users/getusers` - Fetch all users
- POST `/users/signup` - Create new user
- PATCH `/users/update/:id` - Update user
- DELETE `/users/delete/:email` - Delete user

### 2. Plan Management (`/dashboard/admin/manage-plans`)
- **Create Plans**: Add new subscription plans
- **Edit Plans**: Modify existing plans
- **Delete Plans**: Remove plans from the system
- **Plan List**: View all available plans with pricing

**Form Fields:**
- Plan Type (required, dropdown: Daily/Weekly/Monthly)
- Plan Description (required, textarea)
- Plan Price (required, number with currency display)

**API Endpoints Used:**
- GET `/plan/getAllPlan` - Fetch all plans
- POST `/plan/addPlan` - Create new plan
- PATCH `/plan/updatePlan` - Update plan
- DELETE `/plan/deletePlan` - Delete plan

### 3. Menu Management (`/dashboard/admin/manage-menus`)
- **Create Menus**: Set up weekly menus for each day
- **Edit Menus**: Modify existing menu items
- **Delete Menus**: Remove menu configurations
- **Menu List**: View all configured menus by day

**Form Fields:**
- Day of Week (required, dropdown)
- Breakfast Menu (array of items, dynamically addable)
- Lunch Menu (array of items, dynamically addable)
- Dinner Menu (array of items, dynamically addable)
- Special Menu (optional, array of items)

**Features:**
- Dynamic item addition with Enter key or Add button
- Item removal with X button on badges
- Visual representation of menu items as badges
- Day-wise color coding

**API Endpoints Used:**
- GET `/menu/getMenu/:menu_day` - Fetch menu for specific day
- POST `/menu/addMenu` - Create new menu
- PATCH `/menu/updateMenu` - Update menu
- DELETE `/menu/deleteMenu` - Delete menu

### 4. Inventory Management (`/dashboard/admin/manage-inventory`)
- **Add Inventory**: Create new inventory items
- **Edit Inventory**: Update inventory details
- **Delete Inventory**: Remove inventory items
- **Inventory List**: View all items with stock status
- **Store-wise View**: Organize items by store type

**Form Fields:**
- Item Name (required)
- Store Type (required, dropdown: Vessels/Vegetables/Essentials/Liquid/Miscellaneous)
- Date (required, date picker)
- Total Quantity (required, number)
- Used Quantity (optional, number, default: 0)
- Price per Unit (required, number with currency)

**Calculated Fields:**
- Remaining Quantity (auto-calculated)
- Subtotal (auto-calculated)
- Stock Status (Critical/Low/Medium/Good based on remaining percentage)

**API Endpoints Used:**
- GET `/inventory/getstore/:storeType` - Fetch inventory by store type
- POST `/inventory/addinventory` - Create new inventory item
- PATCH `/inventory/updateinventory/:inventoryId` - Update inventory
- DELETE `/inventory/deleteinventory/:inventoryId` - Delete inventory

### 5. User Plan Management (`/dashboard/admin/manage-user-plans`)
- **Assign Plans**: Link users with subscription plans
- **Edit Assignments**: Modify user plan details
- **View Subscriptions**: See all active and inactive user plans
- **Meal Preferences**: Configure default meal preferences

**Form Fields:**
- Select User (required, dropdown with user list)
- Select Plan (required, dropdown with plan list)
- Start Date (required, date picker)
- End Date (required, date picker)
- Default Meal Preferences (checkboxes: Breakfast/Lunch/Dinner)

**Features:**
- Automatic availability generation for date range
- Active/Inactive status indication
- Duration calculation
- Meal preference visualization

**API Endpoints Used:**
- GET `/userplan/getUserPlan` - Fetch all user plans
- POST `/userplan/addUserPlan` - Create new user plan
- PATCH `/userplan/updateUserPlan` - Update user plan
- PATCH `/userplan/updateConsent` - Update meal preferences

### 6. Admin Dashboard (`/dashboard/admin`)
- **Statistics Overview**: Real-time stats for all entities
- **Quick Actions**: Direct navigation to management pages
- **System Status**: Backend and database connectivity
- **Management Cards**: Visual navigation to all management tools

**Statistics Displayed:**
- Total Users
- Active Plans
- Configured Menu Days
- Items in Stock
- Active Subscriptions

## UI Components Used

### Shadcn UI Components
- **Card**: For layout and content containers
- **Button**: For actions and navigation
- **Input**: For text and number inputs
- **Label**: For form field labels
- **Select**: For dropdown selections
- **Tabs**: For organizing content
- **Badge**: For status indicators
- **Checkbox**: For boolean selections
- **Textarea**: For multi-line text

### Custom Features
- **Form Validation**: All forms include proper validation
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes
- **Theme Consistency**: Maintains dark theme throughout
- **Real-time Updates**: Stats refresh automatically

## API Integration

All forms integrate with the Express.js backend using the base URL configured in `/utils/baseURL.js`. The system handles:

- **Authentication**: Ready for JWT token integration
- **Error Handling**: Proper error responses and user feedback
- **Data Validation**: Both frontend and backend validation
- **CORS**: Configured for cross-origin requests

## Installation Requirements

### Dependencies Already Installed
- `@radix-ui/react-*` components for UI primitives
- `lucide-react` for icons
- `tailwindcss` for styling
- `next.js` for the framework

### Additional Components Created
- `Textarea` component (`/components/ui/textarea.jsx`)
- `Tabs` component (`/components/ui/tabs.jsx`)
- `Select` component (`/components/ui/select.jsx`)

## Usage Instructions

1. **Access Admin Dashboard**: Navigate to `/dashboard/admin`
2. **Select Management Tool**: Use the management cards or quick actions
3. **Create/Edit/Delete**: Use the tabbed interface in each management page
4. **View Lists**: Switch to the list tab to see all items
5. **Monitor Stats**: Return to the main dashboard to see updated statistics

## Backend Compatibility

The forms are designed to work with the existing Express.js backend structure:
- Uses existing route patterns
- Matches model schemas
- Handles existing response formats
- Supports all CRUD operations

## Future Enhancements

- Real-time notifications for CRUD operations
- Bulk operations for multiple items
- Advanced filtering and search
- Export functionality for data
- Audit logs for admin actions
- Role-based access control refinements
