// Skills grouped by what a client or hiring lead actually buys.
// Each group cites where it was used (from the CV) instead of a proficiency score.

export interface Capability {
  id: string
  label: string
  title: string
  description: string
  skills: string[]
  evidence: string
}

export const capabilities: Capability[] = [
  {
    id: 'mobile',
    label: '01',
    title: 'Mobile engineering',
    description:
      'Production apps for iOS and Android from one Flutter codebase — dropping to native Kotlin and Swift where the platform demands it.',
    skills: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Native Android SDK', 'Native iOS SDK', 'Platform channels', 'Push notifications'],
    evidence: 'Production apps across fintech, government, education and logistics.',
  },
  {
    id: 'payments',
    label: '02',
    title: 'Payments & security',
    description:
      'The parts of a payment app that can’t be wrong: tokens, contactless, authentication and keeping secrets secret on the device.',
    skills: ['Card tokenization', 'Card digitisation', 'NFC / HCE', 'Mastercard SCA', 'QR payments', 'Device binding', 'Secure storage'],
    evidence: 'HCE tap-to-pay and Mastercard SCA tokenization at Masarat Fintech.',
  },
  {
    id: 'architecture',
    label: '03',
    title: 'Architecture',
    description:
      'Codebases that stay changeable: clear layers, predictable state and dependencies you can swap and test.',
    skills: ['Clean architecture', 'BLoC', 'MVVM', 'Dependency injection', 'OOP', 'Shared packages'],
    evidence: 'Defines the architecture standard at WASL Global; introduced shared packages at Dojoon.',
  },
  {
    id: 'leadership',
    label: '04',
    title: 'Technical leadership',
    description:
      'Setting direction while still writing code — specs, reviews, mentoring and the hiring that shapes a team.',
    skills: ['Technical direction', 'Technical specs', 'Code review', 'Mentoring', 'Technical interviews', 'Stakeholder communication'],
    evidence: 'Technical Mobile Team Lead at WASL Global.',
  },
  {
    id: 'web',
    label: '05',
    title: 'Web & platform',
    description:
      'A front-end background that still shapes how I build interfaces — plus the APIs and tooling around every app.',
    skills: ['JavaScript', 'Vue.js', 'Next.js', 'SQL', 'RESTful APIs', 'Git', 'CI/CD', 'Cloud services'],
    evidence: 'Web front-ends and content platforms at QANA, 2022 — 2024.',
  },
]
