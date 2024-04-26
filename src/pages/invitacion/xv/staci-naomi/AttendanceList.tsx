import React, { useEffect, useRef, useState } from 'react'
import useConfirmAttendance from '../../../../hooks/useConfirmAttendance'
import { downloadCSV, type DataItem } from '../../../../utils/functions'

const AttendanceList = () => {
	const { fetchInvite, currentInvite } = useConfirmAttendance('staci_naomi')
	const [totalAttendance, setTotalAttendance] = useState(0)
	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			fetchInvite()
		}
	}, [firstRender])

	useEffect(() => {
		if (currentInvite?.guests?.length) {
			const total = currentInvite?.guests?.reduce((acc, guest) => {
				if (!!guest?.attendance) {
					return acc + 1 + (guest?.guests || 0)
				}
				return acc
			}, 0)
			setTotalAttendance(total)
		}
	}, [currentInvite])

	const onDownload = () => {
		const data: DataItem[] =
			currentInvite?.guests
				?.filter((i) => {
					return !!i?.name
				})
				?.map((guest) => {
					return {
						Nombre: guest.name,
						Asistencia: guest.attendance ? 'Asistirá' : 'No asistirá',
						Acompañantes: guest.guests
					} as DataItem
				}) || []
		downloadCSV(data, 'asistencia.csv')
	}

	return (
		<section className="flex flex-col">
			{(currentInvite?.guests?.length || 1) > 1 ? (
				<>
					<h5 className="font-[Lora] text-lg text-center mb-6">
						Confirmaciones totales: {totalAttendance}
					</h5>
					<button
						className=" w-[90%]  ms:w-[85%] bg-[#ce9f95] text-white py-2 px-4 xs:text-sm ms:text-base text-center hover:shadow-lg transition ease-in-out mx-auto mb-8"
						onClick={onDownload}
					>
						Descargar lista de asistencia
					</button>
				</>
			) : (
				<h5 className="font-[Lora] text-lg text-center mb-6 px-8">
					Aquí podrás ver la lista de asistencia
					<br />
					<br />
					Aún no hay confirmaciones
				</h5>
			)}
			<div className="flex flex-col w-[90%]  ms:w-[85%] mx-auto">
				{currentInvite?.guests?.length
					? currentInvite?.guests?.map((guest, index) => (
							<div
								className={`py-3 px-4 w-full border rounded-lg shadow-sm shadow-[#ba999b] mb-4 ${
									!!guest?.name ? '' : 'hidden'
								}`}
								key={index}
							>
								<div className="flex items-center gap-1">
									<div className="flex-shrink-0">
										<img
											className="w-[2rem] h-[2rem] ms:w-[3rem] ms:h-[4rem] rounded-full"
											src={`https://source.boringavatars.com/beam/120/${
												guest?.name || ''
											}?colors=ba999b,d1bbbc,efe8e8`}
											alt="Neil image"
										/>
									</div>
									<div className="flex-1 min-w-0 ms-4">
										<p className="text-xs ms:text-base font-medium text-gray-900 capitalize font-[Lora] italic">
											{guest?.name || '- - -'}
										</p>
										<p
											className={`text-sm text-gray-500 truncate font-[Lora] italic ${
												guest.attendance ? `text-[#387b38]` : 'text-[#803e3e]'
											}`}
										>
											{guest.attendance ? `Asistirá` : 'No asistirá'}
										</p>
									</div>
									<div className="inline-flex items-center text-xs ms:text-sm text-gray-500 truncate font-[Lora] italic text-center">
										Acompañantes <br />
										{guest?.guests}
									</div>
								</div>
							</div>
					  ))
					: null}
			</div>
		</section>
	)
}

export default AttendanceList
