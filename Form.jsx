import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Form({ onPost, user, voiceInput }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  });

  useEffect(() => {
    if (voiceInput) {
      setFormData((prev) => ({ ...prev, description: voiceInput }));
    }
  }, [voiceInput]);

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.location) {
      const matchScore = getMatchScore(formData.description, user.preferences);
      const newItem = {
        ...formData,
        id: Date.now(),
        freshness: Math.floor(Math.random() * 100),
        matchPercent: matchScore,
        ecoImpact: Math.floor(Math.random() * 5 + 1),
      };
      onPost(newItem);
      setFormData({ name: '', description: '', location: '' });
    }
  };

  const getMatchScore = (desc, prefs) => {
    let score = 50;
    const words = prefs.toLowerCase().split(',');
    words.forEach((word) => {
      if (desc.toLowerCase().includes(word.trim())) score += 10;
    });
    return Math.min(score, 100);
  };

  return (
    <Card className="max-w-xl mx-auto p-4 mb-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-2">Post Your Leftovers</h2>
        <Input
          placeholder="Food Name"
          className="mb-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Textarea
          placeholder="Description (e.g., portion size, expiry, vegetarian)"
          className="mb-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <Input
          placeholder="Pickup Location"
          className="mb-2"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <Button className="w-full" onClick={handleSubmit}>Post</Button>
      </CardContent>
    </Card>
  );
}