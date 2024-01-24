import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const serviceID = 'default_service'
const templateID = 'template_e4hduxw'
const publicKey = 'user_VWDQ4L4IXK2FhHzyVKYUn'

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const initialFormState = {
	name: '',
	email: '',
	phone: '',
	message: ''
}

const inputErrors: { [key: string]: string | null } = {
	name: null,
	email: null,
	phone: null,
	message: null
}

const ContactForm = () => {
	const [form, setForm] = useState(initialFormState)
	const [errors, setErrors] = useState(inputErrors)
	const [btnState, setBtnState] = useState({ text: 'Enviar', color: 'sky-500' })
	const [loading, setLoading] = useState(false)

	const onChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [target.name]: target.value }))
		if (target.name === 'name') {
			setErrors((prev) => ({
				...prev,
				name: target.value?.length < 2 ? 'Completa este campo' : ''
			}))
		}
		if (target.name === 'email') {
			setErrors((prev) => ({
				...prev,
				email: !target.value?.match(emailRegex) ? 'Agrega un correo válido' : ''
			}))
		}
		if (target.name === 'phone') {
			setErrors((prev) => ({
				...prev,
				phone: target.value?.length < 10 ? 'Agrega al menos 10 caracteres' : ''
			}))
		}
		if (target.name === 'message') {
			setErrors((prev) => ({
				...prev,
				message: !target.value?.length ? 'Completa este campo' : ''
			}))
		}
	}

	const onFinish = (result: 'success' | 'error') => {
		setForm(initialFormState)
		setBtnState({
			color: result === 'success' ? 'green-500' : 'red-500',
			text: result === 'success' ? 'Mensaje enviado' : '¡Ups! Mensaje no enviado'
		})

		setTimeout(() => {
			setBtnState({
				color: 'sky-500',
				text: 'Enviar'
			})
		}, 5000)
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (Object.values(errors).every((i) => i === '')) {
			setLoading(true)
			await emailjs.sendForm(serviceID, templateID, e.currentTarget, publicKey).then(
				() => {
					onFinish('success')
				},
				() => {
					onFinish('error')
				}
			)
			setLoading(false)
		}
	}

	return (
		<form onSubmit={onSubmit} className="flex flex-col">
			<div className="flex flex-col gap-2 mb-6">
				<label className="text-xl font-semibold" htmlFor="name">
					Nombre
				</label>
				<input
					className="outline-none border-[3px] bg-transparent border-gray-300 py-2 px-4 dark:bg-transparent focus:border-sky-500 rounded-full focus:ring-0"
					id="name"
					name="name"
					type="text"
					value={form.name}
					onChange={onChange}
				/>
				<p className="text-red-500 px-4 text-xl">{errors.name}</p>
			</div>
			<div className="flex flex-col gap-2 mb-6">
				<label className="text-xl font-semibold" htmlFor="email">
					Email
				</label>
				<input
					className="outline-none border-[3px] bg-transparent border-gray-300 py-2 px-4 dark:bg-transparent focus:border-sky-500 rounded-full focus:ring-0"
					id="email"
					name="email"
					type="text"
					value={form.email}
					onChange={onChange}
				/>
				<p className="text-red-500 px-4 text-xl">{errors.email}</p>
			</div>
			<div className="flex flex-col gap-2 mb-6">
				<label className="text-xl font-semibold" htmlFor="phone">
					Teléfono
				</label>
				<input
					className="outline-none border-[3px] bg-transparent border-gray-300 py-2 px-4 dark:bg-transparent focus:border-sky-500 rounded-full focus:ring-0"
					id="phone"
					name="phone"
					type="text"
					value={form.phone}
					onChange={onChange}
				/>
				<p className="text-red-500 px-4 text-xl">{errors.phone}</p>
			</div>
			<div className="flex flex-col gap-2 mb-6">
				<label className="text-xl font-semibold" htmlFor="message">
					Mensaje
				</label>
				<textarea
					rows={2}
					className="resize-none outline-none border-[3px] bg-transparent border-gray-300 py-2 px-4 dark:bg-transparent focus:border-sky-500 rounded-[25px] focus:ring-0"
					id="message"
					name="message"
					value={form.message}
					onChange={onChange}
				/>
				<p className="text-red-500 px-4 text-xl">{errors.message}</p>
			</div>
			<button
				className={`relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-${btnState.color} rounded-full hover:bg-white group  shadow-lg cursor-pointer`}
				type="submit"
				disabled={loading}
			>
				<span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
				<span
					className={`relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-${btnState.color}`}
				>
					{loading ? 'Enviando...' : btnState.text}
				</span>
			</button>
		</form>
	)
}

export default ContactForm
