import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '—';
  try {
    return format(typeof date === 'string' ? parseISO(date) : date, 'dd MMM yyyy');
  } catch {
    return '—';
  }
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  try {
    return format(typeof date === 'string' ? parseISO(date) : date, 'dd MMM yyyy, h:mm a');
  } catch {
    return '—';
  }
};

export const formatRelative = (date) => {
  if (!date) return '—';
  try {
    return formatDistanceToNow(typeof date === 'string' ? parseISO(date) : date, { addSuffix: true });
  } catch {
    return '—';
  }
};

export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    return format(typeof date === 'string' ? parseISO(date) : date, "yyyy-MM-dd'T'HH:mm");
  } catch {
    return '';
  }
};

export const genderBadgeVariant = (gender) => {
  if (gender === 'Male') return 'blue';
  if (gender === 'Female') return 'purple';
  return 'default';
};

export const currentSemester = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return month <= 6 ? `${year}-S1` : `${year}-S2`;
};
