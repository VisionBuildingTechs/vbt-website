export const contactRegions = {
  argentina: {
    label: "Argentina",
    phone: "+54 9 261 7170257",
    whatsapp: "5492617170257",
    telephone: "+5492617170257",
  },
  panama: {
    label: "Panamá",
    phone: "+507 66284172",
    whatsapp: "50766284172",
    telephone: "+50766284172",
  },
} as const;
export type ContactRegion = keyof typeof contactRegions;
export const contactEmails = {
  general: "info@visionlatam.com",
  projects: "simon@visionbuildingtechs.com",
} as const;
