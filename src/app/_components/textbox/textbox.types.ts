import { ComponentBase } from "@/types/component-base.type";
import { InputHTMLAttributes } from "react";

export type TextboxType = "text" | "number" | "email" | "password";

export type TextboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & ComponentBase & {
    type?: TextboxType
}