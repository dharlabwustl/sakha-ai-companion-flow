
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmotionalCheckProps {
  onComplete: (data: { mood: string }) => void;
}

const moods = [
  { emoji: '😊', name: 'Happy' },
  { emoji: '🙂', name: 'Content' },
  { emoji: '😐', name: 'Neutral' },
  { emoji: '😔', name: 'Sad' },
  { emoji: '😞', name: 'Disappointed' },
  { emoji: '😫', name: 'Stressed' },
  { emoji: '😤', name: 'Frustrated' },
  { emoji: '🤔', name: 'Thoughtful' },
  { emoji: '😴', name: 'Tired' },
  { emoji: '🤩', name: 'Excited' },
];

const EmotionalCheck: React.FC<EmotionalCheckProps> = ({ onComplete }) => {
  const [selectedMood, setSelectedMood] = useState('');

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    onComplete({ mood: selectedMood });
  };

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {moods.map((mood) => (
          <Button
            key={mood.name}
            variant="outline"
            className={`flex flex-col items-center justify-center h-20 transition-all ${
              selectedMood === mood.name 
                ? 'border-2 border-sakha-purple bg-secondary' 
                : 'hover:border-sakha-purple/50'
            }`}
            onClick={() => handleSelectMood(mood.name)}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs">{mood.name}</span>
          </Button>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmit} 
        disabled={!selectedMood}
        className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
      >
        Continue
      </Button>
    </Card>
  );
};

export default EmotionalCheck;
