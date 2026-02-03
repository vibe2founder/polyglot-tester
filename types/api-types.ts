export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export type HttpStatusCode = number; // Nominal naming implies keeping it in types folder

export type ApiUrl = string;

export type JsonBody = Record<string, unknown> | unknown[];

export type TestName = string;

export type SchemaDefinition = Record<string, unknown>;
