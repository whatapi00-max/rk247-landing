import axios from 'axios';

const apiKey = 'b0e662e70ce72c176b03885a17758d40';
const projectId = '2622547';

// Test the actual payment systems info endpoint
async function testPaymentSystems() {
  const possibleDomains = [
    'https://api.a-pay.one',
    'https://a-pay.one',
    'https://pay.a-pay.one',
    'https://merchant.a-pay.one',
    'https://gateway.a-pay.one',
    'https://api-india.a-pay.one',
    'https://in.a-pay.one'
  ];

  for (const domain of possibleDomains) {
    try {
      console.log(`\n🔍 Testing: ${domain}/Remotes/payment-systems-info`);
      
      const response = await axios.get(
        `${domain}/Remotes/payment-systems-info`,
        {
          params: { project_id: projectId },
          headers: { 'apikey': apiKey },
          timeout: 10000
        }
      );
      
      console.log('✅ SUCCESS! This is the correct domain!');
      console.log('Response:', JSON.stringify(response.data, null, 2));
      console.log(`\n🎉 CORRECT API URL: ${domain}`);
      return domain;
    } catch (error) {
      if (error.response) {
        console.log(`❌ HTTP ${error.response.status}: ${error.response.statusText}`);
        if (error.response.status === 401) {
          console.log('   (Endpoint exists but authentication failed - check credentials)');
        } else if (error.response.status === 400) {
          console.log('   (Endpoint exists but bad request - might be correct domain!)');
          console.log('   Response:', error.response.data);
        }
      } else if (error.code === 'ENOTFOUND') {
        console.log(`❌ Domain not found`);
      } else if (error.code === 'ETIMEDOUT') {
        console.log(`❌ Timeout`);
      } else {
        console.log(`❌ Error: ${error.message}`);
      }
    }
  }
  
  console.log('\n❌ No working endpoint found.');
  console.log('\n📧 You need to contact A-Pay support to get the correct API domain.');
  console.log('   Ask: "What is the API base URL for project ID 2622547?"');
}

testPaymentSystems();
