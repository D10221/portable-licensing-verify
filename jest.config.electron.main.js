module.exports = {
    ...require("./jest.config"),
    runner: '@jest-runner/electron/main',
    testEnvironment: 'node'
}