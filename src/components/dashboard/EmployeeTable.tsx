import { Employee } from '@/types/employee';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Printer } from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handlePrintEmployee = (employee: Employee) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Employee Details - ${employee.fullName}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; }
            .avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; }
            .name { font-size: 24px; font-weight: bold; margin: 0; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-top: 8px; }
            .active { background: #dcfce7; color: #166534; }
            .inactive { background: #f3f4f6; color: #6b7280; }
            .details { margin-top: 30px; }
            .row { display: flex; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
            .label { width: 140px; color: #6b7280; font-size: 14px; }
            .value { font-weight: 500; }
            @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${employee.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(employee.fullName)}" alt="${employee.fullName}" class="avatar" />
            <h1 class="name">${employee.fullName}</h1>
            <span class="status ${employee.isActive ? 'active' : 'inactive'}">${employee.isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <div class="details">
            <div class="row"><span class="label">Employee ID</span><span class="value">#${employee.id}</span></div>
            <div class="row"><span class="label">Gender</span><span class="value">${employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1)}</span></div>
            <div class="row"><span class="label">Date of Birth</span><span class="value">${format(new Date(employee.dateOfBirth), 'MMMM dd, yyyy')}</span></div>
            <div class="row"><span class="label">State</span><span class="value">${employee.state}</span></div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No employees found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">#{employee.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.profileImage} alt={employee.fullName} />
                    <AvatarFallback>{getInitials(employee.fullName)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{employee.fullName}</span>
                </div>
              </TableCell>
              <TableCell className="capitalize">{employee.gender}</TableCell>
              <TableCell>{format(new Date(employee.dateOfBirth), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{employee.state}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={employee.isActive}
                    onCheckedChange={() => onToggleStatus(employee.id)}
                  />
                  <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePrintEmployee(employee)}
                    title="Print employee details"
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(employee)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(employee.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
