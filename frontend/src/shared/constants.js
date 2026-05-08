import { Briefcase, Users, Calendar, ShieldCheck } from 'lucide-react';

export const EVENT_TYPES = [
  { id: 'workshop', label: 'Workshop', icon: Briefcase, desc: 'Interactive skill-building sessions' },
  { id: 'talk', label: 'Guest Talk', icon: Users, desc: 'Lectures by external speakers' },
  { id: 'cultural', label: 'Cultural', icon: Calendar, desc: 'Performances, fests, and arts' },
  { id: 'social', label: 'Social Event', icon: Users, desc: 'Mixers and community gatherings' },
  { id: 'competition', label: 'Competition', icon: ShieldCheck, desc: 'Hackathons, debates, contests' },
  { id: 'other', label: 'Other', icon: Calendar, desc: 'Meetings, auditions, etc.' },
];

export const PENDING_EVENTS = [
  { id: 1, name: 'Intro to React Native', org: 'Tech & AI Society', type: 'Workshop', date: 'Oct 28, 2026', venue: 'Lab 2' },
  { id: 2, name: 'Diwali Mela 2026', org: 'Cultural Committee', type: 'Cultural', date: 'Nov 2, 2026', venue: 'Open Ground' },
  { id: 3, name: 'Startup Pitch Deck', org: 'Entrepreneurship Cell', type: 'Competition', date: 'Nov 5, 2026', venue: 'A-101' },
  { id: 4, name: 'Mindfulness Session', org: 'Wellness Club', type: 'Social Event', date: 'Nov 10, 2026', venue: 'Yoga Room' },
];


