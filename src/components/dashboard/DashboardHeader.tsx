
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRole } from '../onboarding/OnboardingFlow';
import ThemeToggle from '../ThemeToggle';
import { Bell, Settings, User } from 'lucide-react';

interface DashboardHeaderProps {
  role: UserRole;
  username?: string;
}

const roleLabels: Record<UserRole, string> = {
  student: 'Student Dashboard',
  employee: 'Professional Dashboard',
  doctor: 'Medical Professional Dashboard',
  researcher: 'Research Scholar Dashboard',
  founder: 'Founder Dashboard',
  '': 'Dashboard',
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  role, 
  username = 'User'
}) => {
  return (
    <header className="border-b border-border py-3 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-semibold">
            {roleLabels[role]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {username}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
