import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Captions from '../Captions'

jest.mock('axios')
jest.mock('@/firebaseUtils/storage')
jest.mock('file-saver')

describe('Captions Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		render(<Captions />)
	})

	it('renders the page heading', () => {
		expect(screen.getByRole('heading', { level: 1, name: 'Caption Generator' })).toBeInTheDocument()
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
