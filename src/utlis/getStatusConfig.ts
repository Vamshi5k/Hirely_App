export type JobStatus =
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'saved';

interface StatusConfig {
  text: string;
  bg: string;
  border: string;
  color: string;     // text color
  dotColor: string;  // dot / icon color
}

export const getStatusConfig = (
  status?: JobStatus
): StatusConfig | null => {
  switch (status) {
    case 'applied':
      return {
        text: 'Applied',
        bg: 'rgba(37, 99, 235, 0.08)',
        border: 'rgba(37, 99, 235, 0.35)',
        color: 'rgba(37, 99, 235, 1)',
        dotColor: 'rgba(37, 99, 235, 1)',
      };

    case 'interviewing':
      return {
        text: 'Interviewing',
        bg: 'rgba(14, 165, 233, 0.10)',
        border: 'rgba(14, 165, 233, 0.35)',
        color: 'rgba(14, 165, 233, 1)',
        dotColor: 'rgba(14, 165, 233, 1)',
      };

    case 'offer':
      return {
        text: 'Offer',
        bg: 'rgba(34, 197, 94, 0.10)',
        border: 'rgba(34, 197, 94, 0.40)',
        color: 'rgba(34, 197, 94, 1)',
        dotColor: 'rgba(34, 197, 94, 1)',
      };

    case 'rejected':
      return {
        text: 'Rejected',
        bg: 'rgba(239, 68, 68, 0.10)',
        border: 'rgba(239, 68, 68, 0.40)',
        color: 'rgba(239, 68, 68, 1)',
        dotColor: 'rgba(239, 68, 68, 1)',
      };

    case 'saved':
      return {
        text: 'Saved',
        bg: 'rgba(100, 116, 139, 0.10)',
        border: 'rgba(100, 116, 139, 0.35)',
        color: 'rgba(100, 116, 139, 1)',
        dotColor: 'rgba(100, 116, 139, 1)',
      };

    default:
      return null;
  }
};
