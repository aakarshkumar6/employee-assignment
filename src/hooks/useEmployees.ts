import { useState, useEffect, useMemo } from 'react';
import { Employee, EmployeeFormData } from '@/types/employee';
import { initialEmployees } from '@/data/mockEmployees';

const STORAGE_KEY = 'employees';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setEmployees(JSON.parse(stored));
    } else {
      setEmployees(initialEmployees);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEmployees));
    }
    setIsLoading(false);
  }, []);

  const saveToStorage = (data: Employee[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...data,
      id: Date.now().toString()
    };
    const updated = [...employees, newEmployee];
    setEmployees(updated);
    saveToStorage(updated);
  };

  const updateEmployee = (id: string, data: EmployeeFormData) => {
    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, ...data } : emp
    );
    setEmployees(updated);
    saveToStorage(updated);
  };

  const deleteEmployee = (id: string) => {
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    saveToStorage(updated);
  };

  const toggleStatus = (id: string) => {
    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    );
    setEmployees(updated);
    saveToStorage(updated);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGender = genderFilter === 'all' || emp.gender === genderFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && emp.isActive) ||
        (statusFilter === 'inactive' && !emp.isActive);
      
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchQuery, genderFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.isActive).length,
    inactive: employees.filter(e => !e.isActive).length
  }), [employees]);

  return {
    employees: filteredEmployees,
    allEmployees: employees,
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
  };
};
