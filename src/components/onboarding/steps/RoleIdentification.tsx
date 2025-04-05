
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Book, Briefcase, Stethoscope, BookOpen, Lightbulb
} from 'lucide-react';
import { UserRole } from '../OnboardingFlow';

interface RoleIdentificationProps {
  onComplete: (data: { role: UserRole; additionalInfo: Record<string, string> }) => void;
}

const roles = [
  { id: 'student', name: 'Student', icon: Book },
  { id: 'employee', name: 'Employee', icon: Briefcase },
  { id: 'doctor', name: 'Doctor', icon: Stethoscope },
  { id: 'researcher', name: 'Research Scholar', icon: BookOpen },
  { id: 'founder', name: 'Founder', icon: Lightbulb },
];

const roleQuestions: Record<UserRole, { label: string; key: string }[]> = {
  student: [
    { label: 'Age', key: 'age' },
    { label: 'Class/Grade', key: 'grade' },
    { label: 'Location', key: 'location' },
  ],
  employee: [
    { label: 'Job Role', key: 'jobRole' },
    { label: 'Seniority Level', key: 'seniority' },
    { label: 'Domain', key: 'domain' },
  ],
  doctor: [
    { label: 'Specialization', key: 'specialization' },
    { label: 'Institution', key: 'institution' },
  ],
  researcher: [
    { label: 'Specialization', key: 'specialization' },
    { label: 'Institution', key: 'institution' },
    { label: 'Ongoing Research', key: 'research' },
  ],
  founder: [
    { label: 'Startup Stage', key: 'stage' },
    { label: 'Team Size', key: 'teamSize' },
    { label: 'Industry', key: 'industry' },
    { label: 'Goals', key: 'goals' },
  ],
  '': [],
};

const RoleIdentification: React.FC<RoleIdentificationProps> = ({ onComplete }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('');
  const [additionalInfo, setAdditionalInfo] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleInputChange = (key: string, value: string) => {
    setAdditionalInfo(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onComplete({
      role: selectedRole,
      additionalInfo
    });
  };

  const isFormComplete = () => {
    const questions = roleQuestions[selectedRole];
    return questions.every(q => additionalInfo[q.key]?.trim());
  };

  if (step === 1) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Button
              key={role.id}
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-2 hover:border-sakha-purple hover:bg-secondary"
              onClick={() => handleRoleSelect(role.id as UserRole)}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span>{role.name}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="p-4 space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Tell us more about yourself</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roleQuestions[selectedRole].map((question) => (
          <div key={question.key} className="space-y-2">
            <label htmlFor={question.key} className="text-sm font-medium">
              {question.label}
            </label>
            <Input
              id={question.key}
              value={additionalInfo[question.key] || ''}
              onChange={(e) => handleInputChange(question.key, e.target.value)}
              placeholder={`Enter your ${question.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
      <Button 
        onClick={handleSubmit} 
        disabled={!isFormComplete()}
        className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
      >
        Continue
      </Button>
    </Card>
  );
};

export default RoleIdentification;
