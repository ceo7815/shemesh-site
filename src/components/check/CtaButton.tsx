import { CHECKOUT_URL } from "@/lib/checkLanding";

type Props = {
  children: React.ReactNode;
  note?: string;
  size?: "md" | "lg";
  tone?: "gold" | "ink";
  pulse?: boolean;
  className?: string;
};

export function CtaButton({
  children,
  note,
  size = "lg",
  tone = "gold",
  pulse = false,
  className = "",
}: Props) {
  const label = typeof children === "string" ? children : undefined;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <a
        href={CHECKOUT_URL}
        className={`check-cta check-cta-${tone} check-cta-${size} ${pulse ? "check-pulse-cta" : ""}`}
        aria-label={label}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="check-cta-arrow">
          ←
        </span>
      </a>
      {note ? <p className="check-cta-note">{note}</p> : null}
    </div>
  );
}
