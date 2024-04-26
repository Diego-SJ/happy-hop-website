import { useState } from 'react'
import { SOCIAL_MEDIA } from '../constants/urls'

const NavItem = ({ title = '', href = '#' }) => {
	return (
		<a
			href={href}
			className="font-bold leading-6 text-gray-900 hover:text-indigo-500 transition-all hover:underline hover:underline-offset-8"
		>
			{title}
		</a>
	)
}

const Navbar = () => {
	const [open, setOpen] = useState(false)

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-10 bg-white">
			<nav className="flex items-center justify-between p-0 lg:px-24" aria-label="Global">
				<div className="flex lg:flex-1">
					<a href="/" className="flex items-center gap-4 py-3">
						<img src="/landing/happy-hop-logo.webp" alt="Happy hop" className="h-10" />
					</a>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setOpen((prev) => !prev)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							></path>
						</svg>
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					<NavItem title="Inicio" href="/" />
					<NavItem title="Paquetes" href="/paquetes" />
					<NavItem title="Nosotros" href="/nosotros" />
					<NavItem title="Contacto" href="/contacto" />
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<a
						href={SOCIAL_MEDIA.WHATSAPP}
						target="_blank"
						className="font-bold border-slate-700 border-2 rounded-full py-2 px-8 hover:bg-slate-700 hover:text-white transition-all"
					>
						Contactar
					</a>
				</div>
			</nav>

			<div className={`${open ? '' : 'hidden'} lg:hidden `} role="dialog" aria-modal="true">
				<div className="fixed inset-0 z-50"></div>
				<div
					className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
				>
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<img src="/happy-hop-logo.webp" alt="Happy hop" className="w-auto h-12" />
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setOpen((prev) => !prev)}
						>
							<span className="sr-only">Close menu</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 font-bold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Inicio
								</a>
								<a
									href="/paquetes"
									className="-mx-3 block rounded-lg px-3 py-2 font-bold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Paquetes
								</a>
								<a
									href="/nosotros"
									className="-mx-3 block rounded-lg px-3 py-2 font-bold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Nosotros
								</a>
								<a
									href="/contacto"
									className="-mx-3 block rounded-lg px-3 py-2 font-bold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Contacto
								</a>
							</div>
							<div className="py-6">
								<a
									href={SOCIAL_MEDIA.WHATSAPP}
									target="_blank"
									className=" block text-center font-bold border-slate-700 border-2 rounded-full py-2 px-8 hover:bg-slate-700 hover:text-white transition-all"
								>
									Contactar
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
