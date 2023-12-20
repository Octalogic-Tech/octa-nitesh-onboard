
{
  "type": "postgres",
  "host": process.env.DB_HOST || "localhost",
  "port": process.env.DB_PORT || 5432,
  "username": process.env.DB_USERNAME || "postgres",
  "password": process.env.DB_PASSWORD || "mysecretpassword",
  "database": process.env.DB_NAME || "postgres",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
