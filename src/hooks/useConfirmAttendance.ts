import { useState } from 'react'
import { getXVInvites, sendXVAttendance, type ConfirmAsistance } from '../firebase/client'

const useConfirmAttendance = (id: string) => {
	const [loading, setLoading] = useState(false)
	const [voteSent, setVoteSent] = useState<{
		name: string
		attendance: boolean
		guests: number
	} | null>(null)
	const [currentInvite, setCurrentInvite] = useState<ConfirmAsistance | null>(null)

	// useEffect(() => {
	// 	if (currentInvite?.votes) {
	// 		let totalVotes = (currentInvite?.votes?.boy || 0) + (currentInvite?.votes?.girl || 0)
	// 		let boyVotes = Math.round((100 / totalVotes) * (currentInvite?.votes?.boy || 0))
	// 		let girlVotes = Math.round((100 / totalVotes) * (currentInvite?.votes?.girl || 0))
	// 		setPercentage({ boy: boyVotes || 0, girl: girlVotes || 0 })
	// 	}
	// }, [currentInvite])

	const fetchInvite = async () => {
		if (!id) return
		let alreadyVoted = JSON.parse(localStorage.getItem(`vote_${id}`) || 'null')
		setLoading(true)
		const result = await getXVInvites()
		let invite = result?.find((i) => i?.user === id) || null
		setCurrentInvite(invite)
		setLoading(false)

		if (!!alreadyVoted?.name) {
			setVoteSent(alreadyVoted)
			return
		}
	}

	const sendAttendance = async (data: { name: string; attendance: boolean; guests: number }) => {
		if (!currentInvite?.id) return
		setLoading(true)

		let guests = [...(currentInvite?.guests || [])]
		guests.push(data)

		let newData = { ...currentInvite, guests }

		await sendXVAttendance(id, currentInvite?.id, newData, data)
		setCurrentInvite(newData)
		setLoading(false)
	}

	return {
		fetchInvite,
		currentInvite,
		loading,
		sendAttendance,
		voteSent
	}
}

export default useConfirmAttendance
