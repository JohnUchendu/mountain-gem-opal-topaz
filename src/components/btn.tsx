import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

const VARIANTS = {
  solid: "bg-ink text-paper",
  line: "border border-line bg-card text-ink",
  green: "bg-green text-paper",
  ghost: "bg-transparent text-ink",
} as const;

export function Btn({
  variant = "solid",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof VARIANTS }) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-40",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
