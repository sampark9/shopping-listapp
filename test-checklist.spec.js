const { test, expect } = require('@playwright/test');

test.describe('체크리스트 앱 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬 파일을 직접 열기
    const filePath = require('path').resolve('checklist-app.html');
    await page.goto('file:///' + filePath);
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.container', { timeout: 5000 });
  });

  test('아이템 추가 기능 테스트', async ({ page }) => {
    // 입력 필드가 있는지 확인
    await expect(page.locator('#newItemInput')).toBeVisible();
    
    // 테스트 아이템 추가
    await page.fill('#newItemInput', '테스트 쇼핑 아이템');
    await page.click('.btn-primary');
    
    // 입력 필드가 비워졌는지 확인
    await expect(page.locator('#newItemInput')).toHaveValue('');
    
    // 아이템이 리스트에 추가되었는지 확인
    await expect(page.locator('.checklist-item')).toContainText('테스트 쇼핑 아이템');
    
    // 통계가 업데이트되었는지 확인
    await expect(page.locator('#totalCount')).toContainText('1');
    await expect(page.locator('#pendingCount')).toContainText('1');
    
    console.log('✅ 아이템 추가 기능 테스트 성공');
  });

  test('아이템 체크박스 토글 기능 테스트', async ({ page }) => {
    // 먼저 테스트 아이템 추가
    await page.fill('#newItemInput', '체크 테스트 아이템');
    await page.click('.btn-primary');
    
    // 체크박스 클릭으로 아이템 체크
    await page.click('.checkbox');
    
    // 체크된 상태인지 확인
    await expect(page.locator('.checkbox')).toHaveClass(/checked/);
    await expect(page.locator('.item-text')).toHaveClass(/checked/);
    
    // 통계가 업데이트되었는지 확인
    await expect(page.locator('#completedCount')).toContainText('1');
    await expect(page.locator('#pendingCount')).toContainText('0');
    await expect(page.locator('#completionRate')).toContainText('100%');
    
    // 다시 체크박스 클릭으로 언체크
    await page.click('.checkbox');
    
    // 언체크된 상태인지 확인
    await expect(page.locator('.checkbox')).not.toHaveClass(/checked/);
    await expect(page.locator('.item-text')).not.toHaveClass(/checked/);
    
    console.log('✅ 아이템 체크박스 토글 기능 테스트 성공');
  });

  test('아이템 삭제 기능 테스트', async ({ page }) => {
    // 먼저 테스트 아이템 추가
    await page.fill('#newItemInput', '삭제 테스트 아이템');
    await page.click('.btn-primary');
    
    // 아이템이 추가되었는지 확인
    await expect(page.locator('.checklist-item')).toContainText('삭제 테스트 아이템');
    
    // 삭제 버튼 클릭
    await page.click('.delete-btn');
    
    // 애니메이션 대기
    await page.waitForTimeout(500);
    
    // 아이템이 삭제되었는지 확인
    await expect(page.locator('.checklist-item')).toHaveCount(0);
    
    // 통계가 업데이트되었는지 확인
    await expect(page.locator('#totalCount')).toContainText('0');
    await expect(page.locator('#completedCount')).toContainText('0');
    await expect(page.locator('#pendingCount')).toContainText('0');
    
    console.log('✅ 아이템 삭제 기능 테스트 성공');
  });

  test('여러 아이템 추가 및 관리 기능 테스트', async ({ page }) => {
    // 여러 아이템 추가
    const items = ['사과', '바나나', '오렌지', '포도'];
    
    for (const item of items) {
      await page.fill('#newItemInput', item);
      await page.click('.btn-primary');
      await page.waitForTimeout(100); // 애니메이션 대기
    }
    
    // 모든 아이템이 추가되었는지 확인
    await expect(page.locator('#totalCount')).toContainText('4');
    
    // 두 번째 아이템 체크
    await page.locator('.checklist-item').nth(1).locator('.checkbox').click();
    await expect(page.locator('#completedCount')).toContainText('1');
    await expect(page.locator('#pendingCount')).toContainText('3');
    
    // 세 번째 아이템 삭제
    await page.locator('.checklist-item').nth(2).locator('.delete-btn').click();
    await page.waitForTimeout(300); // 애니메이션 대기
    await expect(page.locator('#totalCount')).toContainText('3');
    
    // 모두 토글 버튼 테스트
    await page.click('button:has-text("모두 토글")');
    await expect(page.locator('#completedCount')).toContainText('3');
    await expect(page.locator('#pendingCount')).toContainText('0');
    
    console.log('✅ 여러 아이템 추가 및 관리 기능 테스트 성공');
  });

  test('검색 기능 테스트', async ({ page }) => {
    // 여러 아이템 추가
    await page.fill('#newItemInput', '사과');
    await page.click('.btn-primary');
    await page.fill('#newItemInput', '바나나');
    await page.click('.btn-primary');
    await page.fill('#newItemInput', '오렌지');
    await page.click('.btn-primary');
    
    // 검색 기능 테스트
    await page.fill('#searchInput', '사과');
    await page.waitForTimeout(500); // 검색 처리 대기
    
    // 수동으로 검색 함수 호출
    await page.evaluate(() => {
      searchItems();
    });
    
    // 검색 결과 확인
    await expect(page.locator('.checklist-item')).toHaveCount(1);
    await expect(page.locator('.checklist-item')).toContainText('사과');
    
    // 검색 초기화
    await page.fill('#searchInput', '');
    await expect(page.locator('.checklist-item')).toHaveCount(3);
    
    console.log('✅ 검색 기능 테스트 성공');
  });

  test('테마 전환 기능 테스트', async ({ page }) => {
    // 테마 전환 버튼 클릭
    await page.click('.theme-toggle');
    
    // 다크 모드로 전환되었는지 확인
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('#themeIcon')).toContainText('🌞');
    
    // 다시 라이트 모드로 전환
    await page.click('.theme-toggle');
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('#themeIcon')).toContainText('🌙');
    
    console.log('✅ 테마 전환 기능 테스트 성공');
  });

  test('빈 입력 유효성 검증 테스트', async ({ page }) => {
    // 빈 텍스트로 아이템 추가 시도
    await page.fill('#newItemInput', '');
    await page.click('.btn-primary');
    
    // 아이템이 추가되지 않았는지 확인
    await expect(page.locator('#totalCount')).toContainText('0');
    
    // 공백만 있는 텍스트로 아이템 추가 시도
    await page.fill('#newItemInput', '   ');
    await page.click('.btn-primary');
    
    // 아이템이 추가되지 않았는지 확인
    await expect(page.locator('#totalCount')).toContainText('0');
    
    console.log('✅ 빈 입력 유효성 검증 테스트 성공');
  });

  test('키보드 단축키 기능 테스트', async ({ page }) => {
    // 엔터키로 아이템 추가
    await page.fill('#newItemInput', '엔터 테스트');
    await page.keyboard.press('Enter');
    await expect(page.locator('.checklist-item')).toContainText('엔터 테스트');
    
    // ESC 키로 검색 초기화
    await page.fill('#searchInput', '검색');
    await page.keyboard.press('Escape');
    await expect(page.locator('#searchInput')).toHaveValue('');
    
    console.log('✅ 키보드 단축키 기능 테스트 성공');
  });

  test('전체 삭제 기능 테스트', async ({ page }) => {
    // 여러 아이템 추가
    await page.fill('#newItemInput', '아이템1');
    await page.click('.btn-primary');
    await page.fill('#newItemInput', '아이템2');
    await page.click('.btn-primary');
    
    // 확인 다이얼로그 처리 설정
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    // 전체 삭제 버튼 클릭
    await page.click('button:has-text("전체 삭제")');
    
    // 애니메이션 대기
    await page.waitForTimeout(500);
    
    // 모든 아이템이 삭제되었는지 확인
    await expect(page.locator('.checklist-item')).toHaveCount(0);
    await expect(page.locator('#totalCount')).toContainText('0');
    
    console.log('✅ 전체 삭제 기능 테스트 성공');
  });
});