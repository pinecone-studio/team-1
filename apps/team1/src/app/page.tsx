'use client';

import { useEffect, useState } from 'react';

// API-аас ирэх өгөгдлийн төрлийг тодорхойлох
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export default function Index() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const query = `
        query GetEmployees {
          employees {
            id
            firstName
            lastName
            email
            department
          }
        }
      `;

      try {
        const response = await fetch(
          'https://my-next-app.tsetsegulziiocherdene.workers.dev/api/graphql',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
          },
        );

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setEmployees(result.data.employees);
      } catch (err: any) {
        setError(err.message || 'Алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Түр хүлээнэ үү, ачааллаж байна...</p>;
  if (error) return <p style={{ color: 'red' }}>Алдаа: {error}</p>;

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Ажилчдын жагсаалт</h1>

      <table
        border={1}
        cellPadding={10}
        style={{ borderCollapse: 'collapse', marginTop: '20px', width: '100%' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Нэр</th>
            <th>Email</th>
            <th>Хэлтэс</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                {emp.firstName} {emp.lastName}
              </td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
