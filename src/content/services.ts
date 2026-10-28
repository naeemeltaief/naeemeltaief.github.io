export type ServiceIcon = 'smartphone' | 'rocket' | 'credit-card' | 'plug' | 'layers' | 'compass'

export interface Service {
  id: string
  icon: ServiceIcon
  title: string
  problem: string
  value: string
  proof: string
}

export const services: Service[] = [
  {
    id: 'flutter',
    icon: 'smartphone',
    title: 'Flutter app development',
    problem: 'You need iOS and Android, but not two teams and two codebases drifting apart.',
    value: 'One well-structured Flutter codebase, native where it counts, ready for the stores and for the next feature.',
    proof: 'Shipped across fintech, government, education and logistics.',
  },
  {
    id: 'mvp',
    icon: 'rocket',
    title: 'MVP & product build',
    problem: 'You have an idea and a deadline, and the first version can’t become the thing you throw away.',
    value: 'A focused first release on an architecture that can grow — so v2 builds on v1 instead of replacing it.',
    proof: 'End-to-end delivery from booking flows to national public apps.',
  },
  {
    id: 'payments',
    icon: 'credit-card',
    title: 'Fintech & payment integration',
    problem: 'Tokenization, contactless and scheme SDKs are where generic app experience runs out.',
    value: 'Card digitisation, HCE over NFC, scheme tokenization and SCA flows — with device binding and secure storage done properly.',
    proof: 'HCE tap-to-pay and Mastercard SCA in production.',
  },
  {
    id: 'native',
    icon: 'plug',
    title: 'Native SDK integration',
    problem: 'A vendor hands you an Android and an iOS SDK — and your product is in Flutter.',
    value: 'Clean platform-channel bridges that keep native power behind a tidy Dart API your team can maintain.',
    proof: 'Native payment SDKs bridged into Flutter on both platforms.',
  },
  {
    id: 'architecture',
    icon: 'layers',
    title: 'Architecture & modernisation',
    problem: 'Every change breaks something, and new developers take weeks to become productive.',
    value: 'An architecture review and a practical path toward clear layers, predictable state and shared packages.',
    proof: 'Sets the architecture standard for a fintech team.',
  },
  {
    id: 'direction',
    icon: 'compass',
    title: 'Technical mobile lead',
    problem: 'Your mobile team needs standards, specs and someone to make the hard technical calls.',
    value: 'Mobile technical strategy and roadmap, specs from business and security requirements, code review and mentoring for your mobile developers.',
    proof: 'Leads mobile technical direction at WASL Global.',
  },
]

export const process = [
  {
    step: '01',
    title: 'Understand',
    body: 'Goals, users and constraints first — including the security, scheme or compliance requirements that will shape everything else.',
    output: 'Shared scope & risks',
  },
  {
    step: '02',
    title: 'Architect',
    body: 'Choose the structure before the screens: layers, state management, native boundaries and how the app will grow.',
    output: 'Technical spec',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Short, visible iterations on a clean architecture, with code review and reusable components from day one.',
    output: 'Working increments',
  },
  {
    step: '04',
    title: 'Verify',
    body: 'Real devices, edge cases and failure paths — the unhappy flows matter as much as the happy one.',
    output: 'Release candidate',
  },
  {
    step: '05',
    title: 'Ship & evolve',
    body: 'Store release, documentation and handover — then improvements guided by how people actually use the product.',
    output: 'Live product',
  },
]
