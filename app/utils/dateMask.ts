export function formatDateInput(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  
  // Limit to 6 digits (mmddyy)
  const limited = digits.slice(0, 6);
  
  // Format as mm/dd/yy
  if (limited.length === 0) return "";
  if (limited.length <= 2) return limited;
  if (limited.length <= 4) return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
}

export function normalizeDateInput(value: string): string {
  // Remove slashes and ensure 6 digits
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length !== 6) return "";
  
  // Format as mm/dd/yy
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
