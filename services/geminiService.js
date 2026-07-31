import { GoogleGenAI } from '@google/genai';

// Rule-based fallback categorization for zero-latency or offline fallback
export function fallbackCategorize(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('fan') || lower.includes('switch') || lower.includes('light') || lower.includes('power') || lower.includes('wire') || lower.includes('socket') || lower.includes('spark') || lower.includes('electricity') || lower.includes('fuse') || lower.includes('bulb')) {
    return 'Electrical';
  }
  if (lower.includes('water') || lower.includes('leak') || lower.includes('pipe') || lower.includes('tap') || lower.includes('drain') || lower.includes('sink') || lower.includes('toilet') || lower.includes('flush') || lower.includes('clog')) {
    return 'Plumbing';
  }
  if (lower.includes('door') || lower.includes('window') || lower.includes('table') || lower.includes('chair') || lower.includes('desk') || lower.includes('wood') || lower.includes('lock') || lower.includes('hinge') || lower.includes('bed')) {
    return 'Carpentry';
  }
  if (lower.includes('ac') || lower.includes('air conditioner') || lower.includes('refrigerator') || lower.includes('fridge') || lower.includes('microwave') || lower.includes('heater') || lower.includes('geyser') || lower.includes('washing machine')) {
    return 'Appliance';
  }
  if (lower.includes('wifi') || lower.includes('internet') || lower.includes('router') || lower.includes('network') || lower.includes('lan') || lower.includes('cable')) {
    return 'Internet/IT';
  }
  if (lower.includes('cctv') || lower.includes('security') || lower.includes('gate') || lower.includes('keycard') || lower.includes('intruder') || lower.includes('alarm')) {
    return 'Security';
  }
  return 'General';
}

// Rule-based fallback priority detection
export function fallbackPriority(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('smoke') || lower.includes('fire') || lower.includes('spark') || lower.includes('gas leak') || lower.includes('short circuit') || lower.includes('flooding') || lower.includes('shock') || lower.includes('explosion') || lower.includes('danger')) {
    return { priority: 'Critical', reason: 'Immediate life safety or severe structural hazard detected.' };
  }
  if (lower.includes('no water') || lower.includes('total power loss') || lower.includes('broken main lock') || lower.includes('burst pipe') || lower.includes('overflowing toilet')) {
    return { priority: 'High', reason: 'Major disruption requiring rapid response within hours.' };
  }
  if (lower.includes('not working') || lower.includes('leak') || lower.includes('noise') || lower.includes('slow') || lower.includes('damaged')) {
    return { priority: 'Medium', reason: 'Standard maintenance request, default queue.' };
  }
  return { priority: 'Low', reason: 'Minor inconvenience or cosmetic maintenance issue.' };
}

// Rule-based fallback summary
export function fallbackSummary(complaints = []) {
  const total = complaints.length;
  const critical = complaints.filter(c => c.priority === 'Critical').length;
  const high = complaints.filter(c => c.priority === 'High').length;
  const open = complaints.filter(c => c.status === 'Open' || c.status === 'Pending' || c.status === 'Assigned').length;
  
  const categoriesCount = complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoriesCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return `### 📊 Daily Complaint Summary (Rule-Based Fallback)
  
- **Total Registered**: ${total} complaints (${open} active queue)
- **High-Risk Alerts**: ${critical} Critical priority, ${high} High priority items.
- **Primary Area**: Largest volume in **${topCategory}** category.
- **Recommended Action**: Dispatch technicians to handle ${critical} critical hazards immediately.
*Note: Configure a valid Gemini API Key to enable AI-powered natural language insights.*`;
}

function getApiKey(userKey) {
  return userKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
}

export async function categorizeComplaint(text, apiKeyOverride) {
  const apiKey = getApiKey(apiKeyOverride);
  if (!apiKey) {
    return { category: fallbackCategorize(text), source: 'fallback (no API key)' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a maintenance helper AI. Categorize this complaint into EXACTLY ONE category from this list:
[Electrical, Plumbing, Carpentry, Appliance, Internet/IT, Security, General].

Complaint: "${text}"

Output strictly ONLY the category name. Do not add quotes, markdown, or extra words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
        maxOutputTokens: 20
      }
    });

    const category = response.text ? response.text.trim().replace(/^["']|["']$/g, '') : fallbackCategorize(text);
    return { category, source: 'gemini-2.5-flash' };
  } catch (error) {
    console.error('[GeminiHelper] Categorization failed:', error.message);
    return { category: fallbackCategorize(text), source: 'fallback (error)' };
  }
}

export async function detectPriority(text, apiKeyOverride) {
  const apiKey = getApiKey(apiKeyOverride);
  if (!apiKey) {
    return { ...fallbackPriority(text), source: 'fallback (no API key)' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a safety & priority assessment AI helper. Classify the urgency priority of this complaint.
Priority categories:
- Critical: Fire hazards, smoke, electrical sparks, gas leaks, major flooding, immediate physical danger.
- High: Complete power loss, broken main locks, severe water outage.
- Medium: Standard component breakdown (fan not working, minor leak, AC cooling issue).
- Low: Minor noise, cosmetic issues, squeaky doors.

Complaint: "${text}"

Respond strictly in valid JSON format:
{
  "priority": "Critical" | "High" | "Medium" | "Low",
  "reason": "1 concise sentence explaining the assessment"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return {
      priority: parsed.priority || 'Medium',
      reason: parsed.reason || 'Assessed via Gemini AI helper.',
      source: 'gemini-2.5-flash'
    };
  } catch (error) {
    console.error('[GeminiHelper] Priority Detection failed:', error.message);
    return { ...fallbackPriority(text), source: 'fallback (error)' };
  }
}

export async function generateDailySummary(complaints = [], apiKeyOverride) {
  const apiKey = getApiKey(apiKeyOverride);
  if (!apiKey) {
    return { summary: fallbackSummary(complaints), source: 'fallback (no API key)' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const summaryData = complaints.map(c => `- [${c.priority || 'Medium'}] (${c.category || 'General'}) ${c.description || c.title} - Status: ${c.status}`).join('\n');
    
    const prompt = `You are an admin report helper AI. Generate a short, executive Daily Maintenance & Complaint Summary for the facility admin based on these complaints logged today:

${summaryData}

Requirements:
- Keep it concise, high-level, and easy to read.
- Highlight high-risk/Critical items requiring immediate intervention first.
- Provide breakdown of open vs resolved issues and key pattern trends.
- Use clear bullet points and bold formatting. Do NOT create a conversational response or chatbot tone. Only output the report document.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        maxOutputTokens: 350
      }
    });

    return {
      summary: response.text.trim(),
      source: 'gemini-2.5-flash'
    };
  } catch (error) {
    console.error('[GeminiHelper] Daily Summary API call failed:', error.message);
    return { summary: fallbackSummary(complaints), source: 'fallback (error)' };
  }
}
