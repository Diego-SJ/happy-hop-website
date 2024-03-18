import React, { useEffect, useRef, useState } from 'react'
import useRevelationInvite from '../../../hooks/useRevelationInvite'

const SelectSex = () => {
	const { loading, fetchInvite, sendVote, percentage, voteSent } =
		useRevelationInvite('MICHEL_CARRILLO')
	const firstRender = useRef(false)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			fetchInvite()
		}
	}, [firstRender])

	const handleSelect = async (sex: 'boy' | 'girl' | null) => {
		await sendVote(sex)
	}

	return (
		<div className="my-8 w-full">
			<h4 className="main-font text-center w-full leading-[0.8] xs:text-[3rem] ms:text-[5rem]">
				¿Será
			</h4>
			<h5 className="main-font  leading-[0.9] xs:text-[3rem] ms:text-[5rem] mb-4 -mt-2 w-full text-center">
				<span className="text-[#7f9abc]">Niño</span>
				<span className="text-[#e7be90]"> o </span>
				<span className="text-[#f59b98]">Niña?</span>
			</h5>

			{!voteSent && (
				<>
					{/* <p className="font-[Handlee] xs:text-[1.2rem] ms:text-[1.3rem] text-zinc-500 w-full text-center leading-7 mb-4">
						Selecciona el sexo del bebé
					</p> */}
					<div className="flex gap-4 px-[5%] w-full">
						<button
							disabled={loading}
							onClick={() => handleSelect('girl')}
							className="font-[Handlee] border-3 bg-[#f59b98] text-white border-[#f59b98] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] text-center"
						>
							{loading ? 'Enviando...' : 'Niña'}
						</button>
						<button
							disabled={loading}
							onClick={() => handleSelect('boy')}
							className="font-[Handlee] border-t-4 bg-[#7f9abc] text-white border-[#7f9abc] rounded-xl mx-auto xs:w-full xs:text-[1.5rem]  ms:text-[1.6rem] text-center"
						>
							{loading ? 'Enviando...' : 'Niño'}
						</button>
					</div>
				</>
			)}
			{!!voteSent && (
				<>
					<p className="font-[Handlee] xs:text-[1.2rem] ms:text-[1.3rem] text-zinc-500 w-full text-center leading-7 mb-4">
						¡Elegiste {voteSent === 'boy' ? 'Niño' : 'Niña'}!
					</p>
					<div className="flex flex-col px-4">
						<div className="w-full flex justify-between mb-2">
							<img
								className="xs:w-[3rem] ms:w-[4rem] xs:h-[2.6rem] ms:h-[3.5rem] mt-1"
								src="/invites/revelacion/osa.webp"
								alt="mamila rosa"
							/>
							<img
								className="xs:w-[3rem] ms:w-[4rem] xs:h-[3rem] ms:h-[4rem]"
								src="/invites/revelacion/oso.webp"
								alt="mamila azul"
							/>
						</div>
						<div className={`overflow-hidden w-full h-5 rounded-3xl bg-[#7f9abc] relative`}>
							<span
								className="flex h-full bg-[#f59b98]"
								style={{ width: `${percentage?.girl || 0}%` }}
							></span>
						</div>
						<div className="w-full flex justify-between mb-2">
							<p className="font-[Handlee] xs:text-[1.2rem] ms:text-[1.3rem] text-zinc-500 w-full text-center leading-7 mb-4">
								{`${percentage?.girl}%`}
							</p>
							<p className="font-[Handlee] xs:text-[1.2rem] ms:text-[1.3rem] text-zinc-500 w-full text-center leading-7 mb-4">
								{`${percentage?.boy}%`}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default SelectSex
