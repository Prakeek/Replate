import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChatBot({ messages, setMessages }) {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('https://api.fake-ai.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'ai', content: data.reply }]);
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">AI Chatbot</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <span className="text-sm text-gray-700">{msg.content}</span>
            </div>
          ))}
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="mb-2"
        />
        <Button className="w-full" onClick={handleSend}>Send</Button>
      </CardContent>
    </Card>
  );
}