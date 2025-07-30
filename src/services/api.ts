import { ClassSchedule } from '../utils/types';
import { blockTimes } from '../utils/blockTimes';

export interface ScheduleEntry extends ClassSchedule {
  start: Date;
  end: Date;
  dayOfWeek: string;
}

const dowMap: Record<string, number> = {
  '2ª': 1,    // Monday
  '3ª': 2,    // Tuesday
  '4ª': 3,    // Wednesday
  '5ª': 4,    // Thursday
  '6ª': 5,    // Friday
  'Sáb.': 6   // Saturday
};

export async function fetchSchedule(department: string): Promise<ScheduleEntry[]> {
  const res = await fetch(`/schedules/${department}.json`);
  if (!res.ok) throw new Error(`Failed to load schedule: ${res.status}`);
  const data: ClassSchedule[] = await res.json();

  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth();
  const day   = today.getDate();
  const todayDow = today.getDay();  // 0=Sunday, 1=Monday...

  return data.flatMap(entry => {
    // Break multi‑session strings into segments, e.g.
    // "3ª (T2-T3)5ª (T2-T3)" → ["3ª (T2-T3)", "5ª (T2-T3)"]
    const segments = entry.time.match(/(Sáb\.|[2-6]ª)\s*\([^)]*\)/g) || [];
    return segments.flatMap(seg => {

      // Extract the day‑of‑week, e.g. "3ª" or "Sáb."
      const dowMatch = seg.match(/^(Sáb\.|[2-6]ª)/);
      if (!dowMatch) return [];
      const dow = dowMatch[1];
      if (dowMap[dow] !== todayDow) return []; // Skip if not today

      //  Extract and clean the (...) text
      const paren = seg.match(/\(([^)]+)\)/);
      if (!paren) return [];
      const rangeText = paren[1].replace(/\s+/g, '');  // "N1-N4" or "M2"
      
      // Split into codes
      const parts = rangeText.split('-');
      const startCode = parts[0];
      const endCode   = parts[1] || parts[0];
      
      // Lookup the real times
      const btStart = blockTimes[startCode];
      const btEnd   = blockTimes[endCode];
      if (!btStart || !btEnd) return [];
      
      // Build Date objects
      const [sh, sm] = btStart.start.split(':').map(Number);
      const [eh, em] = btEnd.end.split(':').map(Number);
      const start = new Date(year, month, day, sh, sm);
      const end   = new Date(year, month, day, eh, em);
      

      return [{
        ...entry,
        start,
        end,
        dayOfWeek: dow
      } as ScheduleEntry];
    });
  });
}