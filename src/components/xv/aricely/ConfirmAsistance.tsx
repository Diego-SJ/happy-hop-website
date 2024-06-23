import { useEffect, useRef, useState } from 'react'
import useConfirmAttendance from '../../../hooks/useConfirmAttendance'

const ConfirmAsistance = () => {
	const { loading, fetchInvite, sendAttendance, voteSent } = useConfirmAttendance('aricely_lopez')
	const firstRender = useRef(false)
	const titleRef = useRef<any>(null)
	const [formData, setFormData] = useState<{
		attendance: string
		name: string
		guests: number
	}>({ attendance: '', name: '', guests: 0 })

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			fetchInvite()
		}
	}, [firstRender])

	const handleChange = (e: any) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSelect = async (event: any) => {
		event.preventDefault()
		await sendAttendance({
			...formData,
			attendance: formData.attendance === 'yes',
			guests: Number(formData.guests)
		})
		titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}

	return (
		<div className="mb-6">
			<h4
				ref={titleRef}
				style={{ fontFamily: 'Cinzel Decorative' }}
				className={`text-2xl mb-[1rem] mt-6 ms:text-3xl text-white text-center px-4 ${
					voteSent ? 'animate-fade-up' : ''
				}`}
			>
				{voteSent ? '¡Gracias por confirmar!' : 'Confirma tu asistencia'}
			</h4>

			<img
				src="/invites/xv/staci/decoration-white.svg"
				alt="decoration"
				className={`w-[50%] mx-auto mb-6 ${voteSent ? 'animate-fade-up' : ''}`}
			/>

			{voteSent && (
				<h3
					style={{ fontFamily: 'Cinzel Decorative' }}
					className=" text-lg mb-[1rem] mt-6 ms:text-2xl text-white text-center px-4 animate-fade-up "
				>
					{voteSent.name}
				</h3>
			)}

			<p
				style={{ fontFamily: 'Lora' }}
				className={`italic text-center text-lg text-white leading-6 ms:px-8 ${
					voteSent ? 'animate-fade-up' : ''
				}`}
			>
				{voteSent?.attendance
					? '	Agradecemos tu presencia en este día tan especial para nosotros.'
					: voteSent?.name
					? 'Lamentamos que no puedas acompañarnos en este día tan especial.'
					: ''}
			</p>
			{!voteSent && (
				<form onSubmit={handleSelect} className="mt-8 mb-8 w-full ms:px-10">
					<label
						htmlFor="countries"
						className="block mb-2 text-base font-medium text-white  font-['Lora'] italic "
					>
						¿Asitirás?
					</label>
					<select
						id="attendance"
						name="attendance"
						value={formData.attendance}
						onChange={handleChange}
						className="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-[#ffffff] focus:border-red-950 block w-full p-2 outline-none mb-4"
					>
						<option value="">Selecciona una opción</option>
						<option value="yes">Sí</option>
						<option value="no">No</option>
					</select>

					<label
						htmlFor="name"
						className="block mb-2 text-base font-medium text-white  font-['Lora'] italic "
					>
						Nombre(s) y Apellido(s):
					</label>
					<input
						type="text"
						value={formData.name}
						onChange={handleChange}
						id="name"
						name="name"
						onFocus={({ target }) => target.select()}
						className="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-[#ffffff] focus:border-red-950 block w-full p-2 outline-none mb-4"
					/>

					{formData.attendance === 'yes' && (
						<>
							<label
								htmlFor="guests"
								className="block mb-2 text-base font-medium text-white  font-['Lora'] italic "
							>
								No. de invitados:
							</label>
							<input
								type="number"
								value={formData.guests}
								onChange={handleChange}
								min={0}
								onFocus={({ target }) => target.select()}
								id="guests"
								name="guests"
								className="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-[#ffffff] focus:border-red-950 block w-full p-2 outline-none mb-4"
							/>
						</>
					)}
					<button
						type="submit"
						disabled={
							loading ||
							!formData.attendance ||
							!formData.name ||
							(!formData.guests && formData.attendance === 'yes')
						}
						className="disabled:opacity-70 disabled:cursor-not-allowed mt-6 font-['Lora'] bg-yellow-600 text-white py-2 px-4 xs:text-sm ms:text-base w-full text-center hover:shadow-lg hover:disabled:shadow-none transition duration-300 ease-in-out"
					>
						{loading ? 'Enviando...' : 'Enviar confirmación'}
					</button>
				</form>
			)}
		</div>
	)
}

export default ConfirmAsistance
