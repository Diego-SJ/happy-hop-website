import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCefJF9vFFj2nAcOdFGtJufz6hvSDVwWlg',
	authDomain: 'test1-d2593.firebaseapp.com',
	projectId: 'test1-d2593',
	storageBucket: 'test1-d2593.appspot.com',
	messagingSenderId: '840308951902',
	appId: '1:840308951902:web:74d525b6341ef14861ddcf'
}

let app: FirebaseApp = {} as FirebaseApp
if (!getApps()?.length) {
	app = initializeApp(firebaseConfig)
}
const db = getFirestore(app)

// get users
export type User = { name?: string; phone?: string; inviteId?: string }
export type RevelationInvite = {
	id?: string
	user?: string
	event_date?: string
	votes?: { boy: number; girl: number }
}

export type ConfirmAsistance = {
	id?: string
	user?: string
	event_date?: string
	guests?: { name?: string; attendance: boolean; guests?: number }[]
}

export async function getUsers({ refetch = false }): Promise<User[]> {
	let usersList = []

	if (JSON.parse(localStorage.getItem('users') || '[]')?.length && !refetch) {
		return JSON.parse(localStorage.getItem('users') || '[]')
	}

	const users = collection(db, 'mexican-party')
	const usersSnapshot = await getDocs(users)
	usersList = usersSnapshot.docs.map((doc) => doc.data())

	localStorage.setItem('users', JSON.stringify(usersList))

	return usersList
}

export async function saveUser(user: User): Promise<boolean> {
	try {
		await addDoc(collection(db, 'mexican-party'), user)
		await getUsers({ refetch: true })
		return true
	} catch (error) {
		console.log({ error })
		return false
	}
}

// XV INVITES

export async function getXVInvites(): Promise<ConfirmAsistance[]> {
	let usersList = []

	const invites = collection(db, 'invites/xv/v1')
	const usersSnapshot = await getDocs(invites)
	usersList = usersSnapshot.docs.map((doc) => {
		return { ...doc.data(), id: doc.id }
	})

	localStorage.setItem('xv', JSON.stringify(usersList))

	return usersList
}

export const sendXVAttendance = async (
	name: string,
	id: string,
	updatedData: Partial<ConfirmAsistance>,
	myData: { name: string; attendance: boolean; guests: number }
): Promise<boolean> => {
	try {
		const inviteRef = doc(db, 'invites/xv/v1', id)
		await updateDoc(inviteRef, updatedData)
		localStorage.setItem(`vote_${name}`, JSON.stringify(myData))
		return true
	} catch (error) {
		console.log({ error })
		return false
	}
}

// REVELETION INVITES

export async function getRevelationInvites(): Promise<RevelationInvite[]> {
	let usersList = []

	const invites = collection(db, 'invites/revelations/v1')
	const usersSnapshot = await getDocs(invites)
	usersList = usersSnapshot.docs.map((doc) => {
		return { ...doc.data(), id: doc.id }
	})

	localStorage.setItem('revelations', JSON.stringify(usersList))

	return usersList
}

export const updateRevelationInviteById = async (
	user_id: string,
	id: string,
	updatedData: Partial<RevelationInvite>,
	vote: 'boy' | 'girl' | null
): Promise<boolean> => {
	try {
		const inviteRef = doc(db, 'invites/revelations/v1', id)
		await updateDoc(inviteRef, updatedData)
		localStorage.setItem(`vote_${user_id}`, vote + '')
		return true
	} catch (error) {
		console.log({ error })
		return false
	}
}

export default {}
