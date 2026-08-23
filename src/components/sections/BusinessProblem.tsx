import { Database, EyeOff, GitBranch, ShieldAlert } from 'lucide-react';
import { SectionShell } from '../product/SectionShell';

const disconnects = [
  { icon: Database, title: 'Context is scattered', description: 'Customer facts, team notes and decisions live across separate tools and private conversations.' },
  { icon: GitBranch, title: 'Rules stay implicit', description: 'The real operating logic lives in memory, making handoffs inconsistent and difficult to inspect.' },
  { icon: EyeOff, title: 'Work loses visibility', description: 'Owners can see outputs, but not the context, decision and responsibility behind each action.' },
  { icon: ShieldAlert, title: 'AI lacks boundaries', description: 'Without explicit permissions and approval gates, automation creates risk instead of control.' },
];

export const TheDisconnect = () => (
  <SectionShell
    id="the-disconnect"
    eyebrow="02 · THE DISCONNECT"
    headline="Your business has tools. It still has no shared context."
    support="A CRM can hold records. A chat can hold conversations. A spreadsheet can hold status. None of them becomes an operating layer until rules, ownership and outcomes share one visible system."
  >
    <div className="grid gap-4 sm:grid-cols-2">
      {disconnects.map(({ icon: Icon, title, description }) => (
        <article key={title} className="rounded-[24px] border border-line bg-surface2 p-6 md:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary text-white"><Icon size={20} /></div>
          <h3 className="mt-8 text-2xl font-bold text-primary">{title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">{description}</p>
        </article>
      ))}
    </div>
  </SectionShell>
);
