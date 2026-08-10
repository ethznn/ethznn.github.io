export type Link = { label: string; href: string; external?: boolean };

export type Capability = {
  title: string;
  summary: string;
  storySlugs: string[];
};

export type Product = {
  name: 'Plico' | 'Sideby';
  status: string;
  summary: string;
  sourceVisibility: 'closed' | 'public';
  links: Link[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  ownership: string;
  sections: ExperienceSection[];
};

export type ExperienceSection = {
  title: string;
  bullets: string[];
  links?: Link[];
};

export const profile = {
  name: '이현호',
  englishName: 'Hyeonho Lee',
  title: 'Backend-focused Software Engineer',
  introduction:
    '제품의 첫 출시부터 운영까지 책임져 온 8년차 백엔드 중심 소프트웨어 엔지니어입니다. 대용량 데이터 성능 개선, 클라우드 운영 기반 구축, 레거시 전환과 장애 재발 방지를 주로 맡아왔습니다.',
  englishIntroduction:
    'Backend-focused Software Engineer solving product and operational problems across data, infrastructure, and application layers.',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prayeo', external: true },
    { label: 'GitHub', href: 'https://github.com/ethznn', external: true },
    { label: 'Email', href: 'mailto:prxyeo@gmail.com' },
  ] satisfies Link[],
  workingWith: [
    'TypeScript',
    'NestJS',
    'PostgreSQL',
    'Redis',
    'AWS',
    'Terraform',
    'Docker',
    'GitHub Actions',
  ],
  howIWork: [
    '사용자 흐름과 제품 목표를 이해하고, API·데이터 모델·운영 방식까지 함께 설계합니다.',
    '기획·프론트엔드·ML·콘텐츠 담당자와 요구사항, 데이터 계약과 예외 조건을 문서로 맞추고 피드백을 반영해 구현합니다.',
    '복잡한 문제는 로그·지표·운영 데이터로 범위를 좁히고 원인을 검증합니다.',
    '설계에서 끝내지 않고 구현·배포·검증까지 책임집니다.',
    '자동화와 문서화로 반복 작업과 다음 사람의 판단 비용을 줄입니다.',
    'AI 에이전트를 문제 정의, 대안 비교, 구현, 테스트와 문서화에 활용합니다.',
  ],
};

export const capabilities: Capability[] = [
  {
    title: 'Data & Performance',
    summary:
      '대규모 데이터와 느린 조회를 실행계획·접근 비용·데이터 구조로 나눠 분석하고, 운영 중단 없이 개선합니다.',
    storySlugs: ['postgresql-query-optimization', 'event-data-sync-pipeline'],
  },
  {
    title: 'Cloud & Platform',
    summary:
      '서비스가 늘어날수록 반복되는 인프라와 배포 비용을 공통 플랫폼·자동화·운영 기준으로 전환합니다.',
    storySlugs: ['ecs-terraform-migration', 'legacy-backend-lifecycle'],
  },
  {
    title: 'Product & Operations',
    summary:
      '기능 구현에서 멈추지 않고 실제 사용자 흐름과 운영 데이터를 확인해 반복 오류와 판단 비용을 줄입니다.',
    storySlugs: ['content-production-platform', 'settlement-incident-closure'],
  },
];

export const products: Product[] = [
  {
    name: 'Plico',
    status: 'App Store 출시 · 개발 및 운영 중',
    summary:
      '친구들과 가능한 날짜를 모아 약속을 확정하고 Apple Calendar 또는 Google Calendar에 저장하는 iPhone 앱. App Store 출시 후 계속 개발·운영하고 있습니다.',
    sourceVisibility: 'closed',
    links: [
      { label: 'Website', href: 'https://plico.kr/', external: true },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/app/id6766375791',
        external: true,
      },
    ],
  },
  {
    name: 'Sideby',
    status: '직접 개발 · 배포 및 유지보수 중',
    summary:
      '여러 디스플레이의 macOS 작업 공간을 하나의 Context로 묶어 함께 전환하는 앱. 직접 개발·배포하고 공개 저장소에서 유지보수하고 있습니다.',
    sourceVisibility: 'public',
    links: [
      { label: 'GitHub', href: 'https://github.com/ethznn/sideby', external: true },
      {
        label: 'Releases',
        href: 'https://github.com/ethznn/sideby/releases',
        external: true,
      },
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: '북아이피스',
    role: 'Software Engineer',
    period: '2023.08–현재',
    summary:
      '교육 콘텐츠 제작 제품의 백엔드를 맡아 제품 기능과 콘텐츠 데이터 운영 흐름, 클라우드 인프라를 구축하고 개선했습니다.',
    ownership:
      '제품·프론트엔드·ML·콘텐츠 담당자와 요구사항과 데이터 계약을 조율하면서, 백엔드 설계·구현·배포와 운영 검증을 주로 직접 수행했습니다.',
    sections: [
      {
        title: '제품 출시와 콘텐츠 운영',
        bullets: [
          'PDF 원본 자료를 문항 데이터로 만들고 편집·저장한 뒤, 편집 결과를 PDF로 생성하는 제품 백엔드를 구축·배포했습니다. 기존 판매 등록 흐름에는 라이선스 확인을 거쳐 연결했습니다.',
          '이후 약 3년간 메인 백엔드 엔지니어로서 시험지·본문 분석·워크북 기능을 확장하고, 배포·운영과 성능 개선을 맡았습니다.',
          '별도로, 제품 초기에 PDF에서 추출된 문항 영역·HTML·메타데이터와 ML 팀의 처리 결과를 작업자가 검수·편집·배포하는 백엔드와 운영 도구를 설계·구현했습니다. 이 흐름은 지금도 제품 데이터를 관리하는 데 사용되고 있습니다.',
        ],
        links: [
          {
            label: '첫 출시부터 약 3년간 책임진 콘텐츠 제작 제품 백엔드',
            href: '/stories/content-production-platform/',
          },
        ],
      },
      {
        title: '대용량 데이터 성능과 동기화',
        bullets: [
          '대용량 JSONB 중심 테이블에서 검색 값을 정규 컬럼으로 분리하고 covering index를 적용해 주요 조회를 16.2초에서 79ms, 4.9초에서 23ms로 줄였습니다.',
          '대규모 검색 값도 concurrent index와 재실행 가능한 분할 backfill로 운영 중인 데이터베이스에 적용했습니다. 피크 시간대에 2분 이상 걸리던 정기 캐시 생성은 배포 후 4~5초 수준으로 안정화됐습니다.',
          '대량 업데이트 때 Lock과 운영 부담을 만들던 Trigger 기반 동기화는 팀 논의를 거쳐 CDC 방식으로 전환했습니다. DMS·Kinesis·Lambda와 대량 backfill 경로를 구축하고 실패 알림과 재처리 수단을 보완했습니다.',
        ],
        links: [
          {
            label: '대용량 PostgreSQL 조회 성능 최적화',
            href: '/stories/postgresql-query-optimization/',
          },
          {
            label: 'Trigger 기반 동기화의 CDC 이벤트 파이프라인 전환',
            href: '/stories/event-data-sync-pipeline/',
          },
        ],
      },
      {
        title: '공통 ECS 플랫폼과 레거시 통합',
        bullets: [
          '서비스별로 중복되던 staging·production Elastic Beanstalk 인프라를 정리하기 위해, staging용과 production용 ECS/EC2 클러스터를 각각 구축했습니다. 환경 간 격리는 유지하면서 클러스터별로 여러 서비스를 함께 운영하도록 Terraform으로 공통 기반을 만들었습니다.',
          '대표 서비스와 Worker를 직접 이전하고, 다른 팀원이 가이드에 따라 서비스를 추가·이전할 수 있도록 운영 방식을 정리했습니다.',
          '기존 EC2에서 직접 운영되던 Express 레거시 API는 운영 로그를 분석해 실제 사용되는 범위로 이전 대상을 좁혔습니다. 이를 NestJS·TypeORM 기반 ECS 서비스로 중단 없이 전환한 뒤 마켓플레이스 백엔드에 통합하고, 별도 ECS 서비스를 제거했습니다.',
        ],
        links: [
          {
            label: '분산된 배포 환경을 공통 플랫폼으로 전환',
            href: '/stories/ecs-terraform-migration/',
          },
          {
            label: '운영 로그로 선별한 레거시 API의 ECS 이전·통합',
            href: '/stories/legacy-backend-lifecycle/',
          },
        ],
      },
      {
        title: '운영 장애 재발 방지',
        bullets: [
          '월 정산 장애의 전체 롤백과 대상 0건 무음 실패를 분석하고 관계자와 복구·개선 순서를 조율했습니다. 오염된 데이터를 복구한 뒤 부분 저장, 알림, 실행 가드와 안전한 재처리 기능을 제안·구현해 production에 적용했고, 다음 월 운영 주기의 저장·후속 배치·조회 반영까지 확인했습니다.',
        ],
        links: [
          {
            label: '무음 실패한 월정산을 다음 운영 주기까지 닫은 장애 대응',
            href: '/stories/settlement-incident-closure/',
          },
        ],
      },
      {
        title: '외부지문 유사도 검색',
        bullets: [
          '영어 외부지문 유사도 검색을 새로 구축하면서 ML 팀이 문항 메타데이터와 해당 지문을 연결하는 데 사용하던 Doc2Vec을 포함한 여러 후보 모델을 비교했습니다. 동료와 품질을 검토해 e5-small-v2를 선택하고 pgvector·HNSW·Python Lambda 기반 구조를 구현해, 기존 데이터 전체를 재학습하지 않고 신규 지문을 한 건씩 검색 대상에 반영할 수 있게 했습니다.',
        ],
      },
    ],
  },
  {
    company: 'Spacewalk',
    role: 'Software Engineer',
    period: '2018.01–2023.02',
    summary:
      '조건에 맞는 토지를 찾고 사업성을 예측하는 프롭테크 서비스에서 백엔드 개발과 운영 안정화, 레거시 전환, 배포·인프라 개선을 담당했습니다.',
    ownership:
      '백엔드 개발과 배포, 레거시 전환, 운영 장애 분석과 비동기 처리 기반을 담당했으며 기억이 불확실한 결제·환불 업무와 확인되지 않은 수치는 제외했습니다.',
    sections: [
      {
        title: '배포 기반과 레거시 전환',
        bullets: [
          'EC2에 직접 배포하던 환경에 Docker 기반 컨테이너와 Elastic Beanstalk 관리형 배포를 도입했습니다. 이후 GitHub Actions 기반 CI/CD로 자동화하고 이 배포 방식을 다른 팀에도 공유했습니다.',
          'Ruby on Rails API를 Kotlin·Spring Boot 서비스로 단계적으로 전환했습니다. Kotlin·Spring Boot 경력이 있던 신규 입사자 2명이 기존 서비스를 이해할 수 있도록 Rails API 문서와 변경 이력, 도메인 맥락을 정리해 공유했습니다.',
          'JMeter·nGrinder로 전환 전후를 비교하고, Kubernetes 환경에 HPA·PDB를 적용해 배포와 운영의 안정성을 높였습니다.',
        ],
      },
      {
        title: '운영 안정화',
        bullets: [
          'New Relic으로 서비스 간 호출 흐름을 분석했습니다. SQS·Lambda 처리 중 실패·타임아웃 이후의 재시도가 같은 사용자에게 중복 알림으로 이어지는 문제를 확인하고 관련 설정을 조정해 중복 전달을 해결했습니다.',
          '특정 Pod에서 반복되던 메모리 누수를 추적해 Elasticsearch 클라이언트 종료 처리 문제를 수정했습니다. 대규모 업데이트 전에는 부하 테스트로 용량을 확인하고 Pod 수를 조정한 뒤 배포와 모니터링을 진행했습니다.',
        ],
      },
      {
        title: '비동기 처리와 운영 기준',
        bullets: [
          '시간이 오래 걸리는 건축 설계 요청은 Azure Queue와 데이터베이스 상태 조회를 이용한 비동기 흐름으로 분리하고, 진행 상태와 실패를 알림으로 전달했습니다.',
          '제품팀·데이터팀·건축설계팀마다 달랐던 데이터 해석을 제품용·개발용 데이터베이스 운영 기준으로 정리했습니다. 공공기관 내부망에 설치되는 서비스의 통신 구조와 설치 이미지를 구성하고 현장 설치와 로깅·외부 통신 설정을 진행했습니다.',
        ],
      },
    ],
  },
];
