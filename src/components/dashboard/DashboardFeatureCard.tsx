
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isPremium?: boolean;
  isNew?: boolean;
  onClick?: (id: string) => void;
}

const DashboardFeatureCard: React.FC<FeatureCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  isPremium = false,
  isNew = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isPremium) {
      toast({
        title: "Premium Feature",
        description: "This feature requires a premium subscription. You can upgrade from your dashboard.",
        variant: "default",
      });
    } else if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md", 
        isHovered && "scale-[1.02]",
        isPremium && "bg-gradient-to-br from-card to-secondary/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className={cn("pb-2", isHovered && "bg-muted/30")}>
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-full", 
            isPremium ? "bg-sakha-purple/20" : "bg-secondary",
            isHovered && "animate-pulse"
          )}>
            <Icon className={cn("h-5 w-5", isPremium && "text-sakha-purple")} />
          </div>
          <div className="flex flex-col">
            <CardTitle className="text-lg">{title}</CardTitle>
            {isNew && (
              <div className="inline-flex">
                <span className="text-[10px] font-semibold text-white bg-sakha-purple px-1.5 py-0.5 rounded-sm mt-1">
                  NEW
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[40px]">
          {description}
        </CardDescription>
        <Button 
          variant={isPremium ? "default" : "outline"} 
          size="sm" 
          className={cn(
            "mt-4 w-full transition-all", 
            isPremium && "bg-sakha-purple hover:bg-sakha-purple/90",
            isHovered && "shadow-sm"
          )} 
          onClick={handleClick}
        >
          {isPremium ? "Upgrade to Access" : "Access Feature"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardFeatureCard;
