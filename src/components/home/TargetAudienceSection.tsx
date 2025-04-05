
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Briefcase, Stethoscope, BookOpen, Lightbulb } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon: Icon, onClick }) => {
  return (
    <Card className="h-full transition-all hover:shadow-md hover:border-sakha-purple/20">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-lg bg-secondary">
          <Icon className="h-6 w-6 text-sakha-purple" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-1">{description}</p>
        <Button 
          variant="outline" 
          className="mt-auto border-sakha-purple text-sakha-purple hover:bg-sakha-purple/10"
          onClick={onClick}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

interface TargetAudienceSectionProps {
  onSelectRole: (role: string) => void;
}

const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ onSelectRole }) => {
  return (
    <div className="py-20 px-4 bg-slate-50 dark:bg-sakha-dark/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">
            Who Can Benefit from Sakha AI?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI companion adapts to your unique role, providing tailored support for your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoleCard 
            title="Students"
            description="Get 24/7 tutoring, smart study plans, and academic guidance to excel in your studies."
            icon={Book}
            onClick={() => onSelectRole('student')}
          />
          <RoleCard 
            title="Professionals"
            description="Boost your career with skill development, productivity tracking, and workplace guidance."
            icon={Briefcase}
            onClick={() => onSelectRole('employee')}
          />
          <RoleCard 
            title="Medical Professionals"
            description="Enhance your practice with research assistance, patient care insights, and continuing education."
            icon={Stethoscope}
            onClick={() => onSelectRole('doctor')}
          />
          <RoleCard 
            title="Researchers"
            description="Accelerate your work with literature reviews, writing assistance, and methodology guidance."
            icon={BookOpen}
            onClick={() => onSelectRole('researcher')}
          />
          <RoleCard 
            title="Founders"
            description="Build your startup with product development, fundraising strategy, and pitch assistance."
            icon={Lightbulb}
            onClick={() => onSelectRole('founder')}
          />
          <Card className="h-full bg-gradient-to-br from-sakha-purple/10 to-sakha-blue/10 border-none">
            <CardContent className="p-6 flex flex-col justify-center items-center h-full">
              <h3 className="text-xl font-semibold mb-4 text-center">Not sure where you fit?</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Let Sakha AI customize the experience based on a conversation with you.
              </p>
              <Button 
                className="mt-2 bg-sakha-purple hover:bg-sakha-purple/90"
                onClick={() => onSelectRole('')}
              >
                Start Your Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TargetAudienceSection;
