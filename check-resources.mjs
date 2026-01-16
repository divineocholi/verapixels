import fetch from 'node-fetch';

const PROJECT_ID = '6933f4610012182c4b1d';
const DATABASE_ID = '6933f49b00278d1abf56';
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const API_KEY = 'standard_520284cd8c66b6d1ea80456b9bb6687fce03f15415403bc3b8dc28aaea6b9ef518b8d72885033b0c0200ee0a4fa63f4f93e376bd3707c88143481d1ac27768573f1d33ad0b76839e362f37b788fa74026b8d5ff28eca4c9a8fe834f4e209c1ebadb6722d2bd0b36175178d7e4e8627e1e90be1a24aacf2401697467e07dcfbb9';

async function apiRequest(endpoint, method = 'GET') {
  const response = await fetch(`${ENDPOINT}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': API_KEY
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

async function checkResources() {
  console.log('🔍 Checking Appwrite Resources...\n');
  
  try {
    // Check all databases
    console.log('📊 DATABASES:');
    const databases = await apiRequest('/databases');
    console.log(`Total Databases: ${databases.total}\n`);
    
    for (const db of databases.databases) {
      console.log(`\n📁 Database: ${db.name} (${db.$id})`);
      
      // Check collections in this database
      const collections = await apiRequest(`/databases/${db.$id}/collections`);
      console.log(`   Collections: ${collections.total}`);
      
      for (const col of collections.collections) {
        console.log(`   📦 ${col.name} (${col.$id})`);
        
        // Count documents
        try {
          const docs = await apiRequest(`/databases/${db.$id}/collections/${col.$id}/documents`);
          console.log(`      └─ Documents: ${docs.total}`);
        } catch (e) {
          console.log(`      └─ Documents: Error fetching`);
        }
        
        // Count attributes
        try {
          const attrs = await apiRequest(`/databases/${db.$id}/collections/${col.$id}/attributes`);
          console.log(`      └─ Attributes: ${attrs.total}`);
        } catch (e) {
          console.log(`      └─ Attributes: Error fetching`);
        }
      }
    }
    
    console.log('\n\n💡 RECOMMENDATIONS:');
    console.log('─────────────────────────────────────────');
    
    if (databases.total === 0) {
      console.log('✅ No databases found - you can create new ones');
    } else {
      console.log('📌 Your Appwrite free tier limits:');
      console.log('   • 1 Database');
      console.log('   • 3 Collections per database');
      console.log('   • 75 Attributes total across all collections');
      console.log('   • 5,000 Documents');
      console.log('   • 2GB Bandwidth');
      console.log('   • 2GB Storage\n');
      
      const totalCollections = databases.databases.reduce((sum, db) => {
        return sum + (db.collections?.length || 0);
      }, 0);
      
      console.log('📊 Your Current Usage:');
      console.log(`   • Databases: ${databases.total}/1`);
      console.log(`   • Collections: Check above\n`);
      
      console.log('💰 Options:');
      console.log('   1. Upgrade to Pro ($15/month) at: https://cloud.appwrite.io/console/project-6933f4610012182c4b1d/settings');
      console.log('   2. Delete unused collections');
      console.log('   3. Use a different Appwrite project\n');
    }
    
    console.log('🔗 View in Console: https://cloud.appwrite.io/console/project-6933f4610012182c4b1d');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkResources();