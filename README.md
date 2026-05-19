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

Tabla principal: `expenses`

```sql
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    expense_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);