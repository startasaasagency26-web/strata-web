import { ArrowRight, ChartNoAxesCombined, Clapperboard, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/liquid-glass-button';
import { CONTACT } from '../../config/contact';

const systems = [
  {
    icon: <Clapperboard size={26} className="text-primary" />,
    title: 'Demand Engine',
    subtitle: 'Create & Feed Attention',
    description:
      'Generates targeted commercial attention through high-converting content, paid creative, and campaigns that feed qualified demand directly into your operating system.',
    bullets: [
      'Content production: short-form video assets, hooks, and scripts',
      'Paid media execution: Meta and TikTok campaign management',
      'Acquisition strategy: offer design and creative testing',
      'Landing experiences: conversion-focused assets',
      'Demand analytics: campaign performance and audience tracking',
    ],
    cta: 'Book a Revenue Systems Audit',
  },
  {
    icon: <ChartNoAxesCombined size={26} className="text-primary" />,
    title: 'Revenue OS',
    subtitle: 'Convert, Operate & Optimize Demand',
    description:
      'The central operating infrastructure that captures inbound leads, runs AI qualification, automates follow-up, and manages sales pipelines with full operational visibility.',
    bullets: [
      'Inbound capture: landing pages, forms, and WhatsApp widgets',
      'Centralized CRM: deal stages, lead history, and ownership',
      'AI qualification: automated lead scoring and context extraction',
      'Automation: WhatsApp & email follow-up sequences',
      'Sales operations: staff task assignment and performance reporting',
    ],
    cta: 'Book a Revenue Systems Audit',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">CORE SYSTEMS</p>
            <h2 className="text-5xl md:text-6xl font-black leading-none tracking-[-0.04em] text-primary uppercase">
              Demand Engine <br /> Feeds Revenue OS.
            </h2>
          </div>
          <p className="text-xs font-mono text-muted max-w-md uppercase leading-relaxed">
            Growth fails when demand creation and revenue operations run independently. Strata connects the attention layer directly into your revenue infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {systems.map((system, idx) => (
            <motion.article
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bento-card group flex min-h-[520px] flex-col justify-between p-8 md:p-10"
            >
              <div>
                <div className="mb-8 w-14 h-14 rounded-2xl border border-border flex items-center justify-center bg-background group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <div className="group-hover:text-white transition-colors duration-500">
                    {system.icon}
                  </div>
                </div>
                <p className="mb-3 text-[10px] font-mono font-bold tracking-[0.28em] text-muted uppercase">
                  {system.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-primary mb-5 tracking-[-0.04em] uppercase">
                  {system.title}
                </h3>
                <p className="text-muted text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
                  {system.description}
                </p>
                <ul className="grid gap-3 mb-10">
                  {system.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm font-sans text-primary/70">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                asChild
                variant={idx === 1 ? 'glassStrong' : 'glass'}
                className="w-fit h-auto rounded-full px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              >
                <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                  {system.cta}
                  <ArrowRight size={13} />
                </Link>
              </Button>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-3xl text-center text-2xl md:text-4xl font-black tracking-[-0.04em] text-primary uppercase"
        >
          Demand Engine creates attention. Revenue OS captures, qualifies, and converts it.
        </motion.p>
      </div>
    </section>
  );
};
