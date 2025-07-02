
import { 
  Target, 
  Briefcase, 
  Brain, 
  FileText, 
  GraduationCap, 
  Users,
  LucideIcon 
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Briefcase,
  Brain,
  FileText,
  GraduationCap,
  Users,
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Target;
};
