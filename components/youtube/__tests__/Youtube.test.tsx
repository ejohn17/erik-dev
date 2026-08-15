import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Youtube from '../Youtube'

jest.mock('axios')
jest.mock('@/firebaseUtils/storage')
jest.mock('file-saver')

describe('Youtube Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		render(<Youtube />)
	})

	it('renders the page heading', () => {
		expect(screen.getByRole('heading', { level: 1, name: 'Youtube to Mp3' })).toBeInTheDocument()
	})

	it('starts with the upload form', () => {
		expect(screen.getByRole('textbox', { name: /youtube url/i })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Upload' })).toBeDisabled()
	})

	it('explains how the tool works', () => {
		expect(screen.getByRole('heading', { name: 'How it works' })).toBeInTheDocument()
		expect(screen.getByText(/This is a simple tool/)).toBeInTheDocument()
	})
})
