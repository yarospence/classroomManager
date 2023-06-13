import StudentForm from "../students/StudentForm";
import StudentTable from "../students/StudentTable";

/**
 * The Dashboard is the main page of the application that instructors see.
 */
function Dashboard() {
  return (
    <main>
      <h1>Welcome!</h1>
      <StudentTable />
      <StudentForm />
    </main>
  );
}

export default Dashboard;
