export function getEmailInitials(email: string): string {
  // Extract the part of the email before the '@'
  const namePart = email.split('@')[0];

  // If there are clear separators like dots or underscores, split by them
  const separators = /[._]/;
  if (separators.test(namePart)) {
    const nameParts = namePart.split(separators);
    return nameParts.map((part) => part[0].toUpperCase()).join('');
  }

  // If no clear separators, assume the first character and the first character after initials are initials
  // Regex matches the first letter and any capital letter that follows non-capital letters
  const match = namePart.match(/(^[a-z])|([A-Z])(?=[a-z])/g);
  if (match) {
    return match.join('').toUpperCase();
  }

  // Default to using the first letter if no clear pattern is identifiable
  return namePart[0].toUpperCase();
}
