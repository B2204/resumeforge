import React from 'react';
import { useApp } from '../../context/AppContext';
import { boostResume } from '../../services/aiService';
import { useState } from 'react';

/**
 * BoostPanel – Placeholder for premium boost features (AI keyword injection, etc.)
 */
const BoostPanel: React.FC = () => {
  const { activeResume, updateResume } = useApp();
  const [loading, setLoading] = useState(false);
  const handleBoost = async () => {
    if (!activeResume) return;
    setLoading(true);
    try {
      const boosted = await boostResume(activeResume);
      if (boosted) {
        updateResume(activeResume.id, boosted);
      }
    } catch (e) {
      console.error('Boost failed', e);
    }
    setLoading(false);
  };
  return (
    <section className="p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-semibold mb-4 text-white">Boost Your Resume</h2>
      <p className="text-slate-300">Here you will soon be able to inject AI‑generated keywords, rewrite bullet points, and run ATS‑optimisation actions on the active resume: <strong>{activeResume?.title}</strong>.</p>
      <button
        onClick={handleBoost}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Boosting…' : 'Boost Resume'}
      </button>
    </section>
  );
};

export default BoostPanel;
