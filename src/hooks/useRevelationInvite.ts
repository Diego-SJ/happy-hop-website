import { useEffect, useState } from 'react'
import {
	getRevelationInvites,
	updateRevelationInviteById,
	type RevelationInvite
} from '../firebase/client'

const useRevelationInvite = (id: string) => {
	const [loading, setLoading] = useState(false)
	const [percentage, setPercentage] = useState({ boy: 0, girl: 0 })
	const [voteSent, setVoteSent] = useState<string | null>(null)
	const [currentInvite, setCurrentInvite] = useState<RevelationInvite | null>(null)

	useEffect(() => {
		if (currentInvite?.votes) {
			let totalVotes = (currentInvite?.votes?.boy || 0) + (currentInvite?.votes?.girl || 0)
			let boyVotes = Math.round((100 / totalVotes) * (currentInvite?.votes?.boy || 0))
			let girlVotes = Math.round((100 / totalVotes) * (currentInvite?.votes?.girl || 0))
			setPercentage({ boy: boyVotes || 0, girl: girlVotes || 0 })
		}
	}, [currentInvite])

	const fetchInvite = async () => {
		if (!id) return
		let alreadyVoted = localStorage.getItem(`vote_${id}`)
		setLoading(true)
		const result = await getRevelationInvites()
		let invite = result?.find((i) => i?.user === id) || null
		setCurrentInvite(invite)
		setLoading(false)

		if (!!alreadyVoted) {
			setVoteSent(alreadyVoted)
			return
		}
	}

	const sendVote = async (vote: 'boy' | 'girl' | null) => {
		if (!currentInvite?.id) return
		setLoading(true)
		let updatedItem: RevelationInvite = {
			user: currentInvite?.user,
			event_date: currentInvite?.event_date,
			votes: {
				boy: vote === 'boy' ? (currentInvite?.votes?.boy || 0) + 1 : currentInvite?.votes?.boy || 0,
				girl:
					vote === 'girl' ? (currentInvite?.votes?.girl || 0) + 1 : currentInvite?.votes?.girl || 0
			}
		}
		await updateRevelationInviteById(id, currentInvite?.id, updatedItem, vote)
		setCurrentInvite({ ...updatedItem, id: currentInvite.id })
		setVoteSent(vote)
		setLoading(false)
	}

	return {
		fetchInvite,
		currentInvite,
		percentage,
		loading,
		sendVote,
		voteSent
	}
}

export default useRevelationInvite
