'use client';

import { useState, useEffect, useRef } from 'react';

// CSS 변수 주입
const cssVariables = `
  :root {
    --color-text: #F5F5F5;
    --color-accent: #FF3347;
    --color-border: #2E2E2E;
    --color-primary: #E8001D;
    --color-surface: #1A1A1A;
    --color-secondary: #111111;
    --color-background: #0A0A0A;
    --border-radius: 4px;
    --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.6);
    --shadow-hover: 0 16px 48px rgba(232, 0, 29, 0.25);
    --shadow-button: 0 4px 16px rgba(232, 0, 29, 0.35);
    --spacing-element-gap: 24px;
    --spacing-section-padding: 120px 0;
    --container-max-width: 1280px;
    --font-heading: Pretendard, 'Noto Sans KR', sans-serif;
    --font-body: Pretendard, 'Noto Sans KR', sans-serif;
    --text-h1: clamp(40px, 6vw, 80px);
    --text-h2: clamp(28px, 4vw, 52px);
    --text-h3: clamp(20px, 2.5vw, 32px);
    --text-base: 16px;
    --animation-easing: cubic-bezier(0.16, 1, 0.3, 1);
    --animation-duration: 0.6s;
  }
`;

// 훅: 뷰포트 진입 감지
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// 공통 타입
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity var(--animation-duration) var(--animation-easing) ${delay}s, transform var(--animation-duration) var(--animation-easing) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── 섹션 1: Hero ─────────────────────────────────────────────
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      aria-label="메인 히어로"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--color-background)',
      }}
    >
      {/* 배경 이미지 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://source.unsplash.com/1600x900/?technology,digital,futuristic"
          alt="카카오 AI 기술 배경"
          style={{ width: '100%', height: '110%', objectFit: 'cover', opacity: 0.25 }}
        />
        {/* 그라디언트 오버레이 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--color-background) 0%, transparent 50%, var(--color-background) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--color-background) 0%, transparent 60%)',
        }} />
      </div>

      {/* 레드 악센트 라인 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
        background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
        width: '100%',
      }}>
        {/* 상단 레이블 */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '12px',
          marginBottom: '32px',
          opacity: 1,
          animation: 'fadeInDown 0.8s var(--animation-easing) 0.2s both',
        }}>
          <span style={{
            width: '40px', height: '2px',
            backgroundColor: 'var(--color-primary)',
          }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            letterSpacing: '0.15em',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Kakao Corporation
          </span>
        </div>

        {/* 메인 헤딩 */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h1)',
          fontWeight: 800,
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '24px',
          animation: 'fadeInUp 0.9s var(--animation-easing) 0.3s both',
        }}>
          기술을 넘어<br />
          <span style={{ color: 'var(--color-primary)' }}>신뢰</span>로,<br />
          연결을 넘어<br />
          <span style={{
            WebkitTextStroke: '1px var(--color-text)',
            color: 'transparent',
          }}>가치</span>로.
        </h1>

        {/* 설명 */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2vw, 22px)',
          color: 'rgba(245, 245, 245, 0.65)',
          lineHeight: 1.7,
          maxWidth: '540px',
          marginBottom: '48px',
          animation: 'fadeInUp 0.9s var(--animation-easing) 0.45s both',
        }}>
          카카오의 AI 기술이 일상을 더욱 편리하게 바꿉니다.
        </p>

        {/* CTA */}
        <div style={{ animation: 'fadeInUp 0.9s var(--animation-easing) 0.6s both' }}>
          <a
            href="#services"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: '16px 36px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-button)',
              transition: 'all 0.3s var(--animation-easing)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-hover)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-button)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            서비스 바로가기
            <span style={{ fontSize: '18px' }}>→</span>
          </a>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(245,245,245,0.4)', letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}

// ─── 섹션 2: Feature Grid (카카오 소개) ──────────────────────
interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  href: string;
}

function FeatureGridSection() {
  const items: FeatureItem[] = [
    { title: 'Service', description: '더 나은 세상을 만드는 카카오 서비스', icon: '◆', href: '#service' },
    { title: 'AI / TECH', description: '카카오 AI 및 기술 플랫폼', icon: '◉', href: '#ai-tech' },
    { title: 'People', description: '함께 나아갈 미래의 크루들에게 (채용)', icon: '◈', href: '#people' },
    { title: 'ESG', description: '지속가능한 미래를 위한 카카오의 약속과 책임', icon: '◇', href: '#esg' },
  ];

  return (
    <section
      aria-label="카카오 소개"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        {/* 섹션 헤더 */}
        <AnimatedSection>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>About Kakao</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(245, 245, 245, 0.6)',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}>
              카카오가 만들어가는 세상을 다양한 관점에서 소개합니다.
            </p>
          </div>
        </AnimatedSection>

        {/* 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--spacing-element-gap)',
        }}>
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <a
                href={item.href}
                style={{
                  display: 'block',
                  padding: '40px 32px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.4s var(--animation-easing)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'var(--shadow-hover)';
                  el.style.borderColor = 'var(--color-primary)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'var(--shadow-card)';
                  el.style.borderColor = 'var(--color-border)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* 배경 그라디언트 */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '120px', height: '120px',
                  background: 'radial-gradient(circle, rgba(232,0,29,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />

                <div style={{
                  fontSize: '28px',
                  color: 'var(--color-primary)',
                  marginBottom: '20px',
                }}>
                  {item.icon}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-h3)',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px',
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'rgba(245, 245, 245, 0.55)',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}>
                  {item.description}
                </p>

                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '13px',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  자세히 보기 →
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 섹션 3: 서비스 그리드 ────────────────────────────────────
interface ServiceItem {
  name: string;
  desc: string;
  color: string;
}

function ServiceGridSection() {
  const services: ServiceItem[] = [
    { name: '카카오톡', desc: '사람과 세상을 연결하는 전 우주 통신규약을 꿈꾸는 메신저', color: '#FF3347' },
    { name: '카카오맵', desc: '좋은 곳을 함께 찾아가는 지도', color: '#E8001D' },
    { name: '카카오톡 채널', desc: '더 편한 모바일 생활의 시작', color: '#FF3347' },
    { name: '카카오페이지', desc: '세상 모든 이야기를 담다', color: '#E8001D' },
    { name: '카카오T', desc: '모든 이동을 위한 모빌리티 서비스', color: '#FF3347' },
    { name: '카카오페이', desc: '마음놓고 금융하다', color: '#E8001D' },
    { name: '지그재그', desc: '나를 표현하는 쇼핑', color: '#FF3347' },
    { name: '멜론', desc: '음악이 필요한 순간', color: '#E8001D' },
  ];

  return (
    <section
      id="services"
      aria-label="카카오 서비스"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-secondary)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        {/* 헤더 */}
        <AnimatedSection>
          <div style={{ marginBottom: '64px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>Services</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
            }}>
              카카오의 서비스
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'rgba(245, 245, 245, 0.55)',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}>
              카카오는 커뮤니케이션, 일상 편의, 비즈니스, 쇼핑, 엔터테인먼트 등 다양한 영역에서 서비스를 제공합니다.
            </p>
          </div>
        </AnimatedSection>

        {/* 서비스 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--spacing-element-gap)',
          marginBottom: '48px',
        }}>
          {services.map((svc, i) => (
            <AnimatedSection key={svc.name} delay={i * 0.07}>
              <div
                style={{
                  padding: '28px 24px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-card)',
                  cursor: 'pointer',
                  transition: 'all 0.35s var(--animation-easing)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = svc.color;
                  el.style.boxShadow = 'var(--shadow-hover)';
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-border)';
                  el.style.boxShadow = 'var(--shadow-card)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* 상단 컬러 바 */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '2px',
                  backgroundColor: svc.color,
                  opacity: 0.6,
                }} />

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: '10px',
                  letterSpacing: '-0.02em',
                }}>
                  {svc.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(245, 245, 245, 0.5)',
                  lineHeight: 1.6,
                }}>
                  {svc.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection>
          <div style={{ textAlign: 'center' }}>
            <a
              href="#all-services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 32px',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: 'var(--border-radius)',
                textDecoration: 'none',
                transition: 'all 0.3s var(--animation-easing)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'var(--color-primary)';
                el.style.color = 'var(--color-text)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'transparent';
                el.style.color = 'var(--color-primary)';
              }}
            >
              전체 서비스 보기 →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 섹션 4: CTA 배너 (채용) ──────────────────────────────────
function CTABannerSection() {
  return (
    <section
      aria-label="채용 안내"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-background)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 이미지 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://source.unsplash.com/1600x600/?team,office,collaboration"
          alt="채용 배경"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, var(--color-background) 30%, transparent 100%)',
        }} />
      </div>

      {/* 레드 사각형 장식 */}
      <div style={{
        position: 'absolute', right: '10%', top: '50%',
        transform: 'translateY(-50%) rotate(45deg)',
        width: '200px', height: '200px',
        border: '1px solid rgba(232, 0, 29, 0.2)',
      }} />
      <div style={{
        position: 'absolute', right: '12%', top: '50%',
        transform: 'translateY(-50%) rotate(45deg)',
        width: '140px', height: '140px',
        border: '1px solid rgba(232, 0, 29, 0.15)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        <AnimatedSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
            <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>Careers</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h2)',
            fontWeight: 800,
            color: 'var(--color-text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}>
            카카오와 함께<br />
            <span style={{ color: 'var(--color-primary)' }}>미래를 만들</span> 인재
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(245, 245, 245, 0.6)',
            lineHeight: 1.7,
            maxWidth: '480px',
            marginBottom: '40px',
          }}>
            카카오와 함께 미래를 만들어갈 인재를 모집합니다.
          </p>

          <a
            href="#careers"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: '16px 36px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 700,
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-button)',
              transition: 'all 0.3s var(--animation-easing)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = 'var(--shadow-hover)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = 'var(--shadow-button)';
              el.style.transform = 'translateY(0)';
            }}
          >
            채용 바로가기 →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 섹션 5: 뉴스룸 ──────────────────────────────────────────
function NewsSection() {
  const tabs = ['뉴스', '보도자료', '미디어자료', '카카오나우', '카카오이야기', '그룹사이야기'];
  const [activeTab, setActiveTab] = useState(0);

  const newsDummy = [
    { category: '뉴스', date: '2024.01.15', title: '카카오, AI 기술로 새로운 미래를 열다', desc: '카카오가 최첨단 AI 기술을 활용한 새로운 서비스를 공개했습니다.' },
    { category: '보도자료', date: '2024.01.12', title: '카카오 2024 사업전략 발표', desc: '글로벌 시장 확대와 기술 혁신을 통한 지속 성장 전략을 발표했습니다.' },
    { category: '뉴스', date: '2024.01.10', title: '카카오페이, 금융 서비스 혁신 선도', desc: '편리하고 안전한 금융 서비스로 사용자 경험을 혁신합니다.' },
  ];

  return (
    <section
      aria-label="뉴스룸"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        {/* 헤더 */}
        <AnimatedSection>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>Newsroom</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}>
              최신 소식
            </h2>
            <p style={{
              color: 'rgba(245, 245, 245, 0.55)',
              fontSize: '16px',
              lineHeight: 1.7,
            }}>
              카카오의 최신 뉴스, 보도자료, 미디어자료를 확인하세요.
            </p>
          </div>
        </AnimatedSection>

        {/* 탭 */}
        <AnimatedSection delay={0.1}>
          <div style={{
            display: 'flex', gap: '0',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '40px',
            overflowX: 'auto',
          }}>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: activeTab === i ? 700 : 400,
                  color: activeTab === i ? 'var(--color-primary)' : 'rgba(245,245,245,0.45)',
                  borderBottom: activeTab === i ? '2px solid var(--color-primary)' : '2px solid transparent',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === i ? '2px solid var(--color-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s var(--animation-easing)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* 뉴스 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {newsDummy.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <a
                href="#news-detail"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                  padding: '28px',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  textDecoration: 'none',
                  transition: 'all 0.3s var(--animation-easing)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-primary)';
                  el.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-border)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  flexShrink: 0, width: '3px', height: '60px',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '2px',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                    }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(245,245,245,0.35)' }}>{item.date}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(245,245,245,0.5)',
                    lineHeight: 1.6,
                  }}>
                    {item.desc}
                  </p>
                </div>
                <span style={{ color: 'var(--color-primary)', fontSize: '20px', flexShrink: 0 }}>→</span>
              </a>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection>
          <a
            href="#newsroom"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              transition: 'all 0.3s var(--animation-easing)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-primary)';
              el.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-border)';
              el.style.color = 'var(--color-text)';
            }}
          >
            뉴스 바로가기 →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 섹션 6: 투자 정보 ────────────────────────────────────────
function InvestorSection() {
  const stats = [
    { label: '주식 현황', value: 'KRX', sub: '035720' },
    { label: '시가총액', value: '약 23조', sub: '원' },
    { label: '임직원 수', value: '30,000+', sub: '명' },
    { label: '글로벌 거점', value: '15+', sub: '개국' },
  ];

  return (
    <section
      aria-label="투자 정보"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-background)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 */}
      <div style={{
        position: 'absolute', left: '-100px', top: '50%',
        transform: 'translateY(-50%)',
        width: '400px', height: '400px',
        border: '1px solid rgba(232, 0, 29, 0.08)',
        borderRadius: '50%',
      }} />

      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* 텍스트 */}
          <AnimatedSection>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
                <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>IR</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-h2)',
                fontWeight: 800,
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}>
                투자 정보
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'rgba(245, 245, 245, 0.55)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}>
                카카오의 투자정보를 확인하고 주주와 함께 성장합니다.
              </p>
              <a
                href="#investor"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 32px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 700,
                  borderRadius: 'var(--border-radius)',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-button)',
                  transition: 'all 0.3s var(--animation-easing)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-button)';
                }}
              >
                투자정보 바로가기 →
              </a>
            </div>
          </AnimatedSection>

          {/* 스탯 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div style={{
                  padding: '28px 24px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(245,245,245,0.4)',
                    letterSpacing: '0.08em',
                    marginBottom: '12px',
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}>
                    {stat.value}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(245,245,245,0.5)',
                    marginTop: '4px',
                  }}>
                    {stat.sub}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 섹션 7: 그룹사 소식 ─────────────────────────────────────
function GroupSection() {
  const groups = [
    { name: 'Kakao Games', desc: '최고의 게임 경험을 제공합니다' },
    { name: 'Kakao Mobility', desc: '이동의 미래를 설계합니다' },
    { name: 'Kakao Pay', desc: '모두를 위한 금융 플랫폼' },
    { name: 'Kakao Entertainment', desc: '새로운 엔터테인먼트의 탄생' },
    { name: 'Kakao Bank', desc: '스마트한 모바일 뱅크' },
    { name: 'Kakao Style', desc: '라이프스타일을 정의하다' },
  ];

  return (
    <section
      aria-label="그룹사 소식"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-secondary)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        {/* 헤더 */}
        <AnimatedSection>
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>Group Companies</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}>
              그룹사 소식
            </h2>
            <p style={{
              color: 'rgba(245, 245, 245, 0.55)',
              fontSize: '16px',
              lineHeight: 1.7,
            }}>
              카카오 그룹사의 다양한 소식을 확인하세요.
            </p>
          </div>
        </AnimatedSection>

        {/* 그룹사 리스트 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--spacing-element-gap)',
          marginBottom: '40px',
        }}>
          {groups.map((group, i) => (
            <AnimatedSection key={group.name} delay={i * 0.08}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '24px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--animation-easing)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-primary)';
                  el.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-border)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '40px', height: '40px', flexShrink: 0,
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: 'var(--border-radius)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 800 }}>K</span>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '4px',
                  }}>
                    {group.name}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(245,245,245,0.45)',
                  }}>
                    {group.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <a
            href="#group"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              transition: 'all 0.3s var(--animation-easing)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-primary)';
              el.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-border)';
              el.style.color = 'var(--color-text)';
            }}
          >
            그룹사 소식 바로가기 →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 섹션 8: 고객센터 ────────────────────────────────────────
function CustomerServiceSection() {
  const centers = [
    { name: '카카오 고객센터', desc: '카카오 서비스 관련 문의', icon: '💬', href: '#kakao-cs' },
    { name: 'Daum 고객센터', desc: '다음 서비스 관련 문의', icon: '🔍', href: '#daum-cs' },
    { name: '커머스 고객센터', desc: '쇼핑/커머스 관련 문의', icon: '🛒', href: '#commerce-cs' },
  ];

  return (
    <section
      aria-label="고객센터"
      style={{
        padding: 'var(--spacing-section-padding)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        <AnimatedSection>
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 600 }}>Support</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}>
              고객센터
            </h2>
            <p style={{
              color: 'rgba(245, 245, 245, 0.55)',
              fontSize: '16px',
              lineHeight: 1.7,
            }}>
              카카오, Daum, 커머스 고객센터를 통해 궁금한 점을 해결하세요.
            </p>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-element-gap)',
          marginBottom: '40px',
        }}>
          {centers.map((center, i) => (
            <AnimatedSection key={center.name} delay={i * 0.1}>
              <a
                href={center.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '36px 32px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.35s var(--animation-easing)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-primary)';
                  el.style.boxShadow = 'var(--shadow-hover)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--color-border)';
                  el.style.boxShadow = 'var(--shadow-card)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '36px' }}>{center.icon}</div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                  }}>
                    {center.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(245,245,245,0.5)',
                    lineHeight: 1.6,
                  }}>
                    {center.desc}
                  </p>
                </div>
                <span style={{
                  color: 'var(--color-primary)',
                  fontSize: '22px',
                  fontWeight: 300,
                }}>
                  →
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <a
            href="#support"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              transition: 'all 0.3s var(--animation-easing)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-primary)';
              el.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-border)';
              el.style.color = 'var(--color-text)';
            }}
          >
            고객센터 바로가기 →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 섹션 9: Footer ───────────────────────────────────────────
function Footer() {
  const links1 = ['이용약관', '개인정보처리방침', '위치정보 이용약관', '운영정책', '안전보건제안', '청소년보호정책'];
  const links2 = ['접근성 안내', '브랜드보호정책', '권리침해신고안내', '공지사항', '사이버윤리실', 'Contact Us'];
  const links3 = ['카카오 프라이버시', '카카오 디벨로퍼스', '다음 포털', '동반 성장', '제주 with kakao'];

  return (
    <footer
      aria-label="사이트 푸터"
      style={{
        backgroundColor: 'var(--color-secondary)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '64px',
        paddingBottom: '40px',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        {/* 로고 + 설명 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          marginBottom: '48px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--border-radius)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '18px', fontFamily: 'var(--font-heading)' }}>K</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}>
              Kakao
            </span>
          </div>

          <p style={{
            fontSize: '13px',
            color: 'rgba(245,245,245,0.35)',
            lineHeight: 1.7,
            maxWidth: '500px',
          }}>
            서비스 이용정보, 운영정책, 공지사항, 관련 사이트 안내
          </p>
        </div>

        {/* 링크 그룹 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <nav aria-label="법적 정보">
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0', listStyle: 'none', padding: 0, margin: 0 }}>
              {links1.map((link, i) => (
                <li key={link} style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    href="#"
                    style={{
                      fontSize: '13px',
                      color: link === '개인정보처리방침' ? 'var(--color-primary)' : 'rgba(245,245,245,0.45)',
                      textDecoration: 'none',
                      padding: '4px 12px',
                      fontWeight: link === '개인정보처리방침' ? 600 : 400,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text)'; }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = link === '개인정보처리방침' ? 'var(--color-primary)' : 'rgba(245,245,245,0.45)';
                    }}
                  >
                    {link}
                  </a>
                  {i < links1.length - 1 && (
                    <span style={{ color: 'var(--color-border)', fontSize: '12px' }}>|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="서비스 정책">
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0', listStyle: 'none', padding: 0, margin: 0 }}>
              {links2.map((link, i) => (
                <li key={link} style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    href="#"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(245,245,245,0.35)',
                      textDecoration: 'none',
                      padding: '4px 12px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,245,0.35)'; }}
                  >
                    {link}
                  </a>
                  {i < links2.length - 1 && (
                    <span style={{ color: 'var(--color-border)', fontSize: '12px' }}>|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="관련 사이트">
            <p style={{ fontSize: '11px', color: 'rgba(245,245,245,0.25)', marginBottom: '8px', letterSpacing: '0.08em' }}>
              관련 사이트
            </p>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0', listStyle: 'none', padding: 0, margin: 0 }}>
              {links3.map((link, i) => (
                <li key={link} style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    href="#"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(245,245,245,0.3)',
                      textDecoration: 'none',
                      padding: '4px 12px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,245,0.3)'; }}
                  >
                    {link}
                  </a>
                  {i < links3.length - 1 && (
                    <span style={{ color: 'var(--color-border)', fontSize: '12px' }}>|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 카피라이트 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{
            fontSize: '12px',
            color: 'rgba(245,245,245,0.25)',
            lineHeight: 1.6,
          }}>
            (주)카카오 | 대표이사 : 정신아 | 경기도 성남시 분당구 판교역로 235<br />
            사업자등록번호 : 120-81-47521 | 통신판매업신고번호 : 2015-성남분당-0093<br />
            © Kakao Corp.
          </p>
          <div style={{
            width: '40px', height: '40px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s var(--animation-easing)',
          }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            aria-label="페이지 상단으로 이동"
            tabIndex={0}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-primary)';
              el.style.backgroundColor = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-border)';
              el.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ color: 'var(--color-text)', fontSize: '16px' }}>↑</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── 내비게이션 ────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['서비스', 'AI/TECH', '채용', 'ESG', '뉴스룸', 'IR'];

  return (
    <nav
      aria-label="메인 내비게이션"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'all 0.4s var(--animation-easing)',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* 로고 */}
        <a
          href="/"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: '32px', height: '32px',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '16px', fontFamily: 'var(--font-heading)' }}>K</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
          }}>
            Kakao
          </span>
        </a>

        {/* 데스크탑 메뉴 */}
        <ul style={{
          display: 'flex',
          gap: '8px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          alignItems: 'center',
        }}
          className="hidden md:flex"
        >
          {navItems.map(item => (
            <li key={item}>
              <a
                href={`#${item}`}
                style={{
                  display: 'block',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(245,245,245,0.7)',
                  textDecoration: 'none',
                  borderRadius: 'var(--border-radius)',
                  transition: 'all 0.2s var(--animation-easing)',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--color-text)';
                  el.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'rgba(245,245,245,0.7)';
                  el.style.backgroundColor = 'transparent';
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* 햄버거 버튼 (모바일) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기/닫기"
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="flex md:hidden"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-text)',
                transition: 'all 0.3s var(--animation-easing)',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translateY(7px)' : i === 1 ? 'opacity:0' : 'rotate(-45deg) translateY(-7px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'var(--color-secondary)',
          borderTop: '1px solid var(--color-border)',
          padding: '16px clamp(20px, 5vw, 80px)',
        }}>
          {navItems.map(item => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '14px 0',
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(245,245,245,0.7)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--color-border)',
                fontFamily: 'var(--font-body)',
                transition: 'color 0.2s',
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden { display: none !important; }
          .flex { display: flex !important; }
        }
        @media (max-width: 767px) {
          .hidden { display: flex !important; }
          .flex { display: flex !important; }
          .hidden.md\\:flex { display: none !important; }
          .flex.md\\:hidden { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── 메인 페이지 ──────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <style>{cssVariables}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background-color: var(--color-background);
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: var(--text-base);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @media (max-width: 768px) {
          :root {
            --spacing-section-padding: 72px 0;
          }
        }
        ::selection {
          background-color: var(--color-primary);
          color: white;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: var(--color-background);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--color-primary);
          border-radius: 3px;
        }
      `}</style>

      <Navigation />

      <main>
        <HeroSection />
        <FeatureGridSection />
        <ServiceGridSection />
        <CTABannerSection />
        <NewsSection />
        <InvestorSection />
        <GroupSection />
        <CustomerServiceSection />
      </main>

      <Footer />
    </>
  );
}