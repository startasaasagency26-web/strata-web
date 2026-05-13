import assert from 'node:assert/strict';
import { mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const outDir = '.tmp-lead-schema-test';

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const compile = spawnSync(
  [
    'npx',
    'tsc',
    'src/lib/crm/lead-schema.ts',
    '--ignoreConfig',
    '--target',
    'ES2023',
    '--module',
    'ES2022',
    '--moduleResolution',
    'bundler',
    '--outDir',
    outDir,
    '--skipLibCheck',
  ].join(' '),
  { encoding: 'utf8', shell: true },
);

if (compile.status !== 0) {
  console.error(compile.stdout);
  console.error(compile.stderr);
  process.exit(compile.status ?? 1);
}

const { validateLeadPayload } = await import(
  pathToFileURL(`${process.cwd()}/${outDir}/lead-schema.js`).href
);

const validPayload = {
  fullName: '  Amirul Afiz  ',
  companyName: '  Strata Agency  ',
  workEmail: 'Startasaasagency26@gmail.com',
  whatsappPhone: '019-388 8708',
  roleInBusiness: 'Founder / Owner',
  countryTimezone: 'Malaysia / GMT+8',
  preferredLanguage: 'English',
  businessType: 'Service business',
  serviceNeed: 'Business website',
  currentProblem: 'Lead flow needs a clearer qualification system.',
  budgetRange: 'RM5,000-RM10,000',
  timeline: 'Within 30 days',
  consent: true,
};

const validResult = validateLeadPayload(validPayload, {
  sourcePage: '/request-demo',
  now: () => new Date('2026-05-07T00:00:00.000Z'),
});

assert.equal(validResult.ok, true);
assert.equal(validResult.lead.fullName, 'Amirul Afiz');
assert.equal(validResult.lead.companyName, 'Strata Agency');
assert.equal(validResult.lead.workEmail, 'startasaasagency26@gmail.com');
assert.equal(validResult.lead.whatsappPhone, '+60193888708');
assert.equal(validResult.lead.sourcePage, '/request-demo');
assert.equal(validResult.lead.rawPayload.fullName, validPayload.fullName);

const invalidResult = validateLeadPayload(
  {
    fullName: '',
    companyName: '',
    workEmail: 'not-an-email',
    whatsappPhone: '',
    roleInBusiness: '',
    countryTimezone: '',
    preferredLanguage: '',
  },
  { sourcePage: '/request-demo' },
);

assert.equal(invalidResult.ok, false);
assert.equal(invalidResult.fieldErrors.fullName, 'Full name is required.');
assert.equal(invalidResult.fieldErrors.companyName, 'Company name is required.');
assert.equal(invalidResult.fieldErrors.workEmail, 'Enter a valid email address.');
assert.equal(invalidResult.fieldErrors.whatsappPhone, 'WhatsApp / phone is required.');

await rm(outDir, { recursive: true, force: true });
console.log('lead schema tests passed');
