import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^next/image$': '<rootDir>/src/__mocks__/next/image.js',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json'
        },
    },
};

export default config;