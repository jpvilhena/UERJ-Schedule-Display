import { useEffect, useState } from 'react';
import { ScheduleEntry } from '../services/api';
import './NextClasses.css';

export function NextClasses({ entries }: { entries: ScheduleEntry[] }) {
  const [nextUp, setNextUp] = useState<ScheduleEntry[]>([]);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const upcoming = entries.filter(e => e.end.getTime() > now);
      setNextUp(upcoming.slice(0, 5)); 
    }

    // Run immediately, then every 30s
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [entries]);

  if (nextUp.length === 0) {
    return <p className="next-classes">Sem mais aulas hoje!</p>;
  }

  return (
    <div className="next-classes">
      <ul>
        {nextUp.map((c, i) => (
          <li key={i}>
            {c.subject} em {c.classroom}
            <br/>
            (Término: {c.end.toLocaleTimeString()})
          </li>
        ))}
      </ul>
    </div>
  );
}