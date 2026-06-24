const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * A subtle "Last updated <Month D, YYYY>" line, parsed from an ISO date string
 * (YYYY-MM-DD). Renders a semantic <time> so the date is machine-readable too.
 * Parsed by hand (not `new Date`) to avoid timezone off-by-one shifts.
 */
export function LastUpdated({ date }: { date: string }) {
  const [year, month, day] = date.split("-").map(Number);
  const formatted = `${MONTHS[month - 1]} ${day}, ${year}`;
  return (
    <time
      dateTime={date}
      className="block font-code text-xs text-muted-foreground"
    >
      Last updated {formatted}
    </time>
  );
}
