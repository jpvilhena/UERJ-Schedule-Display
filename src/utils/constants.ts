export const DEPARTMENTS = [
  'historia',
  'filosofia',
  'arqueologia',
  'internacionais',
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

export const DEPARTMENT_SOCIALS: Record<typeof DEPARTMENTS[number],
{ name: string; url: string }[]> = {
  historia: [
    {
      name:'@departamento.historia.uerj',
      url:'https://www.instagram.com/departamento.historia.uerj?igsh=YnQ4cXphb3NyMGRv',
    },
    {
      name:'@ppgh_uer',
      url:'https://www.instagram.com/ppgh_uerj?igsh=MWlmaWkzNWF1ZnFzMQ%3D%3D',
    }
  ],
  filosofia: [
    {
      name:'@filosofia_uerj',
      url:'https://www.instagram.com/filosofia_uerj?igsh=MTI0Y2N3cHlnN2k1bA%3D%3D',
    },
    {
      name:'@ppgfil_uerj',
      url:'https://www.instagram.com/ppgfil_uerj?igsh=bDFrcXN5MTI2MHZ2',
    },
  ],
  arqueologia: [
    {
      name:'@darq_uerj',
      url:'https://www.instagram.com/darq_uerj?igsh=NzczbHVqcXpnOTg2',
    },
  ],
  
  internacionais: [
    {
      name:'@ppgri_uerj',
      url:'https://www.instagram.com/ppgri_uerj?igsh=MWhpMHF5bDhndTh4Mw%3D%3D',
    },
  ],
}