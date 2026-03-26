import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Users, Calendar, Target, LogOut, BookOpen, ChevronDown, ChevronRight, Pill, FileText, Hash, LayoutGrid, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


const navItems = [
  { to: '/', icon: Users, label: 'Patients', end: true },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/goals', icon: Target, label: 'Requirements' },
];

const referenceItems = [
  { to: '/references/medications', icon: Pill, label: 'Medications' },
  { to: '/references/templates', icon: FileText, label: 'Templates' },
  { to: '/references/ada-codes', icon: Hash, label: 'ADA Codes' },
  { to: '/references/general', icon: LayoutGrid, label: 'General' },
];

const dentalRxItems = [
  { to: '/references/dental-rx/antibiotics', icon: Pill, label: 'Dental Antibiotics' },
  { to: '/references/dental-rx/antiviral', icon: Pill, label: 'Antiviral' },
  { to: '/references/dental-rx/antifungal', icon: Pill, label: 'Antifungal' },
  { to: '/references/dental-rx/local-anaesthetic', icon: Pill, label: 'Local Anaesthetic' },
  { to: '/references/dental-rx/analgesics', icon: Pill, label: 'Analgesics' },
];

const subNavLink = (to, Icon, label) => (
  <NavLink
    key={to}
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-brand-600 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`
    }
  >
    <Icon size={16} />
    {label}
  </NavLink>
);

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [referencesOpen, setReferencesOpen] = useState(location.pathname.startsWith('/references'));
  const [dentalRxOpen, setDentalRxOpen] = useState(location.pathname.startsWith('/references/dental-rx'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-60 bg-gray-900 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">Denta Drive</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {/* References collapsible */}
        <button
          onClick={() => setReferencesOpen((o) => !o)}
          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            location.pathname.startsWith('/references')
              ? 'bg-brand-500 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} />
            References
          </div>
          {referencesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {referencesOpen && (
          <div className="pl-4 space-y-1">
            {/* Medications */}
            {subNavLink('/references/medications', Pill, 'Medications')}

            {/* Dental RX nested collapsible */}
            <button
              onClick={() => setDentalRxOpen((o) => !o)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/references/dental-rx')
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ClipboardList size={16} />
                Dental RX
              </div>
              {dentalRxOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>

            {dentalRxOpen && (
              <div className="pl-4 space-y-1">
                {dentalRxItems.map(({ to, icon: Icon, label }) =>
                  subNavLink(to, Icon, label)
                )}
              </div>
            )}

            {/* Remaining reference items */}
            {referenceItems.slice(1).map(({ to, icon: Icon, label }) =>
              subNavLink(to, Icon, label)
            )}
          </div>
        )}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="px-3 py-2 mb-1">
          <p className="text-white text-sm font-medium truncate">{user?.full_name || user?.username}</p>
          <p className="text-gray-500 text-xs truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
