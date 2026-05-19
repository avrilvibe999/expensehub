# ExpenseHub

ExpenseHub es una aplicación web para el control de gastos personales. Permite registrar, visualizar, filtrar y analizar gastos mediante gráficos.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- mysql2
- EJS (templates)
- Bootstrap 5
- Chart.js

---

## Funcionalidades

- Agregar gastos
- Listar gastos
- Filtrar por categoría
- Editar gastos
- Eliminar gastos
- Ver total gastado
- Gráfico de gastos por categoría (pie chart)

---

## Base de datos

### Crear base de datos: 
```sql
CREATE DATABASE expensehub_db;

USE expensehub_db;
``` 

### Tabla de usuarios
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
``` 

### Tabla de gastos
```sql
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    amount DECIMAL(10,2),
    category VARCHAR(50),
    expense_date DATE,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
``` 

## Instalación y ejecucion
npm install
npm run dev

## Abrir en navegador
http://localhost:3000