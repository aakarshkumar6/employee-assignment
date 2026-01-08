import { Employee } from '@/types/employee';

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir'
];

export const initialEmployees: Employee[] = [
  {
    id: '1',
    fullName: 'Rahul Sharma',
    gender: 'male',
    dateOfBirth: '1992-05-15',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    state: 'Maharashtra',
    isActive: true
  },
  {
    id: '2',
    fullName: 'Priya Patel',
    gender: 'female',
    dateOfBirth: '1988-11-22',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    state: 'Gujarat',
    isActive: true
  },
  {
    id: '3',
    fullName: 'Amit Kumar',
    gender: 'male',
    dateOfBirth: '1995-03-08',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    state: 'Delhi',
    isActive: false
  },
  {
    id: '4',
    fullName: 'Sneha Reddy',
    gender: 'female',
    dateOfBirth: '1990-07-30',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    state: 'Karnataka',
    isActive: true
  },
  {
    id: '5',
    fullName: 'Vikram Singh',
    gender: 'male',
    dateOfBirth: '1985-12-01',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    state: 'Rajasthan',
    isActive: true
  }
];
