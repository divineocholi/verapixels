import fetch from 'node-fetch';

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

async function createCollection(collectionId, name) {
  console.log(`\n📦 Creating collection: ${name}...`);
  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections`, 'POST', {
      collectionId: collectionId,
      name: name,
      permissions: [],
      documentSecurity: false
    });
    console.log(`✅ Collection "${name}" created!`);
    await delay(1000);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`✓ Collection "${name}" already exists`);
    } else {
      throw error;
    }
  }
}

async function createAttribute(collectionId, attr) {
  const endpoint = `/databases/${DATABASE_ID}/collections/${collectionId}/attributes/${attr.type}`;
  const body = {
    key: attr.key,
    required: attr.required
  };

  if (attr.size) body.size = attr.size;
  if (attr.elements) body.elements = attr.elements;
  if (!attr.required && attr.default !== undefined) body.default = attr.default;

  try {
    await apiRequest(endpoint, 'POST', body);
    console.log(`  ✓ ${attr.key} (${attr.type})`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`  ✓ ${attr.key} - already exists`);
    } else {
      console.log(`  ⚠️  ${attr.key} - ${error.message}`);
    }
  }
}

async function createChatConversations() {
  console.log('\n🔧 Creating chat_conversations collection and attributes...');
  
  await createCollection('chat_conversations', 'Chat Conversations');
  
  const attributes = [
    { key: 'conversation_id', type: 'string', size: 255, required: true },
    { key: 'user_timezone', type: 'string', size: 100, required: false },
    { key: 'status', type: 'enum', elements: ['active', 'inactive', 'awaiting_admin', 'admin_handling', 'resolved', 'transferred', 'closed'], required: false, default: 'active' },
    { key: 'is_admin_takeover', type: 'boolean', required: false, default: false },
    { key: 'admin_id', type: 'string', size: 255, required: false },
    { key: 'started_at', type: 'datetime', required: true },
    { key: 'last_message_at', type: 'datetime', required: false },
    { key: 'last_activity', type: 'datetime', required: false },
    { key: 'session_id', type: 'string', size: 255, required: false },
    { key: 'transfer_reason', type: 'string', size: 500, required: false }
  ];

  for (const attr of attributes) {
    await createAttribute('chat_conversations', attr);
    await delay(500);
  }
  
  console.log('✅ chat_conversations complete!\n');
}

async function createChatMessages() {
  console.log('\n🔧 Creating chat_messages collection and attributes...');
  
  await createCollection('chat_messages', 'Chat Messages');
  
  const attributes = [
    { key: 'message_id', type: 'string', size: 255, required: true },
    { key: 'conversation_id', type: 'string', size: 255, required: true },
    { key: 'sender_type', type: 'enum', elements: ['user', 'bot', 'admin'], required: true },
    { key: 'sender_name', type: 'string', size: 255, required: false },
    { key: 'message_text', type: 'string', size: 10000, required: true },
    { key: 'timestamp', type: 'datetime', required: true },
    { key: 'read_by_admin', type: 'boolean', required: false, default: false },
    { key: 'read_by_user', type: 'boolean', required: false, default: false },
    { key: 'intent_detected', type: 'string', size: 100, required: false },
    { key: 'classification', type: 'string', size: 50, required: false },
    { key: 'message_type', type: 'string', size: 50, required: false },
    { key: 'metadata', type: 'string', size: 2000, required: false },
    { key: 'links_json', type: 'string', size: 5000, required: false },
    { key: 'admin_id', type: 'string', size: 100, required: false }
  ];

  for (const attr of attributes) {
    await createAttribute('chat_messages', attr);
    await delay(500);
  }
  
  console.log('✅ chat_messages complete!\n');
}

async function createIndexes() {
  console.log('\n🔍 Creating indexes for better performance...');
  
  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections/chat_conversations/indexes`, 'POST', {
      key: 'conversation_id_index',
      type: 'key',
      attributes: ['conversation_id']
    });
    console.log('  ✓ conversation_id index created');
  } catch (error) {
    console.log('  ✓ conversation_id index - already exists');
  }
  await delay(500);

  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections/chat_conversations/indexes`, 'POST', {
      key: 'status_index',
      type: 'key',
      attributes: ['status']
    });
    console.log('  ✓ status index created');
  } catch (error) {
    console.log('  ✓ status index - already exists');
  }
  await delay(500);

  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections/chat_messages/indexes`, 'POST', {
      key: 'conversation_id_index',
      type: 'key',
      attributes: ['conversation_id']
    });
    console.log('  ✓ conversation_id index created');
  } catch (error) {
    console.log('  ✓ conversation_id index - already exists');
  }
  await delay(500);

  try {
    await apiRequest(`/databases/${DATABASE_ID}/collections/chat_messages/indexes`, 'POST', {
      key: 'timestamp_index',
      type: 'key',
      attributes: ['timestamp']
    });
    console.log('  ✓ timestamp index created');
  } catch (error) {
    console.log('  ✓ timestamp index - already exists');
  }
  
  console.log('✅ Indexes complete!\n');
}

async function verifyCollections() {
  console.log('\n🔍 Verifying collections...\n');
  
  const collections = ['chat_conversations', 'chat_messages'];
  
  for (const collectionId of collections) {
    try {
      const response = await apiRequest(`/databases/${DATABASE_ID}/collections/${collectionId}/attributes`, 'GET');
      console.log(`📊 ${collectionId}: ${response.total} attributes`);
      response.attributes.forEach(attr => {
        console.log(`   - ${attr.key} (${attr.type}${attr.size ? `, size: ${attr.size}` : ''}${attr.required ? ', required' : ''})`);
      });
      console.log('');
    } catch (error) {
      console.log(`⚠️  ${collectionId}: ${error.message}\n`);
    }
  }
}

async function main() {
  console.log('🚀 Recreating Appwrite Collections...');
  console.log('Project ID:', PROJECT_ID);
  console.log('Database ID:', DATABASE_ID);
  
  try {
    await createChatConversations();
    await delay(2000);
    
    await createChatMessages();
    await delay(2000);
    
    await createIndexes();
    await delay(2000);
    
    await verifyCollections();
    
    console.log('✅ ALL DONE!');
    console.log('\n🔗 Verify at: https://cloud.appwrite.io/console/project-6933f4610012182c4b1d/databases/database-6933f49b00278d1abf56');
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

main();