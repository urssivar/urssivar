export function customSlugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function dateString(date: Date) {
  return date.toString().substring(0, 10);
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
