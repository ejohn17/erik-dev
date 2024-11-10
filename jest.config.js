const nextJest = require('next/jest')

const createJestConfig = nextJest({
	// Path to your Next.js app
	dir: './',
})

const customJestConfig = {
	testMatch: ['**/__tests__/**/*.+(ts|tsx)', '**/?(*.)+(spec|test).+(ts|tsx)'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'^@/pages/(.*)$': '<rootDir>/pages/$1',
	},
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': ['babel-jest'],
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/pages/test.tsx'],
	modulePaths: ['<rootDir>'],
	testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)
