type Props = { size?: number; className?: string };

export default function Logo({ size = 22, className }: Props) {
  return (
    <svg
      width={size}
      height={size * (80 / 60)}
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Anteroom"
    >
      <path
        d="M 6 70 L 6 24 A 24 24 0 0 1 54 24 L 54 70"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
        fill="none"
      />
      <line x1={0} y1={74} x2={60} y2={74} stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" />
    </svg>
  );
}
