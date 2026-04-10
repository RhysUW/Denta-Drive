import { useState, useMemo, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import medicationsData, { getCustomEntries, saveCustomEntries } from '../data/medicationsData';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

// ─── Table config ─────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: 'drugs',                label: 'Drug / Examples',       className: 'w-44' },
  { key: 'drugClass',            label: 'Class',                 className: 'w-36' },
  { key: 'mechanism',            label: 'Mechanism of Action',   className: '' },
  { key: 'purpose',              label: 'Purpose / Main Use',    className: '' },
  { key: 'sideEffects',          label: 'Side Effects',          className: '' },
  { key: 'dentalConsiderations', label: 'Dental Considerations', className: '' },
  { key: 'drugInteractions',     label: 'Drug Interactions',     className: '' },
];

const NEW_CLASS_FIELDS = [
  { key: 'drugClass',            label: 'Class Name *',          placeholder: 'e.g. Beta Blockers',                   required: true,  multiline: false },
  { key: 'mechanism',            label: 'Mechanism of Action',   placeholder: 'How the drug works…',                  required: false, multiline: true  },
  { key: 'purpose',              label: 'Purpose / Main Use',    placeholder: 'What it is used for…',                 required: false, multiline: true  },
  { key: 'sideEffects',          label: 'Side Effects',          placeholder: 'Notable side effects…',                required: false, multiline: true  },
  { key: 'dentalConsiderations', label: 'Dental Considerations', placeholder: 'Relevant considerations for dentistry…', required: false, multiline: true  },
  { key: 'drugInteractions',     label: 'Drug Interactions',     placeholder: 'Known interactions…',                  required: false, multiline: true  },
];

// ─── Category colours ─────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  cardiovascular:   { pill: 'bg-blue-50 text-blue-700',     dot: 'bg-blue-500',     label: 'Cardiovascular'        },
  respiratory:      { pill: 'bg-red-50 text-red-700',       dot: 'bg-red-500',      label: 'Respiratory'           },
  renal:            { pill: 'bg-green-50 text-green-700',   dot: 'bg-green-500',    label: 'Renal & Genitourinary' },
  gastrointestinal: { pill: 'bg-yellow-50 text-yellow-700', dot: 'bg-yellow-500',   label: 'Gastrointestinal'      },
  hormonal:         { pill: 'bg-purple-50 text-purple-700', dot: 'bg-purple-500',   label: 'Hormonal'              },
  dermatological:   { pill: 'bg-pink-50 text-pink-700',    dot: 'bg-pink-500',     label: 'Dermatological'        },
};

function categoryStyles(category) {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.cardiovascular;
}

// ─── Cell renderer ────────────────────────────────────────────────────────────

function Cell({ value, category }) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <span className="text-gray-300">—</span>;
  }
  if (Array.isArray(value)) {
    const { pill } = categoryStyles(category);
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((drug) => (
          <span key={drug} className={`inline-block text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${pill}`}>
            {drug}
          </span>
        ))}
      </div>
    );
  }
  return <span className="text-gray-700">{value}</span>;
}

// ─── Add Drug Modal ───────────────────────────────────────────────────────────

const EMPTY_NEW_CLASS = {
  drugClass: '', mechanism: '', purpose: '', sideEffects: '', dentalConsiderations: '', drugInteractions: '',
};

function AddDrugModal({ open, onClose, existingClasses, onSave }) {
  const [mode, setMode] = useState('existing'); // 'existing' | 'new'
  const [drugName, setDrugName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [newClass, setNewClass] = useState(EMPTY_NEW_CLASS);
  const [errors, setErrors] = useState({});

  // Reset on open
  useEffect(() => {
    if (open) {
      setMode('existing');
      setDrugName('');
      setSelectedClass(existingClasses[0]?.drugClass || '');
      setNewClass(EMPTY_NEW_CLASS);
      setErrors({});
    }
  }, [open, existingClasses]);

  const validate = () => {
    const errs = {};
    if (!drugName.trim()) errs.drugName = 'Drug name is required.';
    if (mode === 'existing' && !selectedClass) errs.selectedClass = 'Please select a class.';
    if (mode === 'new' && !newClass.drugClass.trim()) errs.drugClass = 'Class name is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (mode === 'existing') {
      onSave({ mode: 'existing', drugName: drugName.trim(), targetClass: selectedClass });
    } else {
      onSave({ mode: 'new', drugName: drugName.trim(), classData: newClass });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Drug" size="lg">
      <div className="space-y-5">

        {/* Drug name — always visible */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Drug Name *</label>
          <input
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="e.g. Ramipril"
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${errors.drugName ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.drugName && <p className="text-xs text-red-500 mt-1">{errors.drugName}</p>}
        </div>

        {/* Mode toggle */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Add to…</p>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              type="button"
              onClick={() => setMode('existing')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'existing' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Existing class
            </button>
            <button
              type="button"
              onClick={() => setMode('new')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'new' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              New class
            </button>
          </div>
        </div>

        {/* Existing class selector */}
        {mode === 'existing' && (
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Class *</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white ${errors.selectedClass ? 'border-red-400' : 'border-gray-200'}`}
            >
              {existingClasses.map((c) => (
                <option key={c.drugClass} value={c.drugClass}>{c.drugClass}</option>
              ))}
            </select>
            {errors.selectedClass && <p className="text-xs text-red-500 mt-1">{errors.selectedClass}</p>}
          </div>
        )}

        {/* New class fields */}
        {mode === 'new' && (
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">New class details</p>
            {NEW_CLASS_FIELDS.map(({ key, label, placeholder, multiline }) => (
              <div key={key}>
                <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
                {multiline ? (
                  <textarea
                    value={newClass[key]}
                    onChange={(e) => setNewClass((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    rows={2}
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-y ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
                  />
                ) : (
                  <input
                    value={newClass[key]}
                    onChange={(e) => setNewClass((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
                  />
                )}
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleSave}>Add Drug</Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MedicationsPage() {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Merge static base data with user patches and new entries from localStorage
  const [allEntries, setAllEntries] = useState(() => {
    const { patches = {}, newEntries = [] } = getCustomEntries();
    const merged = medicationsData.map((entry) =>
      patches[entry.drugClass]
        ? { ...entry, drugs: [...entry.drugs, ...patches[entry.drugClass]] }
        : entry
    );
    return [...merged, ...newEntries];
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allEntries.filter((entry) => {
      if (activeCategory) {
        const entryCat = entry.category ?? 'cardiovascular';
        if (entryCat !== activeCategory) return false;
      }
      if (!q) return true;
      return (
        entry.drugs.some((d) => d.toLowerCase().includes(q)) ||
        entry.drugClass.toLowerCase().includes(q) ||
        entry.mechanism.toLowerCase().includes(q) ||
        entry.purpose.toLowerCase().includes(q) ||
        entry.sideEffects.toLowerCase().includes(q) ||
        entry.dentalConsiderations.toLowerCase().includes(q) ||
        entry.drugInteractions.toLowerCase().includes(q)
      );
    });
  }, [query, allEntries, activeCategory]);

  const handleSave = ({ mode, drugName, targetClass, classData }) => {
    let updated;

    if (mode === 'existing') {
      updated = allEntries.map((entry) =>
        entry.drugClass === targetClass
          ? { ...entry, drugs: [...entry.drugs, drugName] }
          : entry
      );
    } else {
      updated = [...allEntries, { drugs: [drugName], ...classData }];
    }

    // Persist as two separate structures so static base data is never duplicated:
    //   patches: { [drugClass]: [extra drug names added to a static class] }
    //   newEntries: [full entry objects for brand-new classes]
    const stored = getCustomEntries(); // { patches, newEntries }
    const patches = stored.patches || {};
    const newEntries = stored.newEntries || [];

    if (mode === 'existing') {
      // Record the new drug name under the patched class
      patches[targetClass] = [...(patches[targetClass] || []), drugName];
      saveCustomEntries({ patches, newEntries });
    } else {
      const newEntry = { drugs: [drugName], ...classData };
      saveCustomEntries({ patches, newEntries: [...newEntries, newEntry] });
    }

    setAllEntries(updated);
    setModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
          <p className="text-sm text-gray-400 mt-1">
            Drug reference — {medicationsData.length} built-in classes
          </p>
        </div>
        <Button icon={<Plus size={15} />} onClick={() => setModalOpen(true)}>
          Add Drug
        </Button>
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

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(CATEGORY_STYLES).map(([key, { dot, pill, label }]) => {
          const isActive = activeCategory === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : key)}
              className={`flex items-center gap-1.5 rounded-full transition-all ${isActive ? 'ring-2 ring-offset-1 ring-gray-400' : 'opacity-70 hover:opacity-100'}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pill}`}>{label} Drugs</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {COLUMNS.map((col) => (
                <th key={col.key} className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide ${col.className}`}>
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
                      <Cell value={entry[col.key]} category={entry.category} />
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
          Showing {filtered.length} of {allEntries.length} drug classes
        </p>
      )}

      <AddDrugModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        existingClasses={allEntries}
        onSave={handleSave}
      />
    </div>
  );
}
