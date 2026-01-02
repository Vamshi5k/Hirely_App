export interface Employee {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  designation: string;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface EmployeePayload {
  employeeCode: string;
  fullName: string;
  email: string;
  designation: string;
  department: string;
  status: 'active' | 'inactive';
}
