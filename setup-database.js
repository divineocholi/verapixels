import fetch from 'node-fetch';

/**
 * Script to add missing attributes to existing collections
 */

const PROJECT_ID = '6933f4610012182c4b1d';
const DATABASE_ID = '6933f49b00278d1abf56';
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const API_KEY = 'standard_520284cd8c66b6d1ea80456b9bb6687fce03f15415403bc3b8dc28aaea6b9ef518b8d72885033b0c0200ee0a4fa63f4f93e376bd3707c88143481d1ac27768573f1d33ad0b76839e362f37b788fa74026b8d5ff28eca4c9a8fe834f4e209c1ebadb6722d2bd0b36175178d7e4e8627e1e90be1a24aacf2401697467e07dcfbb9';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function apiRequest(endpoint, method = 'POST', body = null) {
  const response = await fetch(`${ENDPOINT}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': API_KEY
    },
    body: body ? JSON.stringify(body) : null
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

async function createAttribute(collectionId, attr) {
  const endpoint = `/databases/${DATABASE_ID}/collections/${collectionId}/attributes/${attr.type}`;
  const body = {
    key: attr.key,
    required: attr.required
  };

  // Only add defaults for non-required fields
  if (!attr.required && attr.default !== undefined) {
    body.default = attr.default;
  }

  if (attr.size) body.size = attr.size;
  if (attr.elements) body.elements = attr.elements;

  await apiRequest(endpoint, 'POST', body);
}

async function fixConversations() {
  console.log('📁 Fixing chat_conversations attributes...');
  
  try {
    // These had default + required issue - add without defaults
    const attributes = [
      { key: 'status', type: 'enum', elements: ['active', 'transferred', 'resolved', 'closed'], required: false, default: 'active' }
    ];

    for (const attr of attributes) {
      try {
        await createAttribute('chat_conversations', attr);
        console.log(`  ✓ Added ${attr.key}`);
        await delay(500);
      } catch (error) {
        console.log(`  ⚠️  ${attr.key}: Already exists or error`);
      }
    }
    
    console.log('✅ chat_conversations fixed!\n');
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}\n`);
  }
}

async function fixMessages() {
  console.log('📁 Fixing chat_messages attributes...');
  
  try {
    // Add remaining attributes that hit the limit
    const attributes = [
      { key: 'sender_type', type: 'enum', elements: ['user', 'bot', 'admin'], required: true },
      { key: 'sender_name', type: 'string', size: 255, required: false },
      { key: 'message_text', type: 'string', size: 10000, required: true },
      { key: 'timestamp', type: 'datetime', required: true },
      { key: 'read_by_admin', type: 'boolean', required: false, default: false },
      { key: 'read_by_user', type: 'boolean', required: false, default: false },
      { key: 'intent_detected', type: 'string', size: 100, required: false },
      { key: 'links_json', type: 'string', size: 5000, required: false }
    ];

    for (const attr of attributes) {
      try {
        await createAttribute('chat_messages', attr);
        console.log(`  ✓ Added ${attr.key}`);
        await delay(500);
      } catch (error) {
        console.log(`  ⚠️  ${attr.key}: Already exists or error`);
      }
    }
    
    console.log('✅ chat_messages fixed!\n');
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}\n`);
  }
}

async function fixNotifications() {
  console.log('📁 Fixing admin_notifications attributes...');
  
  try {
    const attributes = [
      { key: 'priority', type: 'enum', elements: ['low', 'medium', 'high', 'urgent'], required: false, default: 'medium' },
      { key: 'status', type: 'enum', elements: ['pending', 'acknowledged', 'resolved'], required: false, default: 'pending' }
    ];

    for (const attr of attributes) {
      try {
        await createAttribute('admin_notifications', attr);
        console.log(`  ✓ Added ${attr.key}`);
        await delay(500);
      } catch (error) {
        console.log(`  ⚠️  ${attr.key}: Already exists or error`);
      }
    }
    
    console.log('✅ admin_notifications fixed!\n');
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}\n`);
  }
}

async function fixAdminUsers() {
  console.log('📁 Fixing admin_users attributes...');
  
  try {
    const attributes = [
      { key: 'role', type: 'enum', elements: ['admin', 'super_admin'], required: false, default: 'admin' }
    ];

    for (const attr of attributes) {
      try {
        await createAttribute('admin_users', attr);
        console.log(`  ✓ Added ${attr.key}`);
        await delay(500);
      } catch (error) {
        console.log(`  ⚠️  ${attr.key}: Already exists or error`);
      }
    }
    
    console.log('✅ admin_users fixed!\n');
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}\n`);
  }
}

async function checkCollections() {
  console.log('🔍 Checking current collections...\n');
  
  const collections = ['chat_conversations', 'chat_messages', 'admin_notifications', 'booking_attempts', 'admin_users'];
  
  for (const collectionId of collections) {
    try {
      const response = await apiRequest(`/databases/${DATABASE_ID}/collections/${collectionId}/attributes`, 'GET');
      console.log(`📊 ${collectionId}: ${response.total} attributes`);
      response.attributes.forEach(attr => {
        console.log(`   - ${attr.key} (${attr.type})`);
      });
      console.log('');
    } catch (error) {
      console.log(`⚠️  ${collectionId}: ${error.message}\n`);
    }
  }
}

async function main() {
  console.log('🚀 Fixing Appwrite Collections...\n');
  
  // First, check what exists
  await checkCollections();
  
  console.log('📝 Adding missing attributes...\n');
  
  // Fix each collection
  await fixConversations();
  await delay(1000);
  
  await fixMessages();
  await delay(1000);
  
  await fixNotifications();
  await delay(1000);
  
  await fixAdminUsers();
  
  console.log('\n✅ All fixes applied!');
  console.log('\n🔍 Final check:');
  await checkCollections();
  
  console.log('🔗 Verify at: https://cloud.appwrite.io/console/project-6933f4610012182c4b1d/databases/database-6933f49b00278d1abf56');
}

main();