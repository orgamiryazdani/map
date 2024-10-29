import { ComponentBase } from "@/types/component-base.type";

export type LoadingProps = Omit<ComponentBase, "isDisabled"> & {
    type?: "spinner" | "ring"
}