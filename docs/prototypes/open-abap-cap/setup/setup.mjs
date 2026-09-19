// The one hook the transpiled bundle requires: wire a database and load the
// schema. Named in upstream's node/setup/abap_transpile.json, so it is part of
// the contract of `npm run auto_transpile` output, not something we invented.
//
// This is the CHEAPEST correct choice for the spike: @abaplint's SQLite client
// satisfies the Open SQL the transpiled ABAP emits, so Z2UI5_T_01 exists and
// the draft chain works with no further wiring. Putting drafts into a CDS
// entity instead is what z2ui5_if_ui5_draft_store (Naht 1) opens, and it is a
// LATER step, not a precondition.
import { SQLiteDatabaseClient } from "@abaplint/database-sqlite";

export async function setup(abap, schemas, insert) {
  const db = new SQLiteDatabaseClient();
  abap.context.databaseConnections["DEFAULT"] = db;
  await db.connect();
  await db.execute(schemas.sqlite);
  await db.execute(insert);
}
