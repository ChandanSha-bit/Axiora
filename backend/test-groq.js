const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testGroq() {
  try {
    console.log('Testing Groq API...');
    console.log('API Key:', process.env.GROQ_API_KEY ? 'Found' : 'Missing');
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Say hello in one word' }],
      model: "llama-3.3-70b-versatile",
    });

    console.log('✅ Success! Response:', completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testGroq();
