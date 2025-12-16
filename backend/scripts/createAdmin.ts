import "dotenv/config";
import { createAdminUser } from "../src/services/admin.service.js";

async function main() {
  const admin = await createAdminUser(
    "System Admin",
    "admin@example.com",
    "admin123" // change immediately after first login
  );

  console.log("✅ Admin ready:", admin.email);
}

main().catch((err) => {
  console.error("❌ Admin creation failed:", err);
  process.exit(1);
});
