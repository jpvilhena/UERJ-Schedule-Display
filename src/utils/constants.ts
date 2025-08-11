export const DEPARTMENTS = [
  'historia',
  'filosofia',
  'arqueologia',
  'internacionais',
  'socials'
];

export const DEPARTMENT_LABELS: Record<typeof DEPARTMENTS[number], string> = {
  historia: 'História',
  filosofia: 'Filosofia',
  arqueologia: 'Arqueologia',
  internacionais: 'Relações Internacionais',
};

export const DEPARTMENT_LOGOS: Record<typeof DEPARTMENTS[number], string> = {
  historia: 'Logo_DHIS.png',
  filosofia: 'Logo_DFIL.png',
  arqueologia: 'Logo_DARQ.png',
  internacionais: 'Logo_DRI.png',
};

export const DEPARTMENT_COLORS: Record<typeof DEPARTMENTS[number], string> = {
  historia: 'linear-gradient(to bottom, #8a3030 -10%, #993333 50%',
  filosofia: 'linear-gradient(to bottom, #1d1d36 -10%, #333361ff 40%',
  arqueologia: 'linear-gradient(to bottom, #d3340dff 10%, #fd3602 50%',
  internacionais: 'linear-gradient(to bottom, #096c7eff 10%, #01788d 50%',
};