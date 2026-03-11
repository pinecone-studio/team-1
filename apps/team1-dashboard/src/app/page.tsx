export default function HomePage() {
  const CREATE_EMPLOYEE = gql`
    mutation Create($input: CreateEmployeeInput!) {
      createEmployee(input: $input) {
        id
        firstName
        isKpi # true эсвэл false ирнэ
      }
    }
  `;
  createEmployee({
    variables: {
      input: {
        firstName: 'Ganbaatar',
        isKpi: true, // Boolean утга явуулна
        hireDate: '2024-06-01',
        // ... бусад талбарууд
      },
    },
  });
  return <div></div>;
}
