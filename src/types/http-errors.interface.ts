interface Problem {
    title: string;
    status: number;
    detail?: string;
    errors?: Record<string, string[]>
}

type BadRequestError = Problem
type UnauthorizedError = Problem
type ValidationError = Problem
type NotFoundError = Problem
type UnhandledException = Problem
type NetworkError = Problem

type ApiError =
    | BadRequestError
    | NetworkError
    | NotFoundError
    | UnhandledException
    | UnauthorizedError
    | ValidationError;

export type {
    Problem,
    BadRequestError,
    UnauthorizedError,
    ValidationError,
    NotFoundError,
    UnhandledException,
    NetworkError,
    ApiError
}