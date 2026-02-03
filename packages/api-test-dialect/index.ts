import {
  HttpMethod,
  HttpStatusCode,
  ApiUrl,
  JsonBody,
  TestName,
  SchemaDefinition,
} from "../../types/api-types.js";
import { reqify, ReqifyResponse } from "../reqify/index.js";

export class ApiTestDialect {
  private _name: TestName;
  private _baseUrl: ApiUrl = "";
  private _method: HttpMethod = "GET";
  private _path: string = "";
  private _body: unknown = null;
  private _headers: Record<string, string> = {};
  private _expectedStatus: HttpStatusCode | null = null;
  private _expectedSchema: SchemaDefinition | null = null;

  constructor(name: TestName) {
    this._name = name;
  }

  static define(name: TestName): ApiTestDialect {
    return new ApiTestDialect(name);
  }

  from(baseUrl: ApiUrl): this {
    this._baseUrl = baseUrl;
    return this;
  }

  method(cmd: HttpMethod, path: string): this {
    this._method = cmd;
    this._path = path;
    return this;
  }

  get(path: string): this {
    return this.method("GET", path);
  }
  post(path: string, body?: unknown): this {
    this.method("POST", path);
    if (body) this.withBody(body);
    return this;
  }
  put(path: string, body?: unknown): this {
    this.method("PUT", path);
    if (body) this.withBody(body);
    return this;
  }
  delete(path: string): this {
    return this.method("DELETE", path);
  }

  withBody(body: unknown): this {
    this._body = body;
    return this;
  }

  header(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  shouldReturn(status: HttpStatusCode): this {
    this._expectedStatus = status;
    return this;
  }

  matchingSchema(schema: SchemaDefinition): this {
    this._expectedSchema = schema;
    return this;
  }

  async run(): Promise<ReqifyResponse> {
    const url = `${this._baseUrl}${this._path}`;
    console.log(`🚀 [Test: ${this._name}] Running ${this._method} ${url}...`);

    try {
      const response = await reqify(url, {
        method: this._method,
        headers: this._headers,
        body: this._body,
      });

      this.validate(response);
      console.log(`✅ [Test: ${this._name}] Passed!`);
      return response;
    } catch (error: any) {
      console.error(`❌ [Test: ${this._name}] Failed: ${error.message}`);
      throw error;
    }
  }

  private validate(response: ReqifyResponse) {
    if (
      this._expectedStatus !== null &&
      response.status !== this._expectedStatus
    ) {
      throw new Error(
        `Expected status ${this._expectedStatus} but got ${response.status}`,
      );
    }

    if (this._expectedSchema !== null) {
      // Basic schema validation logic implemented locally
      this.validateSchema(response.data, this._expectedSchema);
    }
  }

  private validateSchema(data: any, schema: SchemaDefinition) {
    // Simple key-based validation for the dialect example
    for (const key in schema) {
      if (!(key in data)) {
        throw new Error(
          `Schema validation failed: Missing key "${key}" in response`,
        );
      }
      const expectedType = typeof schema[key];
      const actualType = typeof data[key];
      if (expectedType !== actualType) {
        throw new Error(
          `Schema validation failed: Key "${key}" expected type ${expectedType} but got ${actualType}`,
        );
      }
    }
  }
}

export const ApiSpec = ApiTestDialect;
