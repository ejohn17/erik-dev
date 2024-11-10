import '@testing-library/jest-dom'
// Mock screenfull
jest.mock('screenfull', () => ({
	__esModule: true,
	default: {
		isEnabled: true,
		request: jest.fn(),
		exit: jest.fn(),
		toggle: jest.fn(),
		on: jest.fn(),
		off: jest.fn(),
		isFullscreen: false,
	},
}))
