# AgroHelp
# Farm Equipment Rental Backend

## Setup Instructions

### 1. Install dependencies
```
npm install
```

### 2. Configure PostgreSQL
- Make sure PostgreSQL is installed and running on your machine.
- Create a database named `farm_equipment_rental`.
- Create a table for equipment:

```
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT
);
```
- Edit the `.env` file if your database user/password are different.

### 3. Start the backend server
```
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000)

### 4. API Endpoints
- `GET /api/equipment` - List all equipment
- `POST /api/equipment` - Add new equipment (JSON body: name, type, description, image)
- `DELETE /api/equipment/:id` - Delete equipment by id

### 5. Test DB connection
- `GET /api/ping` - Returns DB server time
