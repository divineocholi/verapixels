import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6933f4610012182c4b1d');

const databases = new Databases(client);
const DATABASE_ID = '6933f49b00278d1abf56';
const COLLECTION_ID = 'chat_messages';

const attributesToAdd = [
  { name: 'message_type', type: 'string', size: 50, required: false },
  { name: 'metadata', type: 'string', size: 2000, required: false },
  { name: 'classification', type: 'string', size: 50, required: false },
  { name: 'intent_detected', type: 'string', size: 100, required: false },
  { name: 'admin_id', type: 'string', size: 100, required: false }
];

async function addAttributes() {
  try {
    console.log('Adding missing attributes...');
    
    for (const attr of attributesToAdd) {
      try {
        await databases.createStringAttribute(
          DATABASE_ID,
          COLLECTION_ID,
          attr.name,
          attr.size,
          attr.required
        );
        console.log(`✅ Added: ${attr.name}`);
      } catch (error) {
        if (error.message.includes('already exists') || error.message.includes('Attribute already exists')) {
          console.log(`✓ Already exists: ${attr.name}`);
        } else {
          console.log(`⚠️ Error adding ${attr.name}:`, error.message);
        }
      }
    }
    
    console.log('✅ All attributes added!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

addAttributes();