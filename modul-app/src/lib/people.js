// Studio portraits by person name. Unknown names fall back to initials in <Avatar>.
const PEOPLE = {
  'Elena Marsh': 12, 'Aiko Tan': 6, 'Theo Lund': 15, 'Rui Costa': 4, 'Jonas Weil': 13, 'Mira Halden': 5, 'Karin Holm': 14, 'Siri Dahl': 2,
  'Mia Sand': 17, 'Lars Kvarn': 11, 'Nora Vik': 10, 'Johan Orsa': 3, 'Ida Brask': 1, 'Henrik Fjell': 7, 'Mads Berg': 9,
};
export const photoFor = name => (PEOPLE[name] ? '/assets/people/p' + PEOPLE[name] + '.jpg' : undefined);
