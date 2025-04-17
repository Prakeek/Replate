import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export default function ListingCard({ item, chatOpen, setChatOpen }) {
  return (
    <>
      <Card className="flex flex-col sm:flex-row items-start gap-4 p-4">
        <Avatar fallback={item.name[0]} />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm font-medium text-green-700">📍 {item.location}</p>
          <div className="text-xs text-gray-500 mt-1">
            🧠 Freshness Score: {item.freshness}% | 🤝 Match %: {item.matchPercent}% | 🌿 Saved: {item.ecoImpact}kg CO₂
          </div>
        </div>
        <Button size="sm" onClick={() => setChatOpen(chatOpen === item.id ? null : item.id)}>
          {chatOpen === item.id ? "Close Chat" : "Chat"}
        </Button>
      </Card>
      {chatOpen === item.id && (
        <div className="bg-white p-4 rounded-xl shadow-md mx-2 mt-2">
          <p className="text-sm text-gray-600">💬 Chat with the donor</p>
          <Textarea placeholder="Type your message..." className="mt-2" />
          <Button size="sm" className="mt-2">Send</Button>
        </div>
      )}
    </>
  );
}