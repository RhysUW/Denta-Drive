import { useState, useRef, useCallback } from 'react';
import { Plus, FileText, Image as ImageIcon, File, Trash2, X, Upload, ChevronDown, ChevronRight, Edit2 } from 'lucide-react';

// ─── Persistence ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'dentaltrack_general_data';

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"categories":[]}'); }
  catch { return { categories: [] }; }
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── Colour palette ───────────────────────────────────────────────────────────

const COLOURS = [
  { id: 'emerald', label: 'Green',  header: 'bg-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700', deleteHover: 'hover:text-emerald-600' },
  { id: 'blue',    label: 'Blue',   header: 'bg-blue-600',    border: 'border-blue-200',    badge: 'bg-blue-100 text-blue-700',       deleteHover: 'hover:text-blue-600'    },
  { id: 'purple',  label: 'Purple', header: 'bg-purple-600',  border: 'border-purple-200',  badge: 'bg-purple-100 text-purple-700',   deleteHover: 'hover:text-purple-600'  },
  { id: 'orange',  label: 'Orange', header: 'bg-orange-500',  border: 'border-orange-200',  badge: 'bg-orange-100 text-orange-700',   deleteHover: 'hover:text-orange-500'  },
  { id: 'red',     label: 'Red',    header: 'bg-red-600',     border: 'border-red-200',     badge: 'bg-red-100 text-red-700',         deleteHover: 'hover:text-red-600'     },
  { id: 'teal',    label: 'Teal',   header: 'bg-teal-600',    border: 'border-teal-200',    badge: 'bg-teal-100 text-teal-700',       deleteHover: 'hover:text-teal-600'    },
  { id: 'pink',    label: 'Pink',   header: 'bg-pink-500',    border: 'border-pink-200',    badge: 'bg-pink-100 text-pink-700',       deleteHover: 'hover:text-pink-500'    },
  { id: 'amber',   label: 'Amber',  header: 'bg-amber-500',   border: 'border-amber-200',   badge: 'bg-amber-100 text-amber-700',     deleteHover: 'hover:text-amber-500'   },
  { id: 'sky',     label: 'Sky',    header: 'bg-sky-600',     border: 'border-sky-200',     badge: 'bg-sky-100 text-sky-700',         deleteHover: 'hover:text-sky-600'     },
  { id: 'slate',   label: 'Slate',  header: 'bg-slate-600',   border: 'border-slate-200',   badge: 'bg-slate-100 text-slate-700',     deleteHover: 'hover:text-slate-600'   },
];

const getColour = (id) => COLOURS.find((c) => c.id === id) ?? COLOURS[0];

// ─── Add / Edit Category Modal ────────────────────────────────────────────────

function CategoryModal({ initial, onClose, onSave }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [colour, setColour] = useState(initial?.colour ?? COLOURS[0].id);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), colour });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">{initial ? 'Edit category' : 'New category'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="e.g. Drug protocols, Patient handouts…"
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 mb-4"
        />

        <label className="block text-xs font-medium text-gray-600 mb-2">Colour</label>
        <div className="flex flex-wrap gap-2 mb-6">
          {COLOURS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColour(c.id)}
              title={c.label}
              className={`w-7 h-7 rounded-full ${c.header} transition-transform ${
                colour === c.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
          <button
            disabled={!name.trim()}
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg bg-brand-500 text-white font-medium disabled:opacity-40 hover:bg-brand-600"
          >
            {initial ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Entry Modal ──────────────────────────────────────────────────────────

function AddEntryModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // { name, dataUrl, fileType }
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFile = useCallback((f) => {
    if (!f) return;
    const isPdf = f.type === 'application/pdf';
    const isImage = f.type.startsWith('image/');
    if (!isPdf && !isImage) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile({ name: f.name, dataUrl: e.target.result, fileType: isPdf ? 'pdf' : 'image' });
      setName((prev) => prev || f.name.replace(/\.[^.]+$/, ''));
    };
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const canSave = name.trim() && (type === 'text' ? content.trim() : file !== null);

  const handleSave = () => {
    if (!canSave) return;
    if (type === 'text') {
      onSave({ name: name.trim(), type: 'text', content });
    } else {
      onSave({ name: name.trim(), type: 'file', fileType: file.fileType, dataUrl: file.dataUrl, fileName: file.name });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">New entry</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entry name…"
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 mb-4"
        />

        {/* Type toggle */}
        <div className="flex gap-2 mb-4">
          {['text', 'file'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === t ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'text' ? 'Text note' : 'PDF / Image'}
            </button>
          ))}
        </div>

        {type === 'text' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note…"
            rows={5}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none mb-4"
          />
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors mb-4 ${
              dragging ? 'border-brand-400 bg-brand-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                {file.fileType === 'pdf'
                  ? <File size={18} className="text-red-500" />
                  : <ImageIcon size={18} className="text-blue-500" />}
                <span className="font-medium truncate max-w-xs">{file.name}</span>
              </div>
            ) : (
              <>
                <Upload size={20} className="text-gray-400" />
                <p className="text-xs text-gray-400">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-300">PDF or image files</p>
              </>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
          <button
            disabled={!canSave}
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg bg-brand-500 text-white font-medium disabled:opacity-40 hover:bg-brand-600"
          >
            Add entry
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── View Entry Modal ─────────────────────────────────────────────────────────

function ViewEntryModal({ entry, onClose }) {
  const isPdf = entry.type === 'file' && entry.fileType === 'pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className={`bg-white shadow-xl flex flex-col ${
          isPdf ? 'w-full h-full' : 'rounded-2xl w-full max-w-2xl mx-4 max-h-[85vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-semibold text-gray-900 truncate">{entry.name}</h2>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            {isPdf && (
              <button
                onClick={() => window.open(entry.dataUrl, '_blank')}
                className="text-xs font-medium text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Open in new tab
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {entry.type === 'text' && (
            <div className="p-6">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
            </div>
          )}
          {entry.type === 'file' && entry.fileType === 'image' && (
            <div className="p-6">
              <img src={entry.dataUrl} alt={entry.name} className="max-w-full rounded-lg" />
            </div>
          )}
          {isPdf && (
            <iframe
              src={entry.dataUrl}
              title={entry.name}
              className="w-full h-full border-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GeneralPage() {
  const [data, setData] = useState(loadData);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [addEntryForCategory, setAddEntryForCategory] = useState(null);
  const [viewEntry, setViewEntry] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const persist = (next) => {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  // Category actions
  const createCategory = ({ name, colour }) => {
    persist({ categories: [...data.categories, { id: genId(), name, colour, entries: [] }] });
    setAddCategoryOpen(false);
  };

  const updateCategory = ({ name, colour }) => {
    persist({
      categories: data.categories.map((c) =>
        c.id === editCategory.id ? { ...c, name, colour } : c
      ),
    });
    setEditCategory(null);
  };

  const deleteCategory = (cat) => {
    if (!window.confirm(`Delete "${cat.name}" and all its entries?`)) return;
    persist({ categories: data.categories.filter((c) => c.id !== cat.id) });
  };

  // Entry actions
  const addEntry = (entry) => {
    persist({
      categories: data.categories.map((c) =>
        c.id === addEntryForCategory
          ? { ...c, entries: [...c.entries, { id: genId(), ...entry }] }
          : c
      ),
    });
    setAddEntryForCategory(null);
  };

  const deleteEntry = (categoryId, entryId) => {
    persist({
      categories: data.categories.map((c) =>
        c.id === categoryId
          ? { ...c, entries: c.entries.filter((e) => e.id !== entryId) }
          : c
      ),
    });
  };

  const toggleCollapse = (id) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General</h1>
          <p className="text-sm text-gray-400 mt-1">Store notes, PDFs, and images in custom categories.</p>
        </div>
        <button
          onClick={() => setAddCategoryOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors"
        >
          <Plus size={16} />
          New category
        </button>
      </div>

      {/* Empty state */}
      {data.categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Plus size={24} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">No categories yet</p>
          <p className="text-xs text-gray-400 mb-5">Create a category to start adding notes and files.</p>
          <button
            onClick={() => setAddCategoryOpen(true)}
            className="px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600"
          >
            Add your first category
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {data.categories.map((cat) => {
            const colour = getColour(cat.colour);
            const isCollapsed = !!collapsed[cat.id];

            return (
              <div key={cat.id} className={`rounded-xl border ${colour.border} overflow-hidden shadow-sm`}>
                {/* Card header */}
                <div className={`${colour.header} px-5 py-3 flex items-center justify-between`}>
                  <button
                    onClick={() => toggleCollapse(cat.id)}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  >
                    {isCollapsed
                      ? <ChevronRight size={16} className="text-white/80 shrink-0" />
                      : <ChevronDown size={16} className="text-white/80 shrink-0" />}
                    <h2 className="text-sm font-semibold text-white truncate">{cat.name}</h2>
                    <span className="text-xs text-white/70 ml-1 shrink-0">
                      {cat.entries.length} {cat.entries.length === 1 ? 'entry' : 'entries'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1 ml-3">
                    <button
                      onClick={() => setAddEntryForCategory(cat.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-colors"
                    >
                      <Plus size={13} /> Add entry
                    </button>
                    <button
                      onClick={() => setEditCategory(cat)}
                      className="p-1.5 rounded-lg text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                      title="Edit category"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat)}
                      className="p-1.5 rounded-lg text-white/70 hover:bg-white/20 hover:text-red-200 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Entry list */}
                {!isCollapsed && (
                  <div className="bg-white">
                    {cat.entries.length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <p className="text-xs text-gray-400 mb-2">No entries yet</p>
                        <button
                          onClick={() => setAddEntryForCategory(cat.id)}
                          className={`text-xs font-medium ${colour.badge} px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity`}
                        >
                          + Add first entry
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {cat.entries.map((entry) => (
                          <div
                            key={entry.id}
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                          >
                            <button
                              onClick={() => setViewEntry(entry)}
                              className="flex items-center gap-3 flex-1 min-w-0 text-left"
                            >
                              {entry.type === 'text' && <FileText size={15} className="text-gray-400 shrink-0" />}
                              {entry.type === 'file' && entry.fileType === 'pdf' && <File size={15} className="text-red-400 shrink-0" />}
                              {entry.type === 'file' && entry.fileType === 'image' && <ImageIcon size={15} className="text-blue-400 shrink-0" />}
                              <span className="text-sm text-gray-700 truncate">{entry.name}</span>
                              <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${colour.badge}`}>
                                {entry.type === 'text' ? 'Note' : entry.fileType === 'pdf' ? 'PDF' : 'Image'}
                              </span>
                            </button>
                            <button
                              onClick={() => deleteEntry(cat.id, entry.id)}
                              className={`p-1 text-gray-300 ${colour.deleteHover} opacity-0 group-hover:opacity-100 transition-all`}
                              title="Delete entry"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {addCategoryOpen && (
        <CategoryModal onClose={() => setAddCategoryOpen(false)} onSave={createCategory} />
      )}
      {editCategory && (
        <CategoryModal initial={editCategory} onClose={() => setEditCategory(null)} onSave={updateCategory} />
      )}
      {addEntryForCategory && (
        <AddEntryModal onClose={() => setAddEntryForCategory(null)} onSave={addEntry} />
      )}
      {viewEntry && (
        <ViewEntryModal entry={viewEntry} onClose={() => setViewEntry(null)} />
      )}
    </div>
  );
}
