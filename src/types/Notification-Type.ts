export type TabKey = 'applied' | 'approved' | 'all';

export type Notification = {
  id: string;
  type: 'applied' | 'approved' | 'rejected' | 'info';
  title: string;
  description: string;
  time: string;
  read: boolean;
  couponCode?: string;
  location?: string;
};
