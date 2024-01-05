import { sql } from "./db.js";

// template literals
sql`
CREATE TABLE videos (
    id  TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
);
`.then(() => {
  console.log("Tabela Criada!");
});
