import {
  Code,
  Palette,
  TrendingUp,
  Briefcase,
  Heart,
  GraduationCap,
  Wrench,
  ShoppingBag,
  Camera,
  DollarSign,
  Lightbulb,
  Users,
} from 'lucide-react-native';
import { Colors } from '../theme/colors';
export interface JobField {
  id: string;
  title: string;
  icon: any;
  color: string;
  bgColor: string;
}

export const jobFields: JobField[] = [
  {
    id: '1',
    title: 'Technology & IT',
    icon: Code,
    color: Colors.primary,
    bgColor: Colors.lightPrimary,
  },
  {
    id: '2',
    title: 'Design & Creative',
    icon: Palette,
    color: '#E91E63',
    bgColor: '#FCE4EC',
  },
  {
    id: '3',
    title: 'Marketing & Sales',
    icon: TrendingUp,
    color: '#FF9800',
    bgColor: '#FFF3E0',
  },
  {
    id: '4',
    title: 'Business & Management',
    icon: Briefcase,
    color: '#673AB7',
    bgColor: '#EDE7F6',
  },
  {
    id: '5',
    title: 'Healthcare & Medical',
    icon: Heart,
    color: '#F44336',
    bgColor: '#FFEBEE',
  },
  {
    id: '6',
    title: 'Education & Training',
    icon: GraduationCap,
    color: '#009688',
    bgColor: '#E0F2F1',
  },
  {
    id: '7',
    title: 'Engineering',
    icon: Wrench,
    color: '#795548',
    bgColor: '#EFEBE9',
  },
  {
    id: '8',
    title: 'Retail & E-commerce',
    icon: ShoppingBag,
    color: '#9C27B0',
    bgColor: '#F3E5F5',
  },
  {
    id: '9',
    title: 'Media & Entertainment',
    icon: Camera,
    color: '#FF5722',
    bgColor: '#FBE9E7',
  },
  {
    id: '10',
    title: 'Finance & Accounting',
    icon: DollarSign,
    color: '#4CAF50',
    bgColor: '#E8F5E9',
  },
  {
    id: '11',
    title: 'Consulting',
    icon: Lightbulb,
    color: '#FFC107',
    bgColor: '#FFF9C4',
  },
  {
    id: '12',
    title: 'Human Resources',
    icon: Users,
    color: '#00BCD4',
    bgColor: '#E0F7FA',
  },
];