
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HabitAnalysisProps {
  onComplete: (data: { 
    habits: {
      sleep: string;
      routine: string;
      stress: string;
      focus: string;
    } 
  }) => void;
}

const habitQuestions = [
  {
    id: 'sleep',
    question: 'How would you describe your sleep pattern?',
    options: [
      { value: 'regular', label: 'Regular (7-9 hours consistently)' },
      { value: 'irregular', label: 'Irregular (varies day to day)' },
      { value: 'insufficient', label: 'Insufficient (less than 6 hours)' },
      { value: 'excessive', label: 'More than 9 hours regularly' },
    ]
  },
  {
    id: 'routine',
    question: 'Do you follow a daily routine?',
    options: [
      { value: 'strict', label: 'Yes, strictly scheduled' },
      { value: 'flexible', label: 'Yes, but it\'s flexible' },
      { value: 'occasional', label: 'Sometimes, not consistently' },
      { value: 'no', label: 'No regular routine' },
    ]
  },
  {
    id: 'stress',
    question: 'How do you typically manage stress?',
    options: [
      { value: 'exercise', label: 'Physical exercise' },
      { value: 'meditation', label: 'Meditation/Mindfulness' },
      { value: 'hobbies', label: 'Hobbies/Creative outlets' },
      { value: 'social', label: 'Talking with friends/family' },
      { value: 'none', label: 'I don\'t have specific methods' },
    ]
  },
  {
    id: 'focus',
    question: 'How long can you typically focus on a task before needing a break?',
    options: [
      { value: 'short', label: 'Less than 30 minutes' },
      { value: 'medium', label: '30-60 minutes' },
      { value: 'long', label: '1-2 hours' },
      { value: 'verylong', label: 'More than 2 hours' },
    ]
  },
];

const HabitAnalysis: React.FC<HabitAnalysisProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    onComplete({ 
      habits: {
        sleep: answers.sleep || '',
        routine: answers.routine || '',
        stress: answers.stress || '',
        focus: answers.focus || '',
      } 
    });
  };

  const isFormComplete = () => {
    return habitQuestions.every(q => answers[q.id]);
  };

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Let's understand your habits</h3>
      
      <div className="space-y-6">
        {habitQuestions.map((question) => (
          <div key={question.id} className="space-y-3">
            <h4 className="font-medium text-sm">{question.question}</h4>
            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleSelectOption(question.id, value)}
              className="space-y-2"
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-2">
                  <RadioGroupItem id={`${question.id}-${option.value}`} value={option.value} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmit} 
        disabled={!isFormComplete()}
        className="w-full mt-6 bg-sakha-purple hover:bg-sakha-purple/90"
      >
        Continue
      </Button>
    </Card>
  );
};

export default HabitAnalysis;
