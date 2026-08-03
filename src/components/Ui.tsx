import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariante = "primaer" | "sekundaer" | "hell" | "geist";

const basis =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-all duration-200 hover:-translate-y-0.5";

const varianten: Record<ButtonVariante, string> = {
  primaer: "bg-moss text-paper hover:bg-moss-600",
  sekundaer: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  hell: "bg-paper text-ink hover:bg-paper-2",
  geist: "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

export function Knopf({
  href,
  variante = "primaer",
  className,
  children,
  ...rest
}: {
  href: string;
  variante?: ButtonVariante;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const klassen = `${basis} ${varianten[variante]} ${className ?? ""}`;

  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={klassen}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={klassen} {...rest}>
      {children}
    </Link>
  );
}

export function Abschnitt({
  children,
  className,
  dunkel = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dunkel?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={[
        "py-20 md:py-28",
        dunkel ? "grain relative bg-ink text-paper" : "",
        className ?? "",
      ].join(" ")}
    >
      <div className="wrap relative">{children}</div>
    </section>
  );
}

export function AbschnittKopf({
  eyebrow,
  titel,
  text,
  dunkel = false,
  className,
}: {
  eyebrow?: string;
  titel: string;
  text?: string;
  dunkel?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className ?? ""}`} data-reveal>
      {eyebrow ? (
        <p className={`eyebrow mb-4 ${dunkel ? "text-paper/55" : "text-muted"}`}>{eyebrow}</p>
      ) : null}
      <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05]">{titel}</h2>
      {text ? (
        <p
          className={`mt-5 text-lg leading-relaxed ${dunkel ? "text-paper/70" : "text-muted"}`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function Karte({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & ComponentProps<"div">) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-line bg-paper-2/50 p-7 md:p-8 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Pfeil für Links, dreht sich beim Hover leicht nach oben rechts. */
export function Pfeil({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 ${className ?? ""}`}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
