import { splitEventName } from '@/lib/eventName';

// "Rayaan & Qudsiyyah Wedding" -> big script names, small spaced-caps "WEDDING" underneath
export default function EventTitle({ name, size = 'lg' }: { name: string; size?: 'lg' | 'sm' }) {
  const { script, caption } = splitEventName(name);
  const big = size === 'lg';
  return (
    <h1 className="text-center">
      <span
        className={`block font-script leading-[1.15] text-balance ${big ? 'text-5xl' : 'text-4xl'}`}
      >
        {script}
      </span>
      {caption && (
        <span
          className={`block font-display font-semibold uppercase tracking-[0.35em] mt-2 text-leaf/80 ${
            big ? 'text-sm' : 'text-[11px]'
          }`}
        >
          {caption}
        </span>
      )}
    </h1>
  );
}
