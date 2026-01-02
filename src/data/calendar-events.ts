import { CalendarEvent } from '../components/cards/EventCard';

export const calendarEvents: Record<string, CalendarEvent[]> = {
  '2026-01-02': [
    {
      id: 1,
      title: 'Interview with FlowTech',
      time: '12:00 PM – 2:00 PM',
      description:
        'Zoom interview for the position Junior UI Designer at FlowTech.',
      company: 'FlowTech',
      tag: 'Interview',
    },
    {
      id: 2,
      title: 'Recruiter Call',
      time: '10:00 AM – 10:30 AM',
      description:
        'Initial screening call with HR to discuss role requirements.',
      company: 'HR Team',
      tag: 'Call',
    },
  ],

  '2026-01-03': [],

  '2026-01-04': [
    {
      id: 3,
      title: 'Portfolio Review',
      time: '3:00 PM – 4:00 PM',
      description:
        'Internal review of portfolio projects and case studies.',
      company: 'Self',
      tag: 'Review',
    },
  ],

  '2026-01-05': [
    {
      id: 4,
      title: 'Offer Discussion',
      time: '4:00 PM – 4:30 PM',
      description:
        'Discussion on compensation, joining date, and expectations.',
      company: 'FlowTech',
      tag: 'Meeting',
    },
    {
      id: 5,
      title: 'HR Documentation',
      time: '11:00 AM – 12:00 PM',
      company: 'FlowTech',
      tag: 'Task',
    },
  ],

  '2026-01-06': [
    {
      id: 6,
      title: 'Technical Round',
      time: '2:00 PM – 3:30 PM',
      description:
        'React Native technical interview focusing on performance and architecture.',
      company: 'TechNova',
      tag: 'Interview',
    },
  ],

  '2026-01-07': [],

  '2026-01-08': [
    {
      id: 7,
      title: 'Mock Interview',
      time: '6:00 PM – 7:00 PM',
      description:
        'Practice interview session with a mentor.',
      company: 'Mentor',
      tag: 'Practice',
    },
  ],

  '2026-01-09': [
    {
      id: 8,
      title: 'System Design Discussion',
      time: '1:00 PM – 2:00 PM',
      description:
        'Discussion on scalable frontend architecture.',
      company: 'TechNova',
      tag: 'Discussion',
    },
    {
      id: 9,
      title: 'Follow-up Call',
      time: '5:00 PM – 5:15 PM',
      company: 'Recruiter',
      tag: 'Call',
    },
  ],

  '2026-01-10': [],

  '2026-01-12': [
    {
      id: 10,
      title: 'Final HR Round',
      time: '11:30 AM – 12:00 PM',
      description:
        'Final HR round to close the hiring process.',
      company: 'TechNova',
      tag: 'Interview',
    },
  ],
};
