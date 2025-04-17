import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function EcoScore({ score }) {
  return (
    <Card className="max-w-xl mx-auto p-4 mb-8 bg-white">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">🌱 Your Eco Impact</h3>
        <p className="text-sm text-gray-600 mb-2">You've helped reduce approx. {score} kg of CO₂ waste!</p>
        <Progress value={score * 10} className="h-2" />
      </CardContent>
    </Card>
  );
}