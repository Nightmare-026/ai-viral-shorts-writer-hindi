export async function POST(req) {
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(JSON.stringify({ error: "API Key is missing! Please set OPENROUTER_API_KEY in Vercel environment variables." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const { topic, tone } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Optional, for OpenRouter rankings
        "X-Title": "AI Shorts Script Writer", // Optional
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          {
            "role": "user",
            "content": `
              You are a Viral Shorts Script Writer specialized in the global English-speaking market.
              Your task is to write a highly engaging, viral 60-second script for a YouTube/Instagram Short on the following topic: "${topic}".
              
              TONE: ${tone}
              LANGUAGE: English (Fluent, engaging, and modern).
              
              STRUCTURE:
              1. HOOK (0-3 sec): Must grab attention immediately with a surprising fact, question, or visual description.
              2. BODY (3-50 sec): Fast-paced, informative/entertaining, using ${tone} style.
              3. CTA (50-60 sec): Strong call to action to subscribe/follow for more.
              
              ADDITIONAL OUTPUT:
              - VIRAL_SCORE: A number from 0 to 100 based on how likely this is to go viral.
              - HASHTAGS: 5 trending hashtags related to the topic.
              - THUMBNAIL_PROMPT: A detailed AI image generation prompt for a viral thumbnail.
              
              FORMAT: Return ONLY a valid JSON object with this structure:
              {
                "script": "the full script text here",
                "score": number,
                "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
                "thumbnail_prompt": "string"
              }
            `
          }
        ]
      })
    });

    const data = await response.json();
    
    // OpenRouter returns data in choices[0].message.content
    if (!data.choices || data.choices.length === 0) {
      throw new Error(`OpenRouter API Error: ${data.error?.message || "No choices returned"}`);
    }
    const aiContent = data.choices[0].message.content;
    
    // Extract JSON from response (sometimes AI adds markdown blocks)
    const jsonStr = aiContent.match(/\{[\s\S]*\}/)?.[0] || aiContent;
    const finalData = JSON.parse(jsonStr);

    return new Response(JSON.stringify(finalData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return new Response(JSON.stringify({ error: "Script Generation Failed via OpenRouter!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
