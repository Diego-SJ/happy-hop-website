import AOS from 'aos'

export const aosInit = () => {
	AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 })
}
