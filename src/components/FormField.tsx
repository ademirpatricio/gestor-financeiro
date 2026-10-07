import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string
  label: string
  icon?: ReactNode
  endAdornment?: ReactNode
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { id, label, icon, endAdornment, className = '', ...inputProps },
  ref,
) {
  return (
    <div>
      <label htmlFor={id} className="block text-body font-bold text-brown_dark mb-0">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brown pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full border-b-2 border-brown_light bg-transparent py-4 transition-colors
            text-brown_light text-body focus:outline-none focus:ring-0
            ${icon ? 'pl-10' : 'pl-4'} ${endAdornment ? 'pr-12' : 'pr-4'} ${className}`}
          {...inputProps}
        />
        {endAdornment && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown">
            {endAdornment}
          </div>
        )}
      </div>
    </div>
  )
})
