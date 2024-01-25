import type React from 'react'

type RadioProps = {
	placeholder?: string
	type?: React.HTMLInputTypeAttribute
	name?: string
	id?: string
	value?: string
	class?: string
	checked?: boolean
	onChange?: (target: EventTarget & HTMLInputElement) => void
}

const Input = ({
	placeholder = '',
	type = 'text',
	name = '',
	id,
	value,
	checked = false,
	onChange,
	class: className = ''
}: RadioProps) => {
	const handleChange = (target: EventTarget & HTMLInputElement) => {
		if (onChange) onChange(target)
	}

	return (
		<div className={`inline-flex flex-col w-full ${className}`}>
			<div className="w-full text-xs mb-1 text-slate-500">{placeholder}</div>
			<input
				type={type}
				id={id}
				name={name}
				value={value}
				checked={checked}
				placeholder={placeholder}
				className={`h-[3rem] min-h-[3rem] min-w-full font-normal w-full outline-none  px-3 text-gray-500 bg-transparent border border-gray-200 placeholder:font-normal placeholder:text-slate-300 rounded-2xl cursor-text focus:border-indigo-600 hover:bg-gray-50 ${
					!!value ? 'border-indigo-600' : 'border-gray-200'
				} invalid:text-red-500 `}
				onChange={({ target }) => handleChange(target)}
			/>
			{/* <p className="text-red-500 font-medium text-normal px-3 opacity-0">Error</p> */}
		</div>
	)
}

export default Input
