import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Form from './Form';
import EcoScore from './EcoScore';
import ListingCard from './ListingCard';
import ChatBot from './ChatBot';
import useVoiceInput from './useVoiceInput';
import './App.css';
import './service-worker-registration';

export default function ReplateApp() {
  const [listings, setListings] = useState([]);
  const [ecoScore, setEcoScore] = useState(0);
  const [chatOpen, setChatOpen] = useState(null);
  const [messages, setMessages] = useState([]);
  const user = { name: 'Alex', preferences: 'vegetarian, low-spice' };

  const voiceInput = useVoiceInput();

  const handlePost = (newItem) => {
    setListings([...listings, newItem]);
    setEcoScore((prev) => prev + newItem.ecoImpact);
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <h1 className="text-4xl font-bold text-center mb-2">Replate 🍽️</h1>
      <p className="text-center text-sm text-green-700 mb-6">
        Give your food a second chance and save the planet!
      </p>
      <Form onPost={handlePost} user={user} voiceInput={voiceInput} />
      <EcoScore score={ecoScore} />

      <div className="grid gap-4 max-w-4xl mx-auto">
        {listings.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ListingCard item={item} chatOpen={chatOpen} setChatOpen={setChatOpen} />
          </motion.div>
        ))}
      </div>

      <ChatBot messages={messages} setMessages={setMessages} />
    </div>
  );
}