
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Library Management System</h1>
        <LoginForm />
      </div>
    </div>
  );
}
