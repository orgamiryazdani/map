import { ComponentBase } from "@/types/component-base.type";

export type ProgressProps = Omit<ComponentBase, 'isDisabled'> & {
    value: number;
}