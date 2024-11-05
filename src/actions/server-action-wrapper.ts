import { Problem } from "@/types/http-errors.interface";
import { OperationResult } from "./../types/operation-result";

export async function serverActionWrapper<T>(
    action: () => Promise<T>
): Promise<OperationResult<T>> {
    try {
        const response = await action();
        return { isSuccess: true, response };
    } catch (error: unknown) {
        const err = error as Problem;
        if (err) {
            return {
                isSuccess: false, error: err
            }
        }
    }
    throw new Error('خطای ناشناخته')
}