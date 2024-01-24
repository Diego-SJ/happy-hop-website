type RadioProps = {
	title?: string
	subtitle?: string
	name?: string
	id?: string
	value?: string
	class?: string
	checked?: boolean
	onChange?: (target: EventTarget & HTMLInputElement) => void
}

const Radio = ({
	title,
	subtitle,
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
		<>
			<input
				type="radio"
				id={id}
				name={name}
				value={value}
				checked={checked}
				className={`hidden peer ${className}`}
				onChange={({ target }) => handleChange(target)}
				required
			/>
			<label
				htmlFor={id}
				className="group inline-flex items-center justify-between w-full py-2 px-3 text-slate-400  border border-gray-200 rounded-2xl cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-slate-500 hover:bg-gray-50"
			>
				<div className="block">
					<div className="w-full text-base font-medium">{title}</div>
					<div className="w-full text-xs">{subtitle}</div>
				</div>
				<svg width="24" height="24" className="opacity-0 peer-checked:group-[]:opacity-100">
					<path
						fill="currentColor"
						fillRule="evenodd"
						d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.536-13.536A1 1 0 0 1 16.95 9.88l-5.653 5.653-.004.004a.997.997 0 0 1-1.414 0l-.004-.004-2.825-2.825a1 1 0 1 1 1.414-1.414l2.122 2.121 4.95-4.95Z"
						clipRule="evenodd"
					></path>
				</svg>
			</label>
		</>
	)
}

export default Radio
