import { useEffect, useState } from 'react';
import { DEPARTMENTS, DEPARTMENT_LABELS, DEPARTMENT_LOGOS} from '../utils/constants';
import { ScheduleEntry, fetchSchedule } from '../services/api';
import { ClassSchedule } from './ClassSchedule';
import { NextClasses } from './NextClasses';
import './ScheduleCarousel.css';

const INTERVAL_MS = 12_000; // 12 seconds

export function ScheduleCarousel() {
  const [idx, setIdx] = useState(0);
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const currentDept = DEPARTMENTS[idx];
  const logoFile = DEPARTMENT_LOGOS[currentDept];
  const logoSrc  = `logos/${logoFile}`;

  function sortByStart(entries: ScheduleEntry[]): ScheduleEntry[] {
    return [...entries].sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  // Whenever idx changes, load that department’s JSON
  useEffect(() => {
    fetchSchedule(DEPARTMENTS[idx])
      .then(data => setEntries(sortByStart(data)))
      .catch(console.error);
  }, [idx]);

  // Advance idx every INTERVAL_MS milliseconds
  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % DEPARTMENTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);


if (currentDept !== "socials") {
  return (
    <div className="carousel-container">
      <header className="carousel-header">
        <img src='logos\Logo_UERJ.png' id='UERJ-logo' alt='UERJ logo' height={60}/>
        <h1>{DEPARTMENT_LABELS[currentDept]}</h1>
        <img src={logoSrc} alt={'${currentDept} logo'} height={60}/>
      </header>

      <main className="carousel-main">
        <ClassSchedule entries={entries} />
        <NextClasses entries={entries} />
      </main>
    </div>
  );
} else {
    return (
      <div className="carousel-container">
        <div className='card-container'>
          <img src='Card_img\Redes_sociais_site.png' alt='Informações Redes Sociais IFCH'/>
        </div>
      </div>
    )
  }
}