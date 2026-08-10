import { describe, expect, it } from 'vitest';
import { capabilities, experiences, products, profile } from '../src/data/profile';

describe('public profile data', () => {
  it('keeps the three approved problem-solving areas', () => {
    expect(capabilities.map((item) => item.title)).toEqual([
      'Data & Performance',
      'Cloud & Platform',
      'Product & Operations',
    ]);
    expect(capabilities.flatMap(({ storySlugs }) => storySlugs)).toEqual([
      'postgresql-query-optimization',
      'event-data-sync-pipeline',
      'ecs-terraform-migration',
      'legacy-backend-lifecycle',
      'content-production-platform',
      'settlement-incident-closure',
    ]);
  });

  it('keeps experience level as supporting copy rather than the primary title', () => {
    expect(profile.title).toBe('Backend-focused Software Engineer');
    expect(profile.introduction).toContain('8년차 백엔드 중심 소프트웨어 엔지니어');
  });

  it('describes products without open-source impact claims', () => {
    expect(products.map((item) => item.name)).toEqual(['Plico', 'Sideby']);
    expect(JSON.stringify(products)).not.toMatch(/community|contributors|stars|Orca/i);
  });

  it('separates the two ECS clusters without disclosing an infrastructure count', () => {
    const publicCopy = JSON.stringify({ profile, experiences });

    expect(publicCopy).toContain('staging용과 production용 ECS/EC2 클러스터를 각각 구축');
    expect(publicCopy).not.toContain('공통 ECS/EC2 클러스터');
  });

  it('keeps volume figures out of public copy but keeps performance figures', () => {
    const publicCopy = JSON.stringify({ profile, experiences });

    const volumeFigures = [
      '2,175만',
      '193만',
      '18개 이상',
      '십수만',
      '95만',
      '52개',
      '27개',
      '수십만',
      '3만 건',
      '21,757,608',
    ];
    for (const figure of volumeFigures) {
      expect(publicCopy, `volume figure leaked: ${figure}`).not.toContain(figure);
    }

    expect(publicCopy).toContain('16.2초에서 79ms');
  });

  it('uses the verified public contact destinations', () => {
    expect(profile.links).toEqual([
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prayeo', external: true },
      { label: 'GitHub', href: 'https://github.com/ethznn', external: true },
      { label: 'Email', href: 'mailto:prxyeo@gmail.com' },
    ]);
  });

  it('groups company experience the way the canonical resume does', () => {
    const bookipiece = experiences.find(({ company }) => company === '북아이피스');
    const spacewalk = experiences.find(({ company }) => company === 'Spacewalk');

    expect(bookipiece?.sections.map(({ title }) => title)).toEqual([
      '제품 출시와 콘텐츠 운영',
      '대용량 데이터 성능과 동기화',
      '공통 ECS 플랫폼과 레거시 통합',
      '운영 장애 재발 방지',
      '외부지문 유사도 검색',
    ]);
    expect(spacewalk?.sections.map(({ title }) => title)).toEqual([
      '배포 기반과 레거시 전환',
      '운영 안정화',
      '비동기 처리와 운영 기준',
    ]);
    expect(bookipiece?.sections.flatMap(({ bullets }) => bullets).length).toBeGreaterThan(8);
    expect(JSON.stringify(experiences)).not.toMatch(/CAR-\d{4}|01_raw|02_career_wiki/);
  });

  it('drops claims the canonical resume does not make', () => {
    const publicCopy = JSON.stringify(experiences);

    expect(publicCopy).not.toContain('비용을 절반');
    expect(publicCopy).not.toContain('WebClient');
    expect(publicCopy).not.toContain('Swagger');
    expect(publicCopy).not.toContain('AdminJS');
    expect(publicCopy).not.toContain('Tomcat');
  });
});
