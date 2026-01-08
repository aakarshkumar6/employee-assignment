import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEmployees } from '@/hooks/useEmployees';
import { Employee, EmployeeFormData } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EmployeeFilters } from '@/components/dashboard/EmployeeFilters';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';
import { EmployeeFormDialog } from '@/components/dashboard/EmployeeFormDialog';
import { DeleteConfirmDialog } from '@/components/dashboard/DeleteConfirmDialog';
import { Users, UserCheck, UserX, Plus, LogOut, Loader2, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { toast } = useToast();
  
  const {
    employees,
    allEmployees,
    isLoading,
    stats,
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    statusFilter,
    setStatusFilter,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleStatus
  } = useEmployees();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete);
      toast({
        title: 'Employee deleted',
        description: 'The employee has been removed successfully'
      });
    }
    setDeleteOpen(false);
    setEmployeeToDelete(null);
  };

  const handleFormSubmit = (data: EmployeeFormData) => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, data);
    } else {
      addEmployee(data);
    }
    setSelectedEmployee(null);
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  const handlePrintList = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1e40af; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #1e40af; color: white; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .stats { display: flex; gap: 20px; margin-bottom: 20px; }
            .stat-box { padding: 15px; background: #f1f5f9; border-radius: 8px; }
            .stat-label { font-size: 12px; color: #64748b; }
            .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
            .print-date { color: #64748b; font-size: 12px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>Employee List</h1>
          <p class="print-date">Printed on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <div class="stats">
            <div class="stat-box">
              <div class="stat-label">Total Employees</div>
              <div class="stat-value">${stats.total}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Active</div>
              <div class="stat-value">${stats.active}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Inactive</div>
              <div class="stat-value">${stats.inactive}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map((emp, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${emp.fullName}</td>
                  <td>${emp.gender}</td>
                  <td>${emp.dateOfBirth}</td>
                  <td>${emp.state}</td>
                  <td>${emp.isActive ? 'Active' : 'Inactive'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Employee Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Employees"
            value={stats.total}
            icon={Users}
            variant="default"
          />
          <StatsCard
            title="Active Employees"
            value={stats.active}
            icon={UserCheck}
            variant="success"
          />
          <StatsCard
            title="Inactive Employees"
            value={stats.inactive}
            icon={UserX}
            variant="warning"
          />
        </div>

        {/* Employee List Card */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Employees</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrintList}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print List
                </Button>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Filters */}
            <div className="mb-6 print:hidden">
              <EmployeeFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                genderFilter={genderFilter}
                onGenderChange={setGenderFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            {/* Table */}
            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
            />
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        employee={selectedEmployee}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Dashboard;
