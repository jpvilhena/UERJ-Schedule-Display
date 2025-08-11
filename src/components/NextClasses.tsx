import { useEffect, useState } from 'react';
import { ScheduleEntry } from '../services/api';
import './NextClasses.css';

export function NextClasses({ entries }: { entries: ScheduleEntry[] }) {
  const [nextUp, setNextUp] = useState<ScheduleEntry[]>([]);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const upcoming = entries.filter(e => e.end.getTime() > now);
      setNextUp(upcoming.slice(0, 10)); 
    }

    // Run immediately, then every 30s
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [entries]);

  if (nextUp.length === 0) {
    return (
    <div className="next-classes">
      <h2 className='table-headers'>Proximas Aulas</h2>
      <p className="listed-next-classes" style={{textAlign:'center', marginTop:'4rem'}}>Sem mais aulas hoje!</p>
    </div>
    );
  }

  return (
    <div className="next-classes">
      <h2 className='table-headers'>Proximas Aulas:</h2>
      <ul>
        {nextUp.map((c, i) => (
          <li key={i} className='listed-next-classes'>
            {c.subject} em {c.classroom}
            <br/>
            (Término: {c.end.toLocaleTimeString()})
          </li>
        ))}
      </ul>
    </div>
  );
}