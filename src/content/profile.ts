// Single source of truth for identity, links and SEO copy.
// Everything here is taken from the CV (Naeem_Eltaief_CV.pdf) or verified public profiles.

export const profile = {
  name: 'Naeem Eltaief',
  shortName: 'Naeem',
  role: 'Technical Mobile Team Lead',
  company: 'WASL Global',
  location: 'Tripoli, Libya',
  timezone: 'Africa/Tripoli',
  utcOffset: 'UTC+2',
  languages: ['Arabic (native)', 'English (professional)'],
  email: 'naeem.eltaief@me.com',
  phone: '+218 91 296 5097',
  phoneHref: 'tel:+218912965097',
  whatsappHref: 'https://wa.me/218912965097',
  cvPath: '/Naeem_Eltaief_CV.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/naeemeltaief',
    github: 'https://github.com/naeemeltaief',
    pubdev: 'https://pub.dev/packages/dynamic_form_builder',
  },
  seo: {
    title: 'Naeem Eltaief — Mobile Application Developer',
    description:
      'Mobile engineer and Technical Mobile Team Lead in Tripoli, Libya. Flutter and native Android/iOS apps, secure payment experiences — card tokenization, HCE contactless over NFC, Mastercard SCA — and clean, maintainable architecture.',
  },
} as const

export type Profile = typeof profile
