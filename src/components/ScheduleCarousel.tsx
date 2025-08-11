import { useEffect, useState } from 'react';
import { DEPARTMENTS, DEPARTMENT_LABELS, DEPARTMENT_LOGOS, DEPARTMENT_COLORS } from '../utils/constants';
import { ScheduleEntry, fetchSchedule } from '../services/api';
import { ClassSchedule } from './ClassSchedule';
import { NextClasses } from './NextClasses';
import './ScheduleCarousel.css';
import { MP4Player } from './VideoPlayer';

const INTERVAL_MS = 5_000; // 20 seconds

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
    if (currentDept === 'socials') return;
    fetchSchedule(DEPARTMENTS[idx])
      .then(data => setEntries(sortByStart(data)))
      .catch(console.error);
  }, [idx]);

  // Advance idx every INTERVAL_MS milliseconds
  useEffect(() => {
    if (currentDept === 'socials') return;

    const id = setInterval(() => {
      setIdx(i => (i + 1) % DEPARTMENTS.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [idx]);

  // Shows the schedule until we reach the idx of the video
  if(currentDept!=='socials') {
    return (
      <div className="carousel-container">
        <header className="carousel-header" style={{ backgroundImage: DEPARTMENT_COLORS[currentDept] }}>
          <img src='logos\Logo_UERJ.png' id='UERJ-logo' alt='UERJ logo' height={60}/>
          <h1>{DEPARTMENT_LABELS[currentDept]}</h1>
          <img src={logoSrc} id='dept-logo' alt={'${currentDept} logo'} height={60}/>
        </header>

        <main className="carousel-main">
          <ClassSchedule entries={entries} />
          <NextClasses entries={entries} />
        </main>
      </div>
    )
  }else {
    return (
      <div className='socials-video'>
        <MP4Player
        onVideoEnd={() => setIdx(i => (i + 1) % DEPARTMENTS.length)}
        />
      </div>
    )
  }
}