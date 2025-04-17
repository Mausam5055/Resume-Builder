
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(
  startDate: string,
  endDate: string,
  isCurrentPosition?: boolean
): string {
  // Parse the dates from YYYY-MM format
  const formatMonthYear = (dateString: string): string => {
    if (!dateString) return '';
    
    const [year, month] = dateString.split('-');
    if (!year || !month) return '';
    
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  const formattedStartDate = formatMonthYear(startDate);
  
  if (isCurrentPosition) {
    return `${formattedStartDate} - Present`;
  }
  
  const formattedEndDate = formatMonthYear(endDate);
  
  if (formattedStartDate && formattedEndDate) {
    return `${formattedStartDate} - ${formattedEndDate}`;
  }
  
  return formattedStartDate || formattedEndDate || '';
}

export function getInitials(name: string): string {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
