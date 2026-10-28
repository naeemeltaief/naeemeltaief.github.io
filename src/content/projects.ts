// Case studies. Copy is rewritten for clarity but every fact traces back to the CV.
// Details still to be supplied live in ./pending.ts (development builds only).

export type VisualKind = 'hce' | 'sca' | 'emergency' | 'formbuilder'
export type IconName = 'graduation' | 'users' | 'map' | 'ship'

export interface Project {
  slug: string
  title: string
  kicker: string
  summary: string
  featured: boolean
  visual?: VisualKind
  icon?: IconName
  domain: string
  /** Where the work was done, when the CV states it. */
  context?: string
  client?: string
  platforms: string[]
  role?: string
  problem: string
  approach: { title: string; body: string }[]
  stack: string[]
  /** Verified, CV-backed statements of what was delivered. */
  delivered: string[]
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: 'hce-card-tokenization',
    title: 'Digital Card Tokenization',
    kicker: 'HCE contactless payments',
    summary:
      'Physical bank cards become secure tokens on the phone — and customers tap to pay at any contactless terminal.',
    featured: true,
    visual: 'hce',
    domain: 'Fintech · Payments',
    context: 'Masarat Fintech',
    platforms: ['Android', 'Flutter'],
    role: 'Mobile application developer — payment flow, native SDK integration and security layers',
    problem:
      'A national card portfolio needed to live on customers’ phones. That means turning a plastic card into a device-held token, then making the phone behave like a contactless card at a real POS terminal — without ever exposing card data.',
    approach: [
      {
        title: 'Full token lifecycle',
        body: 'Covered the whole journey, not just the happy path: card enrolment, token provisioning, cardholder verification, and token suspension or deletion.',
      },
      {
        title: 'Host Card Emulation over NFC',
        body: 'Contactless payment runs through HCE on Android, integrated via a native Android SDK so the phone can answer the terminal like a card.',
      },
      {
        title: 'Native SDK, shared product',
        body: 'The native payment SDK is bridged into Flutter through platform channels, so the product UI stays in one shared codebase while payment-critical code stays native.',
      },
      {
        title: 'Security as a layer, not an afterthought',
        body: 'Device binding, cardholder verification, encrypted local storage of token references and secure API integration sit beneath the UI as their own layer.',
      },
    ],
    stack: ['Flutter', 'Kotlin', 'Native Android SDK', 'NFC / HCE', 'Platform channels', 'Encrypted storage'],
    delivered: [
      'Card digitisation for a national card portfolio.',
      'Tap-to-pay at contactless POS terminals through HCE over NFC.',
      'End-to-end token lifecycle: enrolment, provisioning, verification, suspension and deletion.',
    ],
  },
  {
    slug: 'mastercard-sca-tokenization',
    title: 'Mastercard SCA Tokenization',
    kicker: 'Scheme tokens on iOS & Android',
    summary:
      'International Mastercard cards enrolled into scheme-issued tokens, with strong customer authentication by push notification and QR code.',
    featured: true,
    visual: 'sca',
    domain: 'Fintech · Payments',
    context: 'Masarat Fintech',
    platforms: ['iOS', 'Android', 'Flutter'],
    role: 'Mobile application developer — native SDK integration on both platforms',
    problem:
      'International cards needed the same digital experience — but on Mastercard’s terms: scheme-issued tokens and strong customer authentication (SCA) for every sensitive action, on both iOS and Android.',
    approach: [
      {
        title: 'Two platforms, scheme SDKs',
        body: 'Integrated Mastercard’s native SDKs on iOS and Android, from enrolment of the physical card through to an issued token.',
      },
      {
        title: 'Authentication customers understand',
        body: 'Payment authorisation is approved by push notification or by QR code — strong authentication that still feels like a single, clear step.',
      },
      {
        title: 'One product layer',
        body: 'Native SDK capabilities are exposed to the Flutter product through platform channels, keeping behaviour consistent across platforms.',
      },
    ],
    stack: ['Flutter', 'Swift', 'Kotlin', 'Mastercard native SDKs', 'Push notifications', 'QR payments'],
    delivered: [
      'Enrolment from physical Mastercard to scheme-issued token on iOS and Android.',
      'Payment authorisation through push notification and QR code.',
    ],
  },
  {
    slug: 'local-contact-center-1415',
    title: 'Local Contact Center 1415',
    kicker: 'National emergency contact app',
    summary:
      'A government emergency app that connects citizens to medical, fire and security services — faster.',
    featured: true,
    visual: 'emergency',
    domain: 'Government · Public safety',
    context: 'Dojoon',
    client: 'A Libyan government ministry',
    platforms: ['Flutter'],
    role: 'Mobile application developer',
    problem:
      'In an emergency every second of friction matters. Citizens needed one dependable way to reach emergency services and get help moving for medical, fire and security incidents.',
    approach: [
      {
        title: 'Clarity under stress',
        body: 'A national-scale public app has to be usable by anyone, on any phone, at the worst moment of their day — so the experience centres on reaching the right service quickly.',
      },
      {
        title: 'Built on shared foundations',
        body: 'Delivered in Flutter as part of Dojoon’s public-sector work, where reusable architecture and shared packages shortened delivery on later projects.',
      },
    ],
    stack: ['Flutter', 'Dart', 'REST APIs', 'Shared packages'],
    delivered: [
      'National emergency contact application for a Libyan government ministry.',
      'Connects citizens to emergency services for medical, fire and security incidents.',
    ],
  },
  {
    slug: 'dynamic-form-builder',
    title: 'Dynamic Form Builder',
    kicker: 'Open-source Flutter package',
    summary:
      'A published Flutter package that turns a list of field definitions into a complete, validated form.',
    featured: true,
    visual: 'formbuilder',
    domain: 'Open source · Developer tooling',
    platforms: ['Flutter', 'pub.dev'],
    role: 'Author and maintainer',
    problem:
      'Production apps — especially government and enterprise ones — are full of forms. Writing each one by hand means repeated widgets, repeated validation and repeated bugs.',
    approach: [
      {
        title: 'Forms as data',
        body: 'Describe fields once as a list of definitions; the package generates the complete form, with validation and multiple field types.',
      },
      {
        title: 'Extracted from real work',
        body: 'Built to remove repetitive form code from production apps, then published so other Flutter teams can use it.',
      },
    ],
    stack: ['Dart', 'Flutter', 'pub.dev'],
    delivered: [
      'Published on pub.dev as dynamic_form_builder.',
      'Generates complete forms from field definitions, with validation and multiple field types.',
    ],
    links: [
      { label: 'View on pub.dev', href: 'https://pub.dev/packages/dynamic_form_builder' },
      { label: 'Source on GitHub', href: 'https://github.com/naeemeltaief/dynamic_form_builder' },
    ],
  },
  {
    slug: 'refd',
    title: 'Refd',
    kicker: 'Schools management app',
    summary:
      'Students, parents and schools in one experience: progress tracking, learning materials, notifications and direct messaging.',
    featured: false,
    icon: 'graduation',
    domain: 'Education',
    platforms: ['Mobile'],
    problem:
      'Families and schools were communicating across scattered channels, with no single place to follow a student’s progress.',
    approach: [
      {
        title: 'One shared experience',
        body: 'Academic progress tracking, access to learning materials, school notifications and direct communication between families and staff, in a single app.',
      },
    ],
    stack: ['Flutter', 'Push notifications', 'REST APIs'],
    delivered: [
      'Academic progress tracking for students and parents.',
      'Learning materials, school notifications and direct family–staff communication.',
    ],
  },
  {
    slug: 'baldety',
    title: 'Baldety',
    kicker: 'Municipal HR app',
    summary:
      'Municipal employees of the Ministry of Local Government get quick access to records, ministry communications and feedback.',
    featured: false,
    icon: 'users',
    domain: 'Government · HR',
    client: 'Ministry of Local Government',
    platforms: ['Mobile'],
    problem:
      'Municipal employees needed a direct, self-service line to their own records and to ministry communications.',
    approach: [
      {
        title: 'Self-service first',
        body: 'Quick access to personal records, ministry communications and a channel to submit feedback.',
      },
    ],
    stack: ['Flutter', 'REST APIs'],
    delivered: ['Personal records, ministry communications and feedback submission for municipal employees.'],
  },
  {
    slug: 'environmental-services',
    title: 'Environmental Services',
    kicker: 'Map-based government platform',
    summary:
      'A map view of commercial activities, landfills and other sites managed by the Ministry of Local Government’s Environmental Department.',
    featured: false,
    icon: 'map',
    domain: 'Government · Geo',
    client: 'Environmental Department, Ministry of Local Government',
    platforms: ['Mobile'],
    problem: 'Sites managed by the Environmental Department needed to be visible and navigable in one place.',
    approach: [
      {
        title: 'Map-first',
        body: 'A map-based platform for viewing commercial activities, landfills and other managed sites.',
      },
    ],
    stack: ['Flutter', 'Maps', 'REST APIs'],
    delivered: ['Map-based viewing of commercial activities, landfills and other managed sites.'],
  },
  {
    slug: 'roya-shipping',
    title: 'Roya Shipping',
    kicker: 'Sea-freight tracking',
    summary:
      'Authorised users create shipments, record consignment details and receive status notifications through the shipping lifecycle.',
    featured: false,
    icon: 'ship',
    domain: 'Logistics',
    platforms: ['Mobile'],
    problem: 'Shipments needed a clear, trackable lifecycle from creation to delivery, visible to the right people.',
    approach: [
      {
        title: 'Lifecycle + notifications',
        body: 'Authorised users create shipments and record consignment details, then receive status notifications as freight moves.',
      },
    ],
    stack: ['Flutter', 'Push notifications', 'REST APIs'],
    delivered: ['Shipment creation, consignment details and lifecycle status notifications for authorised users.'],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const indexProjects = projects.filter((p) => !p.featured)
export const findProject = (slug: string) => projects.find((p) => p.slug === slug)
