/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\.tsx?$": ["ts-jest", { useESM: true }],
    ".+\\.(css|scss|sass)$": "jest-css-modules-transform",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};