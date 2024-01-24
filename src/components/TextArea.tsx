type RadioProps = {
	placeholder?: string
	name?: string
	id?: string
	value?: string
	className?: string
	onChange?: (target: EventTarget & HTMLTextAreaElement) => void
}

const Input = ({
	placeholder = '',
	name = '',
	id,
	value,
	onChange,
	className = ''
}: RadioProps) => {
	const handleChange = (target: EventTarget & HTMLTextAreaElement) => {
		if (onChange) onChange(target)
	}

	return (
		<div className={`inline-flex flex-col w-full ${className}`}>
			<div className="w-full text-xs mb-1 text-slate-500">{placeholder}</div>
			<textarea
				id={id}
				name={name}
				value={value}
				rows={2}
				placeholder={placeholder}
				className={`resize-none font-normal w-full outline-none  py-3 px-3 text-gray-500 bg-transparent border border-gray-200 placeholder:font-normal placeholder:text-slate-300 rounded-2xl cursor-text focus:border-indigo-600 hover:bg-gray-50 ${
					!!value ? 'border-indigo-600' : 'border-gray-200'
				} invalid:text-red-500 `}
				onChange={({ target }) => handleChange(target)}
			/>
			{/* <p className="text-red-500 font-medium text-normal px-3 opacity-0">Error</p> */}
		</div>
	)
}

export default Input
