// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@satoshi/rc-ui$': '<rootDir>/node_modules/@satoshi/rc-ui',
    '^@satoshi/rc-ui/(.*)$': '<rootDir>/node_modules/@satoshi/rc-ui/$1',
    // La libreria enlazada trae su propia copia de react; se deduplica como en vite.config.ts
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '^react-dom/(.*)$': '<rootDir>/node_modules/react-dom/$1',
    '^@/test/(.*)$': '<rootDir>/src/test/$1',
    '^@portafolio$': '<rootDir>/src/app/presentation/portafolio/index.ts',
    '^@presentation/(.*)$': '<rootDir>/src/app/presentation/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@i18n/(.*)$': '<rootDir>/src/assets/i18n/$1',
    '^@domain/(.*)$': '<rootDir>/src/app/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/app/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/app/infrastructure/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/presentation/shared/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
};
