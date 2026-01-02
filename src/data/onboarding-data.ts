import Onboarding from "../screens/onboarding/onboarding";
import { OnboardingOne, OnboardingThree, OnboardingTwo } from "../utlis/Images";

export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Find the Right Job',
    description: 'Discover opportunities that match your skills.',
    image: OnboardingTwo,
  },
  {
    id: '2',
    title: 'Apply in One Tap',
    description: 'Quick applications with smart profile matching.',
    image: OnboardingThree,
  },
  {
    id: '3',
    title: 'Get Hired Faster',
    description: 'Track applications and get hired without friction.',
    image: OnboardingOne,
  },
];
