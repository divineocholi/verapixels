import { Client, Databases, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6933f4610012182c4b1d'); // Your Appwrite project ID

export const databases = new Databases(client);

// You'll need to get these from your Appwrite dashboard
export const APPWRITE_DATABASE_ID = '6933f49b00278d1abf56';
export const APPWRITE_COLLECTIONS = {
  NEWSLETTER_SUBSCRIBERS: '693443360011a536a28f',
  SITE_TRAFFIC: 'YOUR_TRAFFIC_COLLECTION_ID',
  // Add more collections as needed
};

export { Query };