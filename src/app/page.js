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
        <h1 className="neon-text-purple">Viral Shorts Scripts in Seconds</h1>
        <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>
          Hindustani creators ke liye sabse advance AI script writer. 🚀
        </p>
      </section>

      {/* Input Section */}
      <section className="input-section glass">
        <h2 className="neon-text-green" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Video Topic Likhein</h2>
        <textarea 
          placeholder="Apne video ka topic ya idea yahan dalein..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', opacity: 0.9 }}>Script ka Toon (Tone) chunein:</h3>
          <div className="tone-grid">
            {tones.map((t) => (
              <div 
                key={t.name}
                className={`tone-card glass $\{tone === t.name ? 'active' : ''\}`}
                onClick={() => setTone(t.name)}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.emoji}</div>
                <div>{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="generate-btn" 
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'AI Script Taiyar Kar Raha Hai...' : 'Viral Script Generate Karein ✨'}
        </button>
      </section>

      {/* Result Section */}
      {result && (
        <section className="result-section">
          {/* Main Script Area */}
          <div className="script-preview glass">
            <div className="script-header">
              <span>OUTPUT PREVIEW</span>
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
                <div className="meter-score">{result.score}/100</div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `$\{result.score\}%`, height: '100%', background: 'var(--primary-green)', boxShadow: 'var(--neon-shadow-green)' }}></div>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--primary-green)' }}>Highly Engaging! 🔥</p>
              </div>
            </div>

            {/* Hashtags Widget */}
            <div className="widget-card glass">
              <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>TRENDING HASHTAGS</h4>
              <div className="hashtags-container">
                {result.hashtags.map((tag) => (
                  <span key={tag} className="hashtag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Suggestions */}
      <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
        <p>© 2026 AI Viral Shorts Script Writer | Zero Investment Series</p>
      </footer>
    </main>
  );
}
