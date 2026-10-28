// Employment history. Dates and employers are exactly as on the CV.
// The current role title reflects the requested career update.

export interface Role {
  id: string
  title: string
  company: string
  companyNote?: string
  start: string
  end: string
  type: 'Full time' | 'Part time' | 'Contract'
  /** One line that places this role in the career arc. */
  chapter: string
  highlights: string[]
  stack: string[]
  current?: boolean
}

export const roles: Role[] = [
  {
    id: 'wasl',
    title: 'Technical Mobile Team Lead',
    company: 'WASL Global',
    companyNote: 'Financial Technology',
    start: 'Jun 2026',
    end: 'Present',
    type: 'Full time',
    current: true,
    chapter: 'Direction',
    highlights: [
      'Lead the technical direction of mobile development — the vision, technical strategy and long-term roadmap of the company’s mobile products.',
      'Stay hands-on as lead mobile developer, owning the most security-critical and complex payment features in the codebase.',
      'Guide architectural decisions and set the engineering standard — clean architecture, BLoC and dependency injection — applied through code review and shared internal packages.',
      'Turn payment-scheme and security requirements into implementable technical specs, working directly with product, backend and card-scheme counterparts.',
      'Mentor developers on Flutter, native platform APIs and secure coding; run onboarding and technical interviews.',
    ],
    stack: ['Flutter', 'Kotlin', 'Swift', 'Clean architecture', 'BLoC', 'DI'],
  },
  {
    id: 'ajeer',
    title: 'Mobile Application Developer',
    company: 'Ajeer',
    start: 'Sep 2025',
    end: 'Nov 2025',
    type: 'Part time',
    chapter: 'Delivery',
    highlights: [
      'Built customer-facing Flutter features for an on-demand services platform — booking flows, notifications and REST API integration.',
    ],
    stack: ['Flutter', 'REST APIs', 'Push notifications'],
  },
  {
    id: 'masarat',
    title: 'Mobile Application Developer',
    company: 'Masarat Fintech',
    start: 'Oct 2024',
    end: 'Sep 2026',
    type: 'Full time',
    chapter: 'Payments',
    highlights: [
      'Delivered card digitisation for a national card portfolio: physical cards enrolled into secure digital tokens, with contactless payment at POS via Host Card Emulation (HCE) over NFC through a native Android SDK.',
      'Built Mastercard SCA tokenization for international cards on iOS and Android with the scheme’s native SDKs — enrolment to token, plus payment authorisation by push notification and QR code.',
      'Implemented the security-sensitive layers: device binding, cardholder verification, encrypted local storage of token references and secure API integration.',
      'Bridged native payment SDKs into Flutter through platform channels, keeping one shared product codebase across both platforms.',
    ],
    stack: ['Flutter', 'Kotlin', 'Swift', 'NFC / HCE', 'Platform channels', 'Secure storage'],
  },
  {
    id: 'dojoon',
    title: 'Mobile Application Developer',
    company: 'Dojoon',
    start: 'Sep 2023',
    end: 'Aug 2024',
    type: 'Full time',
    chapter: 'Public sector',
    highlights: [
      'Delivered Flutter applications for public-sector clients, including the 1415 emergency contact centre and municipal employee services.',
      'Introduced reusable architecture and shared packages that shortened delivery time on subsequent projects.',
    ],
    stack: ['Flutter', 'Dart', 'Shared packages', 'REST APIs'],
  },
  {
    id: 'ard',
    title: 'Software Developer',
    company: 'ARD for Computers & Technology',
    start: 'Dec 2022',
    end: 'Aug 2023',
    type: 'Full time',
    chapter: 'Foundations',
    highlights: [
      'Developed and supported business software and internal tools across mobile and web layers with REST APIs.',
    ],
    stack: ['Mobile', 'Web', 'REST APIs'],
  },
  {
    id: 'qana',
    title: 'Frontend Developer',
    company: 'QANA',
    start: 'May 2022',
    end: 'Oct 2024',
    type: 'Contract',
    chapter: 'Interfaces',
    highlights: [
      'Built and maintained web front-ends and content platforms for client projects, translating design files into responsive, accessible interfaces.',
      'Worked across a long-running client portfolio — releases, fixes and incremental feature delivery.',
    ],
    stack: ['JavaScript', 'Vue.js', 'Next.js', 'WordPress'],
  },
]

export const education = [
  {
    title: 'Bachelor’s degree, Information Technology — Mobile Computing',
    place: 'University of Tripoli',
    period: '2016 — 2023',
  },
  { title: 'International Computer Driving Licence (ICDL)', place: 'Certification', period: '' },
]
