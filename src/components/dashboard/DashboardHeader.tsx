
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRole } from '../onboarding/OnboardingFlow';
import ThemeToggle from '../ThemeToggle';
import { Bell, Settings, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import SakhaLogo from '../SakhaLogo';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  role: UserRole;
  username?: string;
  personality?: string;
  additionalInfo?: Record<string, string>;
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
  username = 'User',
  personality = '',
  additionalInfo = {} 
}) => {
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications at this time.",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Settings panel will be available in the next update.",
    });
  };

  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: `Welcome, ${username}! Your profile is being set up.`,
    });
  };

  return (
    <header className="border-b border-border py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SakhaLogo size="md" />
          <div>
            <h1 className="text-xl font-display font-semibold">
              {roleLabels[role]}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">
                Welcome back, {username}
              </span>
              
              {personality && (
                <Badge variant="outline" className="text-xs font-normal">
                  {personality} personality
                </Badge>
              )}
              
              {Object.entries(additionalInfo).map(([key, value]) => 
                value ? (
                  <Badge key={key} variant="secondary" className="text-xs font-normal">
                    {value}
                  </Badge>
                ) : null
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSettingsClick}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleProfileClick}>
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
