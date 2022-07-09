export interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host?: string;
  port?: string;
  dialect?: string;
  urlDatabase?: string;
  ssl: boolean;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
