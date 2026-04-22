// Small components just to have something to audit.
// In your real project you would point the helper at your DS components.

import React, { useId } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export function Button({ children, ...rest }: ButtonProps) {
  return <button type="button" {...rest}>{children}</button>;
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  helper?: string;
}
export function Input({ label, helper, ...rest }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={helper ? `${id}-h` : undefined} {...rest} />
      {helper && <span id={`${id}-h`}>{helper}</span>}
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <article className="card">{children}</article>;
}

// Deliberately broken, to show the test catches the bug.
// Button with no text and no aria-label: impossible to identify
// for a screen reader.
export function BrokenButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} />;
}
