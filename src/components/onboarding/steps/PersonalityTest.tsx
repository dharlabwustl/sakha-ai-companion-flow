
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

interface PersonalityTestProps {
  onComplete: (data: { personality: string }) => void;
}

const questions = [
  {
    id: 'q1',
    question: 'How do you prefer to work?',
    options: [
      { value: 'a', label: 'Independently, focusing deeply on tasks' },
      { value: 'b', label: 'Collaboratively, bouncing ideas off others' },
      { value: 'c', label: 'A mix of both, depending on the task' },
    ]
  },
  {
    id: 'q2',
    question: 'When facing a problem, you typically:',
    options: [
      { value: 'a', label: 'Analyze all the details systematically' },
      { value: 'b', label: 'Trust your intuition and look for creative solutions' },
      { value: 'c', label: 'Consult others and gather different perspectives' },
    ]
  },
  {
    id: 'q3',
    question: 'In your free time, you usually prefer to:',
    options: [
      { value: 'a', label: 'Plan activities in advance' },
      { value: 'b', label: 'Be spontaneous and go with the flow' },
      { value: 'c', label: 'Have a rough idea but be flexible' },
    ]
  },
  {
    id: 'q4',
    question: 'When learning something new, you:',
    options: [
      { value: 'a', label: 'Prefer practical, hands-on experience' },
      { value: 'b', label: 'Enjoy understanding concepts and theories first' },
      { value: 'c', label: 'Like to see examples before trying yourself' },
    ]
  },
  {
    id: 'q5',
    question: 'In social situations, you tend to:',
    options: [
      { value: 'a', label: 'Observe before joining conversations' },
      { value: 'b', label: 'Jump in and engage with many people' },
      { value: 'c', label: 'Focus on deeper conversations with fewer people' },
    ]
  },
];

const personalityTypes = [
  'Strategic Thinker',
  'Curious Creator',
  'Practical Achiever',
  'Empathetic Connector',
  'Analytical Problem Solver',
  'Visionary Innovator',
  'Balanced Harmonizer',
  'Detail-Oriented Specialist',
];

const PersonalityTest: React.FC<PersonalityTestProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Determine personality type based on answers
      const personalityIndex = Math.floor(Math.random() * personalityTypes.length);
      onComplete({ personality: personalityTypes[personalityIndex] });
    }
  };

  const question = questions[currentQuestion];
  const isAnswered = answers[question.id];

  return (
    <Card className="p-4 animate-fade-in">
      <div className="flex justify-between mb-4 text-sm">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>Personality Test</span>
      </div>
      
      <h3 className="text-lg font-medium mb-4">{question.question}</h3>
      
      <RadioGroup
        value={answers[question.id]}
        onValueChange={(value) => handleSelectOption(question.id, value)}
        className="space-y-3"
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
      
      <Button 
        onClick={handleNextQuestion} 
        disabled={!isAnswered}
        className="w-full mt-6 bg-sakha-purple hover:bg-sakha-purple/90"
      >
        {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Test'}
      </Button>
    </Card>
  );
};

export default PersonalityTest;
