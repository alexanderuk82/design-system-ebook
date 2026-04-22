// Componentes pequenos solo para tener algo que auditar en el test.
// En tu proyecto real apuntarias el helper a tus componentes del DS.

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

// Componente roto a proposito, para demostrar que el test detecta el bug.
// Boton sin texto y sin aria-label: imposible de identificar para un
// screen reader.
export function BrokenButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} />;
}
