import React from 'react';
import BoostPanel from './BoostPanel';
import BrandingSettings from './BrandingSettings';

/**
 * SettingsPanel – aggregates premium settings components like Boost and Branding.
 */
const SettingsPanel: React.FC = () => {
  return (
    <section className="p-6 space-y-8">
      <BoostPanel />
      <BrandingSettings />
    </section>
  );
};

export default SettingsPanel;
