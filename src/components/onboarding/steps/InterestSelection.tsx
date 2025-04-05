
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '../OnboardingFlow';

interface InterestSelectionProps {
  role: UserRole;
  onComplete: (data: { interests: string[] }) => void;
}

const roleBasedInterests: Record<UserRole, string[]> = {
  student: [
    'Mathematics', 'Science', 'Literature', 'History', 'Art', 
    'Coding', 'Languages', 'Music', 'Sports', 'Debate',
    'Physics', 'Chemistry', 'Biology', 'Geography', 'Psychology',
    'Web Development', 'Mobile Apps', 'AI/ML', 'Writing', 'Public Speaking'
  ],
  employee: [
    'Leadership', 'Management', 'Productivity', 'Public Speaking', 
    'Design', 'Writing', 'Marketing', 'Sales', 'Finance', 
    'Data Analysis', 'Web Development', 'Mobile Development', 
    'AI/ML', 'Project Management', 'Remote Work', 'Networking',
    'Communication', 'Negotiation', 'Team Building', 'Strategic Planning'
  ],
  doctor: [
    'Medical Research', 'Patient Care', 'Healthcare Innovation', 
    'Medical Writing', 'Public Health', 'Clinical Trials', 
    'Medical Education', 'Healthcare Policy', 'Telemedicine', 
    'Mental Health', 'Surgery Techniques', 'Diagnostic Methods',
    'Preventive Medicine', 'Chronic Disease Management', 'Pediatrics',
    'Geriatrics', 'Emergency Medicine', 'Oncology', 'Cardiology', 'Neurology'
  ],
  researcher: [
    'Academic Writing', 'Data Analysis', 'Literature Review', 
    'Research Methodology', 'Grant Writing', 'Publishing', 
    'Peer Review', 'Conference Presenting', 'Collaboration', 
    'Ethics in Research', 'Statistical Analysis', 'Qualitative Research',
    'Experimental Design', 'Field Research', 'Lab Techniques',
    'Computational Research', 'Interdisciplinary Research', 'Research Management'
  ],
  founder: [
    'Business Strategy', 'Fundraising', 'Product Development', 
    'Market Research', 'User Experience', 'Growth Hacking', 
    'Team Building', 'Leadership', 'Pitching', 'Networking', 
    'Financial Modeling', 'Sales', 'Marketing', 'Customer Support',
    'Operations', 'Legal', 'Partnerships', 'Technology Development',
    'Branding', 'Content Strategy'
  ],
  '': []
};

const InterestSelection: React.FC<InterestSelectionProps> = ({ role, onComplete }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const interests = roleBasedInterests[role] || roleBasedInterests.student;

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const handleSubmit = () => {
    onComplete({ interests: selectedInterests });
  };

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="text-lg font-medium mb-2">What are you interested in?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select at least 3 topics you'd like to focus on
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {interests.map((interest) => (
          <Badge
            key={interest}
            variant={selectedInterests.includes(interest) ? "default" : "outline"}
            className={`text-sm py-1 px-3 cursor-pointer ${
              selectedInterests.includes(interest) 
                ? 'bg-sakha-purple hover:bg-sakha-purple/90' 
                : 'hover:bg-secondary'
            }`}
            onClick={() => handleToggleInterest(interest)}
          >
            {interest}
          </Badge>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmit} 
        disabled={selectedInterests.length < 3}
        className="w-full bg-sakha-purple hover:bg-sakha-purple/90"
      >
        Continue
      </Button>
    </Card>
  );
};

export default InterestSelection;
