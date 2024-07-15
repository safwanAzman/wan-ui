import React from "react";
import "../../../src/index.css";
import { Button as ShadcnButton } from "../ui/button";
import { Atom } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, size, ...restProps } = props;
  return (
    <ShadcnButton {...restProps} className={className}>
      {size === "icon" ? <Atom /> : children}
    </ShadcnButton>
  );
};

export default Button;
