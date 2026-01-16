import fetch from "node-fetch";

const PROJECT_ID = "6933f4610012182c4b1d";
const DATABASE_ID = "6933f49b00278d1abf56";
const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const API_KEY =
  "standard_520284cd8c66b6d1ea80456b9bb6687fce03f15415403bc3b8dc28aaea6b9ef518b8d72885033b0c0200ee0a4fa63f4f93e376bd3707c88143481d1ac27768573f1d33ad0b76839e362f37b788fa74026b8d5ff28eca4c9a8fe834f4e209c1ebadb6722d2bd0b36175178d7e4e8627e1e90be1a24aacf2401697467e07dcfbb9";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function addAttribute(collectionId, type, key, data) {
  try {
    const response = await fetch(
      `${ENDPOINT}/databases/${DATABASE_ID}/collections/${collectionId}/attributes/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": PROJECT_ID,
          "X-Appwrite-Key": API_KEY,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      console.log(`  ✓ Added ${key}`);
    } else {
      const error = await response.text();
      console.log(`  ⚠️  ${key}: ${error}`);
    }
  } catch (error) {
    console.log(`  ❌ ${key}: ${error.message}`);
  }
}

async function main() {
  console.log("��� Adding missing attributes...\n");

  // chat_conversations - missing attributes
  console.log("��� chat_conversations:");
  await addAttribute("chat_conversations", "enum", "status", {
    key: "status",
    elements: ["active", "transferred", "resolved", "closed"],
    required: false,
    default: "active",
  });
  await delay(500);

  await addAttribute("chat_conversations", "boolean", "is_admin_takeover", {
    key: "is_admin_takeover",
    required: false,
    default: false,
  });
  await delay(500);

  await addAttribute("chat_conversations", "string", "admin_id", {
    key: "admin_id",
    size: 255,
    required: false,
  });
  await delay(500);

  await addAttribute("chat_conversations", "datetime", "started_at", {
    key: "started_at",
    required: true,
  });
  await delay(500);

  await addAttribute("chat_conversations", "datetime", "last_message_at", {
    key: "last_message_at",
    required: false,
  });
  await delay(500);

  await addAttribute("chat_conversations", "string", "session_id", {
    key: "session_id",
    size: 255,
    required: false,
  });
  await delay(1000);

  // chat_messages - missing links_json
  console.log("\n��� chat_messages:");
  await addAttribute("chat_messages", "string", "links_json", {
    key: "links_json",
    size: 5000,
    required: false,
  });
  await delay(1000);

  // admin_notifications - missing attributes
  console.log("\n��� admin_notifications:");
  await addAttribute("admin_notifications", "enum", "priority", {
    key: "priority",
    elements: ["low", "medium", "high", "urgent"],
    required: false,
    default: "medium",
  });
  await delay(500);

  await addAttribute("admin_notifications", "enum", "status", {
    key: "status",
    elements: ["pending", "acknowledged", "resolved"],
    required: false,
    default: "pending",
  });
  await delay(500);

  await addAttribute("admin_notifications", "string", "message_preview", {
    key: "message_preview",
    size: 500,
    required: false,
  });
  await delay(500);

  await addAttribute("admin_notifications", "datetime", "created_at", {
    key: "created_at",
    required: true,
  });
  await delay(500);

  await addAttribute("admin_notifications", "datetime", "acknowledged_at", {
    key: "acknowledged_at",
    required: false,
  });
  await delay(500);

  await addAttribute("admin_notifications", "datetime", "resolved_at", {
    key: "resolved_at",
    required: false,
  });
  await delay(1000);

  // admin_users - missing attributes
  console.log("\n��� admin_users:");
  await addAttribute("admin_users", "enum", "role", {
    key: "role",
    elements: ["admin", "super_admin"],
    required: false,
    default: "admin",
  });
  await delay(500);

  await addAttribute("admin_users", "boolean", "is_online", {
    key: "is_online",
    required: false,
    default: false,
  });
  await delay(500);

  await addAttribute("admin_users", "datetime", "last_active", {
    key: "last_active",
    required: false,
  });
  await delay(500);

  await addAttribute("admin_users", "string", "notification_prefs_json", {
    key: "notification_prefs_json",
    size: 1000,
    required: false,
  });

  console.log("\n✅ All missing attributes added!");
  console.log(
    "\n��� Verify at: https://cloud.appwrite.io/console/project-6933f4610012182c4b1d/databases/database-6933f49b00278d1abf56"
  );
}

main();
