import { sql } from '@vercel/postgres';
import { Employee } from '@/app/lib/employees/definitions';

export async function fetchEmployees() {
  
  try {
    const data = await sql<Employee>`
      SELECT id, cpf, name, birth, email, phone, cep, idcompany
      FROM smartprojectsapp.employees
      ORDER BY name ASC
    `;
    const employees = data.rows;
    return employees;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all employees.');
  }
}

export async function fetchFilteredEmployees(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<Employee>`
      SELECT id, cpf, name, birth, email, phone, cep, idcompany, price
      FROM smartprojectsapp.employees
      WHERE
        employees.name ILIKE ${`%${query}%`} OR
        employees.email ILIKE ${`%${query}%`} OR
        employees.cpf ILIKE ${`%${query}%`}
      ORDER BY name ASC
    `;
    const employees = data.rows;
    return employees;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search employees.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchEmployeesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM smartprojectsapp.employees`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchEmployeeById(id: string) {
  try {
    const data = await sql<Employee>`
      SELECT
        employees.id,
        employees.cpf,
        employees.name,
        employees.birth,
        employees.email,
        employees.phone,
        employees.cep,
        employees.idcompany,
        employees.price
        FROM smartprojectsapp.employees
        WHERE employees.id = ${id} `;

    const employee = data.rows.map((employee) => ({
      ...employee,
      price: Number(employee.price) / 100
    }));
    console.log( 'Employee: ' + employee[0].name);

    return employee[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch employee.');
  }
}
