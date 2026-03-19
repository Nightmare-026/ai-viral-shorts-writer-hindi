"use client";
import React, { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Funny');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const tones = [
    { name: 'Funny', emoji: '😂' },
    { name: 'Motivational', emoji: '🔥' },
    { name: 'Serious', emoji: '🧐' },
    { name: 'Infotainment', emoji: '🧠' },
    { name: 'Hype', emoji: '🚀' },
    { name: 'Storytelling', emoji: '📖' },
    { name: 'Sarcastic', emoji: '😏' },
    { name: 'Emotional', emoji: '😢' },
  ];

  const handleGenerate = async () => {
    if (!topic) return alert("Please enter a topic!");
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("AI Script generation failed! Make sure your API key is setup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="neon-text-purple">AI Viral Shorts Script Writer</h1>
        <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>
          Create Viral Scripts in Seconds! 🚀
        </p>
      </section>

      {/* Input Section */}
      <section className="input-section glass">
        <h2 className="neon-text-green" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Enter Video Topic</h2>
        <textarea 
          placeholder="e.g., Top 5 AI Tools in 2026..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-lg p-4 mb-6 outline-none"
          rows="3"
        />

        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', opacity: 0.9 }}>Choose Script Tone:</h3>
          <div className="tone-grid">
            {[
              { id: 'funny', label: 'Funny 😂', icon: '🎭' },
              { id: 'motivational', label: 'Motivational 🔥', icon: '💪' },
              { id: 'serious', label: 'Serious 🧐', icon: '🏛' },
              { id: 'infotainment', label: 'Information 💡', icon: '📚' }
            ].map((t) => (
              <div 
                key={t.id}
                className={`tone-card glass ${tone === t.id ? 'active' : ''}`}
                onClick={() => setTone(t.id)}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.icon}</div>
                <div>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="generate-btn" 
          onClick={handleGenerate}
          disabled={loading}
          style={{ marginTop: '2rem' }}
        >
          {loading ? 'AI is preparing the script... ⏳' : 'Generate Viral Script ✨'}
        </button>
      </section>

      {/* Result Section */}
      {result && (
        <section className="result-section">
          {/* Main Script Area */}
          <div className="script-preview glass">
            <div className="script-header">
              <span>🎬 SCRIPT PREVIEW</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result.script);
                  alert("Script Copied!");
                }}
                style={{ background: 'none', border: 'none', color: 'var(--primary-pink)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                COPY SCRIPT
              </button>
            </div>
            <div className="script-content">
              {result.script}
            </div>
          </div>

          {/* Widgets Sidebar */}
          <div className="widgets">
            {/* Viral Score Widget */}
            <div className="widget-card glass">
              <h4 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>VIRAL SCORE</h4>
              <div className="meter-container">
                <div className="meter-score">{result.score}%</div>
                <div className="meter-bar-bg" style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${result.score}%`, height: '100%', background: 'var(--primary-green)', boxShadow: 'var(--neon-shadow-green)' }}></div>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--primary-green)' }}>Highly Engaging! 🔥</p>
              </div>
            </div>

            {/* Hashtags Widget */}
            <div className="widget-card glass">
              <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>TRENDING HASHTAGS</h4>
              <div className="hashtags-container flex flex-wrap gap-2">
                {result.hashtags.map((tag) => (
                  <span key={tag} className="hashtag bg-purple-900/40 border border-purple-500/30 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Thumbnail Prompt Widget */}
            {result.thumbnail_prompt && (
              <div className="widget-card glass">
                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>THUMBNAIL PROMPT</h4>
                <p className="text-xs italic text-gray-400">
                  {result.thumbnail_prompt}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Viral Hook Library Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-yellow-400">⚡</span> Viral Hook Library (Pro Tips)
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "The 'Secret' Hook", text: "Nobody is talking about this, but..." },
            { title: "The 'Mistake' Hook", text: "Stop doing talent [X] if you want [Y]!" },
            { title: "The 'Challenge' Hook", text: "I bet you didn't know that..." },
            { title: "The 'Result' Hook", text: "How I got [Result] in just [Time]..." }
          ].map((hook, i) => (
            <div key={i} className="glass p-4 transition-all cursor-pointer">
              <div className="font-bold text-yellow-400 text-sm mb-1">{hook.title}</div>
              <div className="text-gray-300 italic text-sm">"{hook.text}"</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Suggestions */}
      <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
        <p>© 2026 AI Viral Shorts Script Writer | Zero Investment Series</p>
      </footer>
    </main>
  );
}

