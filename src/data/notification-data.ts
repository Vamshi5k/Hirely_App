import { Notification } from "../types/Notification-Type";

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approved',
    title: 'Application Approved',
    description:
      'Your application for Senior Frontend Developer at TechCorp has been approved!',
    time: '2 hours ago',
    read: false,
    couponCode: 'TECH2024',
    location: 'TechCorp HQ, San Francisco, CA',
  },
  {
    id: '2',
    type: 'applied',
    title: 'Application Received',
    description:
      'We received your application for UI/UX Designer position at DesignHub.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Job Match',
    description: '3 new jobs match your profile. Check them out now!',
    time: '1 day ago',
    read: true,
    location: 'Remote positions available',
  },
  {
    id: '4',
    type: 'rejected',
    title: 'Application Update',
    description:
      'Thank you for your interest. We have moved forward with other candidates.',
    time: '2 days ago',
    read: true,
  },
];