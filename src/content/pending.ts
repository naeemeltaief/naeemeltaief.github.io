// Details NOT in the CV that still need to be supplied, per case study.
// Imported only behind `import.meta.env.DEV`, so none of this ships in production builds.
export const pending: Record<string, string[]> = {
  'hce-card-tokenization': [
      'Launch date and product/brand name (if it can be named publicly)',
      'Approved screenshots or screen recordings',
      'Any shareable outcome figures (e.g. cards digitised, transactions)',
    ],
  'mastercard-sca-tokenization': [
      'Product/brand name (if it can be named publicly)',
      'Approved screenshots of the enrolment and approval flows',
      'Release timeline and any shareable outcome figures',
    ],
  'local-contact-center-1415': [
      'Your specific responsibilities on the project',
      'App Store / Google Play links, if public',
      'Approved screenshots',
    ],
  'dynamic-form-builder': [],
  'refd': ['Where/for whom it was built, and your role', 'Store links and screenshots'],
  'baldety': ['Confirm employer/context (likely Dojoon municipal employee services)', 'Your role, store links and screenshots'],
  'environmental-services': ['Employer/context and your role', 'Screenshots'],
  'roya-shipping': ['Employer/context and your role', 'Store links and screenshots'],
}
