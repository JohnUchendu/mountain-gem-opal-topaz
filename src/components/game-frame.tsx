import type { ReactNode } from "react";
import { TopBar } from "@/components/top-bar";
import { Btn } from "@/components/btn";

export function GameFrame({
  kicker,
  title,
  help,
  children,
}: {
  kicker: string;
  title: string;
  help: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-16 pt-4">
      <TopBar back />
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-green">{kicker}</p>
      <h1 className="mt-1 font-display text-4xl leading-tight text-ink">{title}</h1>
      <details className="mt-4 rounded-2xl border border-line bg-card px-4">
        <summary className="flex min-h-11 items-center font-semibold text-ink">How to play</summary>
        <div className="pb-4 text-sm leading-relaxed text-muted">{help}</div>
      </details>
      <div className="mt-6">{children}</div>
    </main>
  );
}

export function WinNote({
  title,
  text,
  onShare,
  copied,
}: {
  title: string;
  text: string;
  onShare?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-green-soft px-4 py-4 text-ink">
      <p className="font-display text-2xl leading-tight">{title}</p>
      <p className="mt-1 text-sm leading-relaxed">{text}</p>
      {onShare ? (
        <Btn className="mt-3" onClick={onShare}>
          {copied ? "Copied" : "Share result"}
        </Btn>
      ) : null}
    </div>
  );
}
