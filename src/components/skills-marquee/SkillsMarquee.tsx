import { useMemo, type CSSProperties } from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
  SiNextdotjs,
  SiStripe,
  SiGithub,
  SiDocker,
  SiVercel
} from 'react-icons/si';
import { Globe, Server, Database, Wrench } from 'lucide-react';

interface SkillsMarqueeProps {
  className?: string;
}

interface SkillsMarqueeItem {
  label: string;
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  color: string;
}

/**
 * Renders a horizontally auto-scrolling marquee of skills and services.
 *
 * @param {SkillsMarqueeProps} props Component props.
 * @returns {JSX.Element} The marquee UI.
 */
export default function SkillsMarquee({ className = '' }: SkillsMarqueeProps) {
  const items: SkillsMarqueeItem[] = useMemo(
    () => [
      { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { label: 'React', Icon: SiReact, color: '#61DAFB' },
      { label: 'Next.js', Icon: SiNextdotjs, color: '#111111' },
      { label: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { label: 'Express', Icon: SiExpress, color: '#111111' },
      { label: 'REST APIs', Icon: Server, color: '#2563EB' },
      { label: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
      { label: 'Firestore', Icon: Database, color: '#FFA000' },
      { label: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { label: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { label: 'Stripe', Icon: SiStripe, color: '#635BFF' },
      { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { label: 'Framer Motion', Icon: SiFramer, color: '#0055FF' },
      { label: 'GitHub', Icon: SiGithub, color: '#111111' },
      { label: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { label: 'Vercel', Icon: SiVercel, color: '#111111' },
      { label: 'Deployments', Icon: Globe, color: '#0EA5E9' },
      { label: 'Automation', Icon: Wrench, color: '#F97316' },
    ],
    []
  );

  const repeatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className={`skills-marquee ${className}`} aria-label="Skills and services marquee">
      <div className="skills-marquee__fade skills-marquee__fade--left" aria-hidden="true" />
      <div className="skills-marquee__fade skills-marquee__fade--right" aria-hidden="true" />

      <div className="skills-marquee__viewport">
        <div className="skills-marquee__track">
          {repeatedItems.map((item, index) => (
            <span
              key={`${item.label}-${index}`}
              className="skills-marquee__chip"
              aria-label={item.label}
              style={{ ['--skills-marquee-icon-color' as string]: item.color } as CSSProperties}
            >
              <item.Icon className="skills-marquee__icon" aria-hidden="true" />
              <span className="sr-only">{item.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
