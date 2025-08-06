export const DEPARTMENTS = [
  'historia',
  'filosofia',
  'arqueologia',
  'internacionais',
  'socials',
];

export const DEPARTMENT_LABELS: Record<typeof DEPARTMENTS[number], string> = {
  historia: 'História',
  filosofia: 'Filosofia',
  arqueologia: 'Arqueologia',
  internacionais: 'Relações Internacionais',
  socials: 'Redes Sociais',
};

export const DEPARTMENT_LOGOS: Record<typeof DEPARTMENTS[number], string> = {
  historia: 'Logo_DHIS.png',
  filosofia: 'Logo_DFIL.png',
  arqueologia: 'Logo_DARQ.png',
  internacionais: 'Logo_DRI.png',
};