import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home exposes the primary reader path', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Backend-focused Software Engineer' }),
  ).toBeVisible();
  await expect(
    page.getByText(/8년차 백엔드 중심 소프트웨어 엔지니어입니다/),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Engineering Stories 보기' })).toHaveAttribute(
    'href',
    '/stories/',
  );
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '본문으로 건너뛰기' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('home has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('home keeps the approved concise hierarchy', async ({ page }) => {
  await page.goto('/');
  for (const heading of [
    'What I Solve',
    'Selected Engineering Stories',
    '직접 만들고 있는 제품',
    'Experience',
    'How I Work',
    'Working With',
  ]) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  await expect(page.getByText('Plico', { exact: true })).toBeVisible();
  await expect(page.getByText('Sideby', { exact: true })).toBeVisible();
  await expect(page.getByText(/Orca/)).toHaveCount(0);
  const featuredStories = page.locator('section[aria-labelledby="stories-title"]');
  await expect(
    featuredStories
      .getByRole('link', { name: /첫 출시부터 약 3년간 책임진 콘텐츠 제작 제품 백엔드/ })
      .first(),
  ).toBeVisible();
  await expect(featuredStories.getByText('출시 → 시험지·워크북까지 제품 확장')).toBeVisible();
  await expect(featuredStories.getByText('16.2s → 79ms')).toBeVisible();
  await expect(featuredStories.getByText('중복되던 EB 환경 → staging·production ECS 클러스터 2개')).toBeVisible();
  await expect(
    featuredStories.getByRole('link', { name: /JSONB 데이터의 무중단 모델 전환/ }),
  ).toHaveCount(0);
});

const problemSolvingHeadings = [
  '왜 바꿔야 했는가',
  '무엇을 확인했는가',
  '어떤 선택을 했는가',
  '어떻게 전환하고 검증했는가',
  '이후 무엇이 달라졌는가',
  '다시 한다면',
];

const storyCases = [
  {
    route: '/stories/content-production-platform/',
    headings: [
      '제품의 시작과 맡은 역할',
      '출시 단계에서 만든 핵심 흐름',
      '제품이 확장되며 달라진 백엔드',
      '약 3년간 이어진 운영과 개선',
      '여러 직군과 맞춘 출시 기준',
      '제품에 남은 변화와 배운 점',
    ],
  },
  ...[
    '/stories/postgresql-query-optimization/',
    '/stories/ecs-terraform-migration/',
    '/stories/legacy-backend-lifecycle/',
    '/stories/event-data-sync-pipeline/',
    '/stories/settlement-incident-closure/',
  ].map((route) => ({ route, headings: problemSolvingHeadings })),
];

for (const { route, headings } of storyCases) {
  test(`${route} is reader-facing and complete`, async ({ page }) => {
    await page.goto(route);
    for (const heading of headings) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
    if (route === '/stories/content-production-platform/') {
      await expect(page.getByRole('heading', { name: '왜 바꿔야 했는가' })).toHaveCount(0);
    }
    await expect(page.getByRole('heading', { name: /^(문제|분석|실행|성과)$/ })).toHaveCount(0);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('story index presents all reviewed stories', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/stories/');
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering Stories' })).toBeVisible();
  await expect(page.locator('article')).toHaveCount(6);
  await expect(page.locator('article a[href^="/stories/"]')).toHaveCount(12);
  await expect(page.getByText('월정산 장애 → 다음 월정산 정상 마감')).toBeVisible();
  await expect(
    page.getByRole('link', { name: /운영 로그로 선별한 레거시 API의 ECS 이전·통합/ }).first(),
  ).toBeVisible();
  const columns = await page.locator('section[aria-label="Engineering Story 목록"]').evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns.split(' ').length,
  );
  expect(columns).toBe(2);
});

test('experience presents the full company scope in scannable sections', async ({ page }) => {
  await page.goto('/experience/');
  await expect(page.getByRole('heading', { level: 1, name: 'Experience' })).toBeVisible();
  await expect(page.getByText('북아이피스')).toBeVisible();
  await expect(page.getByText('Spacewalk')).toBeVisible();
  for (const heading of [
    '제품 출시와 콘텐츠 운영',
    '대용량 데이터 성능과 동기화',
    '공통 ECS 플랫폼과 레거시 통합',
    '운영 장애 재발 방지',
    '외부지문 유사도 검색',
    '배포 기반과 레거시 전환',
    '운영 안정화',
    '비동기 처리와 운영 기준',
  ]) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  await expect(
    page.getByRole('link', { name: /대용량 PostgreSQL 조회 성능 최적화/ }),
  ).toHaveAttribute('href', '/stories/postgresql-query-optimization/');
  await expect(
    page.getByRole('link', { name: /운영 로그로 선별한 레거시 API의 ECS 이전·통합/ }),
  ).toHaveAttribute('href', '/stories/legacy-backend-lifecycle/');
  await expect(
    page.getByRole('link', { name: /무음 실패한 월정산을 다음 운영 주기까지 닫은 장애 대응/ }),
  ).toHaveAttribute('href', '/stories/settlement-incident-closure/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://ethznn.github.io/experience/',
  );
});

test('key mobile pages have no page-level horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ['/', '/stories/', '/experience/', '/stories/content-production-platform/']) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `${route} should fit a 320px viewport`).toBe(false);
  }
});

test('verified public contact links are easy to reach', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /LinkedIn/ }).first()).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/prayeo',
  );
  await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:prxyeo@gmail.com',
  );
});

test('page titles keep a restrained readable scale', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const homeSize = Number.parseFloat(
    await page.getByRole('heading', { level: 1 }).evaluate((element) => getComputedStyle(element).fontSize),
  );
  expect(homeSize).toBeLessThanOrEqual(76);

  await page.goto('/stories/postgresql-query-optimization/');
  const storySize = Number.parseFloat(
    await page.getByRole('heading', { level: 1 }).evaluate((element) => getComputedStyle(element).fontSize),
  );
  expect(storySize).toBeLessThanOrEqual(63);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  const mobileSize = Number.parseFloat(
    await page.getByRole('heading', { level: 1 }).evaluate((element) => getComputedStyle(element).fontSize),
  );
  expect(mobileSize).toBeLessThanOrEqual(40);
});
