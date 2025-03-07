export const generateAvatarUrl = (name) => {
  if (!name) return 'https://ui-avatars.com/api/?name=U&background=random'; // Default avatar
  
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();
    
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random`;
};
