import assert from 'node:assert/strict';
import { mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const outDir = '.tmp-crm-api-validation-test';

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const compile = spawnSync(
  [
    'npx',
    'tsc',
    'src/lib/crm/api-validation.ts',
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

const {
  normalizeManualLeadPayload,
  normalizeLeadUpdatePayload,
  normalizeFollowUpCreatePayload,
  normalizeNoteCreatePayload,
  normalizeSettingsUpdatePayload,
  normalizeTeamUpdatePayload,
} = await import(pathToFileURL(`${process.cwd()}/${outDir}/lib/crm/api-validation.js`).href);

const created = normalizeManualLeadPayload({
  fullName: '  Ada Lovelace  ',
  companyName: '',
  workEmail: 'ADA@EXAMPLE.COM',
  whatsappPhone: '019-388 8708',
  ignored: 'nope',
});

assert.equal(created.ok, true);
assert.equal(created.data.full_name, 'Ada Lovelace');
assert.equal(created.data.company_name, 'Independent');
assert.equal(created.data.work_email, 'ada@example.com');
assert.equal(created.data.whatsapp_phone, '+60193888708');
assert.equal(created.data.role_in_business, 'Unknown');
assert.equal(created.data.country_timezone, 'Malaysia');
assert.equal(created.data.preferred_language, 'English');
assert.equal(created.data.business_type, 'Manual CRM Entry');
assert.equal(created.data.service_need, 'Not specified');
assert.equal(created.data.budget_range, 'Not specified');
assert.equal(created.data.timeline, 'Not specified');
assert.equal(created.data.source_page, 'Internal CRM');
assert.equal(created.data.status, 'new');
assert.equal(created.data.priority, 'warm');
assert.equal(created.data.consent, false);
assert.equal(created.data.marketing_opt_in, false);
assert.equal('ignored' in created.data, false);

const invalidEmail = normalizeManualLeadPayload({
  fullName: 'Ada',
  workEmail: 'bad-email',
});
assert.equal(invalidEmail.ok, false);
assert.equal(invalidEmail.fieldErrors.workEmail, 'Enter a valid email address.');

const update = normalizeLeadUpdatePayload({
  status: 'contacted',
  priority: 'hot',
  lastContactedAt: '2026-05-13T01:00:00.000Z',
  fullName: 'Unsafe',
});
assert.equal(update.ok, true);
assert.deepEqual(update.data, {
  status: 'contacted',
  priority: 'hot',
  lastContactedAt: '2026-05-13T01:00:00.000Z',
});

const badUpdate = normalizeLeadUpdatePayload({ status: 'archived' });
assert.equal(badUpdate.ok, false);
assert.equal(badUpdate.fieldErrors.status, 'Choose a valid lead status.');

const followUp = normalizeFollowUpCreatePayload({
  leadId: '11111111-1111-4111-8111-111111111111',
  title: 'Discovery call',
  dueAt: '2026-05-14T02:30:00.000Z',
  contactMethod: 'email',
  notes: 'Bring scope questions',
  extra: true,
});
assert.equal(followUp.ok, true);
assert.deepEqual(followUp.data, {
  leadId: '11111111-1111-4111-8111-111111111111',
  title: 'Discovery call',
  dueAt: '2026-05-14T02:30:00.000Z',
  contactMethod: 'email',
  notes: 'Bring scope questions',
});

const note = normalizeNoteCreatePayload({
  leadId: '11111111-1111-4111-8111-111111111111',
  note: 'Sent proposal',
  noteType: 'follow_up',
});
assert.equal(note.ok, true);
assert.equal(note.data.noteType, 'follow_up');

const badNote = normalizeNoteCreatePayload({
  leadId: '11111111-1111-4111-8111-111111111111',
  note: 'x',
  noteType: 'user',
});
assert.equal(badNote.ok, false);
assert.equal(badNote.fieldErrors.noteType, 'Choose a valid note type.');

const settings = normalizeSettingsUpdatePayload({
  contactEmail: 'OPS@STRATA.AGENCY',
  whatsappNumber: '019-388 8708',
  isConfigured: true,
  unsafe: 'ignored',
});
assert.equal(settings.ok, true);
assert.deepEqual(settings.data, {
  contactEmail: 'ops@strata.agency',
  whatsappNumber: '+60193888708',
  isConfigured: true,
});

const badSettings = normalizeSettingsUpdatePayload({ contactEmail: 'not email' });
assert.equal(badSettings.ok, false);
assert.equal(badSettings.fieldErrors.contactEmail, 'Enter a valid system email.');

const team = normalizeTeamUpdatePayload({ role: 'manager', status: 'disabled', fullName: 'Ignored' });
assert.equal(team.ok, true);
assert.deepEqual(team.data, { role: 'manager', status: 'disabled' });

const badTeam = normalizeTeamUpdatePayload({ role: 'owner' });
assert.equal(badTeam.ok, false);
assert.equal(badTeam.fieldErrors.role, 'Choose a valid CRM role.');

await rm(outDir, { recursive: true, force: true });
console.log('crm api validation tests passed');
