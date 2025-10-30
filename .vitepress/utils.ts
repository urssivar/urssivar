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

export function cleanHeadword(word: string) {
  const accent = String.fromCharCode(769);
  return word.replace(new RegExp(accent, "g"), "");
}
