// Custom slugify that preserves Cyrillic characters
export const customSlugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')           // spaces to dashes
    .replace(/[^\p{L}\p{N}-]/gu, '') // keep only letters, numbers, and dashes
    .replace(/-+/g, '-')             // collapse multiple dashes
    .replace(/^-|-$/g, '')           // trim leading/trailing dashes
}
