const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './', // 현재 폴더에서 테스트 파일을 찾습니다
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000', // 여기에 sam님의 앱 주소를 적으세요 (기본 3000)
    headless: false, // 브라우저가 뜨는 것을 보기 위해 false로 설정
    screenshot: 'on',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});