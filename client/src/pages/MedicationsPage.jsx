import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import medicationsData from '../data/medicationsData';

const COLUMNS = [
  { key: 'drugs',                label: 'Drug / Examples',         className: 'w-44' },
  { key: 'drugClass',            label: 'Class',                   className: 'w-36' },
  { key: 'mechanism',            label: 'Mechanism of Action',     className: '' },
  { key: 'purpose',              label: 'Purpose / Main Use',      className: '' },
  { key: 'sideEffects',          label: 'Side Effects',            className: '' },
  { key: 'dentalConsiderations', label: 'Dental Considerations',   className: '' },
  { key: 'drugInteractions',     label: 'Drug Interactions',       className: '' },
];

function Cell({ value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <span className="text-gray-300">—</span>;
  }
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((drug) => (
          <span
            key={drug}
            className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
          >
            {drug}
          </span>
        ))}
      </div>
    );
  }
  return <span className="text-gray-700">{value}</span>;
}

export default function MedicationsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return medicationsData;
    return medicationsData.filter((entry) =>
      entry.drugs.some((d) => d.toLowerCase().includes(q)) ||
      entry.drugClass.toLowerCase().includes(q) ||
      entry.mechanism.toLowerCase().includes(q) ||
      entry.purpose.toLowerCase().includes(q) ||
      entry.sideEffects.toLowerCase().includes(q) ||
      entry.dentalConsiderations.toLowerCase().includes(q) ||
      entry.drugInteractions.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
        <p className="text-sm text-gray-400 mt-1">Cardiovascular drug reference — {medicationsData.length} drug classes</p>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search drugs, class, side effects…"
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide ${col.className}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-sm text-gray-400">
                  No medications match your search.
                </td>
              </tr>
            ) : (
              filtered.map((entry, i) => (
                <tr key={i} className="align-top hover:bg-gray-50 transition-colors">
                  {COLUMNS.map((col) => (
                    <td key={col.key} className="px-4 py-3 leading-relaxed">
                      <Cell value={entry[col.key]} />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="mt-3 text-xs text-gray-400">
          Showing {filtered.length} of {medicationsData.length} drug classes
        </p>
      )}
    </div>
  );
}
