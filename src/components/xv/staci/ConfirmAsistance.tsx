import { useEffect, useRef, useState } from 'react'
import useConfirmAttendance from '../../../hooks/useConfirmAttendance'

const ConfirmAsistance = () => {
	const { loading, fetchInvite, sendAttendance, voteSent, currentInvite } =
		useConfirmAttendance('staci_naomi')
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

	const handleSelect = async () => {
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
				style={{ fontFamily: 'Cinzel Decorative' }}
				className=" text-2xl mb-[1rem] mt-6 ms:text-3xl text-white text-center px-4"
			>
				{voteSent ? '¡Gracias por confirmar!' : 'Confirma tu asistencia'}
			</h4>

			{voteSent && (
				<h3
					style={{ fontFamily: 'Cinzel Decorative' }}
					className=" text-lg mb-[1rem] mt-6 ms:text-2xl text-white text-center px-4"
				>
					{voteSent.name}
				</h3>
			)}

			<p
				style={{ fontFamily: 'Lora' }}
				className="italic text-center text-lg text-white leading-6 ms:px-8"
			>
				Agradecemos tu presencia en este día tan especial para nosotros.
			</p>
			{!voteSent && (
				<form className="mt-8 mb-8 w-full ms:px-10">
					<label
						htmlFor="countries"
						className="block mb-2 text-base font-medium text-gray-900 dark:text-white font-['Lora'] italic "
					>
						¿Asitirás?
					</label>
					<select
						id="attendance"
						name="attendance"
						value={formData.attendance}
						onChange={handleChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-[#ffffff] focus:border-[#ba999b] block w-full p-2 outline-none mb-4"
					>
						<option value="">Selecciona una opción</option>
						<option value="yes">Sí</option>
						<option value="no">No</option>
					</select>

					<label
						htmlFor="name"
						className="block mb-2 text-base font-medium text-gray-900 dark:text-white font-['Lora'] italic "
					>
						Nombre(s) y Apellido(s):
					</label>
					<input
						type="text"
						value={formData.name}
						onChange={handleChange}
						id="name"
						name="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-[#ffffff] focus:border-[#ba999b] block w-full p-2 outline-none mb-4"
					/>

					{formData.attendance === 'yes' && (
						<>
							<label
								htmlFor="guests"
								className="block mb-2 text-base font-medium text-gray-900 dark:text-white font-['Lora'] italic "
							>
								No. de invitados:
							</label>
							<input
								type="number"
								value={formData.guests}
								onChange={handleChange}
								id="guests"
								name="guests"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-[#ffffff] focus:border-[#ba999b] block w-full p-2 outline-none mb-4"
							/>
						</>
					)}
					<button
						disabled={loading}
						onClick={handleSelect}
						className="mt-6 font-['Lora'] bg-[#6d5153] text-white py-2 px-4 xs:text-sm ms:text-base w-full text-center hover:shadow-lg transition duration-300 ease-in-out"
					>
						{loading ? 'Enviando...' : 'Enviar confirmación'}
					</button>
				</form>
			)}
		</div>
	)
}

export default ConfirmAsistance
