import { forwardRef } from 'react';

const Select = forwardRef(({ label, error, className = '', children, ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <select
      ref={ref}
      className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-gray-50 ${
        error ? 'border-red-400' : 'border-gray-200'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

Select.displayName = 'Select';
export default Select;
