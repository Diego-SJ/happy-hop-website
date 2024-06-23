import { useEffect, useRef } from 'react'
import useRevelationInvite from '../../../hooks/useRevelationInvite'

const SelectSex = () => {
	const { loading, fetchInvite, sendVote, percentage, voteSent } =
		useRevelationInvite('MICHEL_CARRILLO')
	const firstRender = useRef(false)
	const titleRef = useRef<any>(null)

	useEffect(() => {
		if (!firstRender.current) {
			firstRender.current = true
			fetchInvite()
		}
	}, [firstRender])

	const handleSelect = async (sex: 'boy' | 'girl' | null) => {
		await sendVote(sex)
		titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}

	return (
		<div className="mt-8 mb-8 w-full">
			<h4
				ref={titleRef}
				className="main-font text-center w-full leading-[0.8] xs:text-[3rem] ms:text-[5rem]"
			>
				¿Será
			</h4>
			<h5 className="main-font  leading-[0.9] xs:text-[3rem] ms:text-[5rem] mb-4 -mt-2 w-full text-center">
				<span className="text-[#7f9abc]">Niño</span>
				<span className="text-[#e7be90]"> o </span>
				<span className="text-[#f59b98]">Niña?</span>
			</h5>

			{!voteSent && (
				<>
					<p className="font-[Handlee] xs:text-[1.2rem] ms:text-[1.3rem] text-zinc-500 w-full text-center leading-7 mb-4">
						¡Dinos que piensas!
					</p>
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
					<p className="font-[Handlee] xs:text-[1.2rem] ms:text-[1.3rem] text-zinc-500 w-full text-center leading-7 mb-6 max-w-[90%] mx-auto">
						<span className="mb-2 block animate-jump animate-infinite animate-duration-[2s]">
							¡Elegiste {voteSent === 'boy' ? 'Niño' : 'Niña'}!
						</span>
						{voteSent === 'boy'
							? 'Te invitamos a que vistas una prenda azul y traer pañales de cualquier etapa.'
							: 'Te invitamos a vestir una prenda rosa y traer toallitas húmedas.'}
					</p>
					<div className="flex flex-col px-4">
						<div className="w-full flex justify-between mb-2 animate-wiggle animate-infinite">
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
					<p className="font-[Handlee] xs:text-[1.5rem] ms:text-[1.8rem] text-zinc-500 w-full text-center leading-7 mb-4 max-w-[90%] mx-auto mt-8">
						¡Te esperamos!
					</p>
				</>
			)}
		</div>
	)
}

export default SelectSex
