import React from 'react';
import { useEffect, useState } from 'react';

interface Benefit {
  type: string;
  amount: number;
}

export const Dashboard = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([
    { type: 'Vale Refeição', amount: 500 },
    { type: 'Vale Alimentação', amount: 300 },
    { type: 'Vale Transporte', amount: 200 }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Meus Benefícios</h1>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.type}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {benefit.type}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(benefit.amount)}
                  </dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};