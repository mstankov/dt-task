export type GetArrayType<T> = T extends Array<infer R> ? R : T;
