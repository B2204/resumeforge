import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * BrandingSettings – UI for premium users to customise primary colour and font.
 * Integrated with AppContext's `setBranding` action which persists to localStorage.
 * Uses a minimal, glass‑morphism card with smooth hover animations to match the app's premium aesthetic.
 */
const BrandingSettings: React.FC = () => {
  const { branding, setBranding } = useApp();
  const [color, setColor] = useState(branding.primaryColor);
  const [font, setFont] = useState(branding.font);

  const handleApply = () => {
    // Persist the new branding preferences via context action.
    setBranding(color, font);
  };

  return (
    <section className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-semibold mb-4 text-white">Branding &amp; Style</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-white mb-1" htmlFor="primaryColor">
            Primary Colour
          </label>
          <input
            id="primaryColor"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 rounded border border-white/30 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1" htmlFor="fontFamily">
            Font Family
          </label>
          <select
            id="fontFamily"
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full h-10 rounded border border-white/30 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="inter">Inter</option>
            <option value="outfit">Outfit</option>
            <option value="roboto">Roboto</option>
            <option value="poppins">Poppins</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleApply}
        className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors"
      >
        Apply Changes
      </button>
    </section>
  );
};

export default BrandingSettings;
