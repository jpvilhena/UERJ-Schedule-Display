import './ClassSchedule.css';
import { ScheduleEntry } from '../services/api';

export function ClassSchedule({ entries }: { entries: ScheduleEntry[] }) {
  // Split data so we show two tables:
  const mid = Math.ceil(entries.length / 2);
  const firstHalf  = entries.slice(0, mid);
  const secondHalf = entries.slice(mid);


  return (
    <div className="two-tables">
      {[firstHalf, secondHalf].map((chunk, tableIdx) => (
      <table className="schedule-table" key={tableIdx}>
        <thead>
          <tr>
            <th className="t-time-room">Hora</th>
            <th>Disciplina</th>
            <th>Prof.</th>
            <th className="t-time-room">Sala</th>
          </tr>
        </thead>
        <tbody>
          {chunk.map((e, i) => (
            <tr key={i}>
              <td className="t-time-room">{e.time}</td>
              <td>{e.subject}</td>
              <td>{e.instructor}</td>
              <td className="t-time-room">{e.classroom}</td>
            </tr>
        ))}
      </tbody>
    </table>
    ))}
  </div>
  );
}