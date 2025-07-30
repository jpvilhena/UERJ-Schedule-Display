import { useEffect, useState } from 'react';
import { DEPARTMENTS, DEPARTMENT_LABELS, DEPARTMENT_LOGOS} from '../utils/constants';
import { ScheduleEntry, fetchSchedule } from '../services/api';
import { ClassSchedule } from './ClassSchedule';
import { NextClasses } from './NextClasses';
import './ScheduleCarousel.css';

const INTERVAL_MS = 10_000; // 10 seconds

export function ScheduleCarousel() {
  const [idx, setIdx] = useState(0);
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const currentDept = DEPARTMENTS[idx];
  const logoFile = DEPARTMENT_LOGOS[currentDept];
  const logoSrc  = `/logos/${logoFile}`;

  // Whenever idx changes, load that department’s JSON
  useEffect(() => {
    const dept = DEPARTMENTS[idx];
    fetchSchedule(dept)
      .then(data => setEntries(data))
      .catch(console.error);
  }, [idx]);

  // Advance idx every INTERVAL_MS milliseconds
  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % DEPARTMENTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);


  return (
    <div className="carousel-container">
      <header className="carousel-header">
        <img src='logos\Logo_UERJ.png' alt='UERJ logo' height={60}/>
        <h1>{DEPARTMENT_LABELS[currentDept]}</h1>
        <img src={logoSrc} alt={'${currentDept} logo'} height={60}/>
      </header>

      <main className="carousel-main">
        <ClassSchedule entries={entries} />
        <NextClasses entries={entries} />
      </main>

      <footer className="carousel-footer">
      </footer>
    </div>
  );
}
