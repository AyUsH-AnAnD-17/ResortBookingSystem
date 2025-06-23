# 🏝️ Resort Booking System

A full-stack web application where **customers can book resorts** and **owners can rent out their properties**. This platform enables seamless resort listing, availability tracking, and booking management, offering a modern solution for vacation planning and property rental.

---

## 🚀 Features

### For Customers:
- 🔍 Browse a wide range of resorts with filters (price, location, availability).
- 📅 Book resorts by selecting check-in and check-out dates.
- 💼 View personal bookings and cancel if needed.
- 🔒 Secure login & registration.

### For Owners:
- 🏠 List a new resort with details (price, description, images, availability).
- 📅 Update resort availability calendar.
- 🧾 View all bookings for their listed resorts.

---

## 🛠 Tech Stack

| Technology | Logo | Purpose |
|------------|------|---------|
| **.NET (C#)** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" width="25" height="25" /> | Backend REST API & authentication |
| **SQL Server (SSMS)** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" width="25" height="25" /> | Database management |
| **Angular (TypeScript)** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" width="25" height="25" /> | Frontend SPA with UI logic |
| **Bootstrap** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="25" height="25" /> | Responsive UI components |
| **JWT** | <img src="https://jwt.io/img/pic_logo.svg" width="25" height="25" /> | Authentication & Authorization |

---

---

## 🔐 Authentication

- JWT-based login system.
- Roles: `Customer`, `Owner`.
- Secure routes with guards and middleware.

---

## 🔌 API Endpoints (Sample)

### 🔐 Auth
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| POST   | `/api/auth/register`   | Register user        |
| POST   | `/api/auth/login`      | Login user           |

### 🏨 Resort
| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | `/api/resorts`              | Create a resort (Owner only) |
| GET    | `/api/resorts`              | Get all resorts              |
| GET    | `/api/resorts/{id}`         | Get resort by ID             |
| PUT    | `/api/resorts/{id}`         | Update resort details        |
| DELETE | `/api/resorts/{id}`         | Delete a resort              |

### 📅 Booking
| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| POST   | `/api/bookings`             | Book a resort (Customer only) |
| GET    | `/api/bookings/user/{id}`   | Get bookings by user          |
| DELETE | `/api/bookings/{id}`        | Cancel booking                |

---

### 🧱 Prerequisites
- [.NET 6 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [SQL Server Management Studio (SSMS)](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

---
