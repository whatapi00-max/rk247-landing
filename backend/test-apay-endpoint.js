import axios from 'axios';

const apiKey = 'b0e662e70ce72c176b03885a17758d40';
const projectId = '2622547';

const possibleEndpoints = [
  'https://api.a-pay.one',
  'https://pay.a-pay.one',
  'https://gateway.a-pay.one',
  'https://merchant.a-pay.one',
  'https://a-pay.one'
];

async function testEndpoint(baseUrl) {
  const url = `${baseUrl}/Remotes/payment-systems-info?project_id=${projectId}`;
  
  try {
    console.log(`\nTesting: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'apikey': apiKey
      },
      timeout: 5000
    });
    
    console.log('✅ SUCCESS!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    if (error.response) {
      console.log(`❌ Failed with status ${error.response.status}`);
      if (error.response.status === 404) {
        console.log('   (404 Not Found - wrong endpoint)');
      } else if (error.response.status === 401) {
        console.log('   (401 Unauthorized - endpoint exists but auth failed)');
      } else {
        console.log('   Response:', error.response.data);
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.log('❌ Connection refused');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('❌ Timeout');
    } else {
      console.log('❌ Error:', error.message);
    }
    return false;
  }
}

async function findCorrectEndpoint() {
  console.log('🔍 Testing A-Pay API endpoints...\n');
  console.log('API Key:', apiKey);
  console.log('Project ID:', projectId);
  
  for (const endpoint of possibleEndpoints) {
    const success = await testEndpoint(endpoint);
    if (success) {
      console.log(`\n🎉 CORRECT ENDPOINT FOUND: ${endpoint}`);
      break;
    }
  }
  
  console.log('\n📝 Note: If none work, contact A-Pay support for the correct API domain.');
}

findCorrectEndpoint();
