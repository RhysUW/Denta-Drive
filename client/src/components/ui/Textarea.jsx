import { forwardRef } from 'react';

const Textarea = forwardRef(({ label, error, className = '', rows = 3, ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      ref={ref}
      rows={rows}
      className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors resize-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-gray-50 ${
        error ? 'border-red-400' : 'border-gray-200'
      } ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

Textarea.displayName = 'Textarea';
export default Textarea;
