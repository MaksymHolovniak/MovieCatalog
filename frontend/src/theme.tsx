import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
	fonts: {
		heading: 'Poppins, sans-serif',
		body: 'Poppins, sans-serif',
	},
	styles: {
		global: {
			body: {
				bg: "#000",
				color: "#FFF"
			},
		}
	}
})