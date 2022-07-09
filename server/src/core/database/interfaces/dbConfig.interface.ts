export interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host?: string;
  port?: string;
  dialect?: string;
  urlDatabase?: string;
  ssl: { require: boolean; rejectUnauthorized: boolean };
  pool: { min: number; max: number; idle: number };
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
