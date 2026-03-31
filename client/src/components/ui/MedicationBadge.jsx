import { useState } from 'react';
import Badge from './Badge';
import { findEntryForDrug } from '../../data/medicationsData';

const FIELDS = [
  { key: 'purpose', label: 'Purpose' },
  { key: 'mechanism', label: 'Mechanism' },
  { key: 'sideEffects', label: 'Side Effects' },
  { key: 'dentalConsiderations', label: 'Dental Considerations' },
  { key: 'drugInteractions', label: 'Drug Interactions' },
];

export default function MedicationBadge({ name }) {
  const [visible, setVisible] = useState(false);
  const entry = findEntryForDrug(name);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Badge variant="yellow" className="cursor-default">{name}</Badge>
      {visible && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-72 rounded-xl bg-blue-600 text-white shadow-lg p-3 text-xs space-y-2">
          {entry === null ? (
            <p className="text-blue-100 italic">No reference data available for this medication.</p>
          ) : (
            <>
              <p className="font-bold text-sm border-b border-blue-400 pb-1.5">{entry.drugClass}</p>
              {FIELDS.map(({ key, label }) =>
                entry[key] ? (
                  <div key={key}>
                    <p className="text-blue-200 font-semibold uppercase tracking-wide text-[10px]">{label}</p>
                    <p className="text-white leading-relaxed">{entry[key]}</p>
                  </div>
                ) : null
              )}
            </>
          )}
        </div>
      )}
    </span>
  );
}
