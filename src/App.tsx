import { motion } from 'motion/react';
import { useTranslation } from './i18n';
import React, { useEffect, useState, useRef } from 'react';
import { Activity, ArrowRight, Cast, CheckCircle, Cloud, Key, Lock, Server, Shield } from 'lucide-react';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 102, 6, 0.12), transparent 40%)`,
      }}
    />
  );
};

const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #fcf6e6 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }}
    />
  </div>
);

const BackgroundMotion = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[20%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full bg-[#1A1A1A]/20 blur-[80px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-[20%] right-[10%] w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] rounded-full bg-[#1A1A1A]/20 blur-[60px] md:blur-[100px]"
      />
    </div>
  );
};

const ShootingStars = () => (
  <div className="absolute top-0 inset-x-0 h-[500px] md:h-[700px] overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[8%] left-[-5%] w-[140px] md:w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#1A1A1A]/50 to-[#4ade80] rotate-[15deg] animate-shoot" style={{ animationDelay: '0s', animationDuration: '2.2s' }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] md:w-[4px] md:h-[4px] bg-white rounded-full shadow-[0_0_8px_2px_#4ade80]" />
    </div>
    <div className="absolute top-[20%] left-[-8%] w-[160px] md:w-[230px] h-[2px] bg-gradient-to-r from-transparent via-[#1A1A1A]/40 to-[#4ade80] rotate-[12deg] animate-shoot" style={{ animationDelay: '1.5s', animationDuration: '2.4s' }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] md:w-[5px] md:h-[5px] bg-white rounded-full shadow-[0_0_10px_3px_#4ade80]" />
    </div>
    <div className="absolute top-[5%] left-[-3%] w-[100px] md:w-[150px] h-[1.5px] bg-gradient-to-r from-transparent via-[#1A1A1A]/35 to-[#4ade80]/80 rotate-[20deg] animate-shoot" style={{ animationDelay: '0.7s', animationDuration: '2s' }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] md:w-[3px] md:h-[3px] bg-white rounded-full shadow-[0_0_6px_1px_#4ade80]" />
    </div>
    <div className="absolute top-[28%] left-[-6%] w-[180px] md:w-[260px] h-[2px] bg-gradient-to-r from-transparent via-[#1A1A1A]/30 to-[#4ade80] rotate-[10deg] animate-shoot" style={{ animationDelay: '2.8s', animationDuration: '2.6s' }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] md:w-[5px] md:h-[5px] bg-white rounded-full shadow-[0_0_10px_3px_#4ade80]" />
    </div>
  </div>
);

const BeamButton = ({ children, primary = true, className = '', ...props }: any) => {
  return (
    <button
      className={`relative inline-flex overflow-hidden rounded-full focus:outline-none group ${className}`}
      {...props}
    >
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full ${
        primary 
          ? 'bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A] text-white shadow-lg shadow-[#1A1A1A]/30 hover:shadow-[0_0_30px_rgba(6,102,6,0.6)]' 
          : 'bg-transparent border border-white/10 hover:border-white/30 text-[#fcf6e6]'
      } px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold backdrop-blur-3xl transition-all duration-300`}>
        {children}
      </span>
    </button>
  );
};

const Header = () => {
  const { lang, setLang, t } = useTranslation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const handleAuthClick = () => {
    const prefix = lang === 'en' ? '/en' : '';
    if (user) {
      window.location.href = `${prefix}${user.redirect}`;
    } else {
      window.location.href = `${prefix}/login`;
    }
  };

  const renderFlag = () => lang === 'en' ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-auto rounded-sm shadow-sm opacity-90 hover:opacity-100 transition-opacity md:w-6">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" className="w-5 h-auto rounded-sm shadow-sm opacity-90 hover:opacity-100 transition-opacity md:w-6">
      <rect width="16" height="10" fill="#006aa7"/>
      <rect x="5" width="2" height="10" fill="#fecc00"/>
      <rect y="4" width="16" height="2" fill="#fecc00"/>
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 relative">
        
        {/* === Desktop Header (Hidden on Mobile) === */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          <div className="flex items-center shrink-0">
            <img src="/kalm_logo.png" alt="kalm logo" className="h-8 md:h-10 object-contain" />
          </div>

          <nav className="flex items-center gap-8 text-sm font-semibold text-[#fcf6e6]/70">
            <a href="#features" className="hover:text-[#fcf6e6] transition-colors">{t('navFeatures')}</a>
            <a href="#architecture" className="hover:text-[#fcf6e6] transition-colors">{t('navArchitecture')}</a>
            <a href="#resources" className="hover:text-[#fcf6e6] transition-colors">{t('navResources')}</a>
            <a href="#about" className="hover:text-[#fcf6e6] transition-colors">{t('navAbout')}</a>
          </nav>
          
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => window.location.href = lang === 'en' ? '/' : '/en'}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#1A1A1A]/50 transition-all overflow-hidden"
              title="Switch Language"
            >
              {renderFlag()}
            </button>
            <button onClick={handleAuthClick} className="text-sm font-semibold hover:text-[#1A1A1A] px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-[#1A1A1A]/30">
              {user ? 'Dashboard' : t('login')}
            </button>
            <BeamButton className="h-10 px-6 text-sm !py-0">{t('bookDemo')}</BeamButton>
          </div>
        </div>

        {/* === Mobile Header (Hidden on Desktop) === */}
        <div className="flex md:hidden w-full h-full items-center justify-between relative">
          <div className="flex items-center shrink-0">
            <img src="/kalm_logo.png" alt="kalm logo" className="h-7 object-contain" />
          </div>

          {/* Absolute centered flag element */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <button 
              onClick={() => window.location.href = lang === 'en' ? '/' : '/en'}
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#1A1A1A]/50 transition-all overflow-hidden pointer-events-auto"
              title="Switch Language"
            >
              {renderFlag()}
            </button>
          </div>

          <div className="shrink-0 flex items-center">
            {/* Mobile Log In */}
            <BeamButton onClick={handleAuthClick} className="h-8 px-4 text-xs !py-0 whitespace-nowrap">
              {t('login')}
            </BeamButton>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  return (
  <section className="pt-16 pb-12 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
    <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
      <div className="flex-1 text-center lg:text-left z-10 w-full">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[1.05] uppercase">
          {t('heroTitleOutline')} <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] to-[#1A1A1A]">{t('heroTitleHighlight')}</span><br/>
          {t('heroTitleEnd')}
        </h1>
        <p className="text-lg sm:text-xl text-[#fcf6e6]/70 mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
          {t('heroSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <BeamButton className="w-full sm:w-auto">{t('bookADemo')}</BeamButton>
          <BeamButton primary={false} className="w-full sm:w-auto">{t('readDocs')}</BeamButton>
        </div>
      </div>
      <div className="flex-1 w-full z-10 mt-8 lg:mt-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-[#050505]/80 relative overflow-hidden group shadow-2xl shadow-[#1A1A1A]/10 hover:shadow-[#1A1A1A]/20 transition-shadow duration-500 backdrop-blur-sm"
        >
          {/* macOS-style title bar */}
          <div className="h-10 md:h-12 border-b border-white/10 flex items-center px-4 md:px-5 gap-2 bg-[#1a1a1a]/80">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
            <span className="ml-3 text-white/30 text-xs font-medium tracking-wide hidden sm:inline">kalm — Admin Dashboard</span>
          </div>
          {/* Dashboard screenshot */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A]/15 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-700 z-10 pointer-events-none" />
            <img 
              src="/dashboard-preview.png" 
              alt="kalm Dashboard Preview" 
              className="w-full h-auto block"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

const IntroSection = () => {
  const { t } = useTranslation();
  return (
  <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 uppercase">
      {t('introTitle')}
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-[#fcf6e6]/60 leading-relaxed">
      {t('introDesc')}
    </p>
  </section>
  );
};

const LogoSlider = () => {
  const logos = ["Uppsala", "Mölndal", "Ludvika", "Helsingborg", "Falkenberg", "Dibber", "Stockholm", "Malmö"];
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <div className="py-8 md:py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden relative flex">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <div className="flex whitespace-nowrap animate-slide">
        {duplicatedLogos.map((logo, i) => (
          <div key={i} className="inline-flex items-center justify-center px-8 md:px-16 text-lg md:text-2xl font-black text-white/20 uppercase tracking-widest shrink-0">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureTeasers = () => {
  const { t } = useTranslation();
  const features = [
    { title: t('f1Title'), text: t('f1Desc'), img: "/classroom.png" },
    { title: t('f2Title'), text: t('f2Desc'), img: "/admin.png" },
    { title: t('f3Title'), text: t('f3Desc'), img: "/whiteboard.png" },
    { title: t('f4Title'), text: t('f4Desc'), img: "/dashboard-preview.png" }
  ];

  return (
    <section id="features" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-10 md:mb-16 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 md:mb-6 uppercase">
          {t('featureTitle')} <br className="hidden md:block" />
          <span className="text-[#1A1A1A]">{t('featureTitleHighlight')}</span>
        </h2>
        <p className="text-lg md:text-xl text-[#fcf6e6]/60 max-w-2xl mx-auto md:mx-0">
          {t('featureDesc')}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {features.map((f, i) => (
          <TeaserCard key={i} title={f.title} text={f.text} image={f.img} linkText={t('learnMore')} />
        ))}
      </div>
    </section>
  );
};

const TeaserCard = ({ title, text, image, linkText }: any) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="group flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] hover:border-[#1A1A1A]/50 hover:bg-white/[0.04] transition-all duration-300"
  >
    <div className="aspect-[2/1] bg-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80 z-10" />
      <div className="absolute inset-0 bg-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20 -mt-8 md:-mt-12">
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-[#1A1A1A] transition-colors">{title}</h3>
      <p className="text-sm md:text-base text-[#fcf6e6]/60 mb-6 md:mb-8 flex-1 leading-relaxed">{text}</p>
      <div className="mt-auto">
        <span className="inline-flex items-center text-[#1A1A1A] font-semibold text-sm md:text-base">
          {linkText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </motion.div>
);

const AlternatingSections = () => {
  const { t } = useTranslation();
  const sections = [
    {
      title: t('alt1Title'),
      text: t('alt1Desc'),
      img: "/admin.png"
    },
    {
      title: t('alt2Title'),
      text: t('alt2Desc'),
      img: "/architecture.png",
      reverse: true
    },
    {
      title: t('alt3Title'),
      text: t('alt3Desc'),
      img: "/security.png"
    },
    {
      title: t('alt4Title'),
      text: t('alt4Desc'),
      img: "/recovery.png"
    }
  ];

  return (
    <section id="architecture" className="py-8 md:py-12 scroll-mt-24">
      {sections.map((s, i) => (
        <AlternatingSection key={i} {...s} btnText={t('exploreFeature')} />
      ))}
    </section>
  );
};

const AlternatingSection = ({ title, text, img, reverse = false, btnText = 'Explore Feature' }: any) => (
  <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-20`}>
      <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight">{title}</h2>
        <p className="text-base md:text-xl text-[#fcf6e6]/60 leading-relaxed">{text}</p>
        <div className="pt-2 md:pt-4">
          <BeamButton primary={false} className="w-full sm:w-auto">{btnText}</BeamButton>
        </div>
      </div>
        <div className="flex-1 w-full mt-6 md:mt-0">
          <div className="aspect-square md:aspect-[4/3] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
             <img src={img} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
    </div>
  </div>
);

const SecurityCards = () => {
  const { t } = useTranslation();
  const cards = [
    { title: t('sec1Title'), text: t('sec1Desc'), icon: Activity },
    { title: t('sec2Title'), text: t('sec2Desc'), icon: Key },
    { title: t('sec3Title'), text: t('sec3Desc'), icon: Shield }
  ];

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 md:mb-6">{t('secTitle')}</h2>
          <p className="text-base md:text-xl text-[#fcf6e6]/60 max-w-2xl mx-auto">
            {t('secDesc')}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {cards.map((c, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 bg-[#050505] hover:border-[#1A1A1A]/50 transition-colors group">
              <div className="mb-4 md:mb-6 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-white/5 text-[#fcf6e6] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                <c.icon className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{c.title}</h3>
              <p className="text-sm md:text-base text-[#fcf6e6]/60 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsTeasers = () => {
  const { t } = useTranslation();
  const news = [
    { title: t('n1Title'), text: t('n1Desc'), img: "/webinar.png" },
    { title: t('n2Title'), text: t('n2Desc'), img: "/classroom.png" },
    { title: t('n3Title'), text: t('n3Desc'), img: "/casestudy.png" },
    { title: t('n4Title'), text: t('n4Desc'), img: "/architecture.png" }
  ];

  return (
    <section id="resources" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-10 md:mb-16 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 md:mb-6 uppercase">{t('newsTitle')}</h2>
        <p className="text-base md:text-xl text-[#fcf6e6]/60 max-w-2xl mx-auto md:mx-0">
          {t('newsDesc')}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {news.map((n, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -8 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#1A1A1A]/50 transition-all duration-300"
          >
            <div className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img src={n.img} alt={n.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-[#1A1A1A] transition-colors leading-tight">{n.title}</h3>
              <p className="text-[#fcf6e6]/50 text-xs md:text-sm mb-4 md:mb-6 flex-1 leading-relaxed">{n.text}</p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-[#1A1A1A] font-semibold text-xs md:text-sm">
                  {t('readMore')} <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const QuotesSlider = () => {
  const { t } = useTranslation();
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  const quotes = [
    { text: t('q1Text'), author: t('q1Auth'), role: t('q1Role'), image: "/portrait_daniel_1773507423385.png" },
    { text: t('q2Text'), author: t('q2Auth'), role: t('q2Role'), image: "/portrait_monia_1773507631272.png" },
    { text: t('q3Text'), author: t('q3Auth'), role: t('q3Role'), image: "/portrait_anna_1773506900393.png" },
    { text: t('q4Text'), author: t('q4Auth'), role: t('q4Role'), image: "/portrait_maria_1773506776830.png" },
    { text: "Zero downtime since deploying kalm across 2,000 devices.", author: "Maria L.", role: "CTO, EdTech Solutions", image: "/portrait_maria_1773506776830.png" },
    { text: "Our teachers love the instant screen casting. Game changer.", author: "Johan K.", role: "Principal, Malmö School", image: "/portrait_johan_1773506876276.png" },
    { text: "IT tickets dropped 90% in the first month. Incredible.", author: "Anna S.", role: "IT Manager, Falkenberg", image: "/portrait_anna_1773506900393.png" },
    { text: "The immutable OS means students can't break anything. Finally.", author: "Erik B.", role: "Sysadmin, Ludvika District", image: "/portrait_erik_1773506979758.png" },
  ];

  // Render 3x for seamless wrap
  const tripled = [...quotes, ...quotes, ...quotes];
  // Offset row 2 by half so the same review never appears in both rows at once
  const halfLen = Math.floor(quotes.length / 2);
  const row2Quotes = [...quotes.slice(halfLen), ...quotes.slice(0, halfLen)];
  const tripledRow2 = [...row2Quotes, ...row2Quotes, ...row2Quotes];

  useEffect(() => {
    let animId: number;
    const speed = 0.41; // px per frame (~18% slower)

    const animate = () => {
      posRef.current += speed;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (row1 && row2) {
        // Each "set" is 1/3 of total width since we tripled
        const setWidth = row1.scrollWidth / 3;
        // Wrap seamlessly using modulo
        const offset1 = posRef.current % setWidth;
        const offset2 = posRef.current % setWidth;
        row1.style.transform = `translate3d(-${offset1}px, 0, 0)`;
        row2.style.transform = `translate3d(${offset2 - setWidth}px, 0, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const ReviewCard = ({ q, key }: { q: typeof quotes[0], key?: string }) => (
    <div className="inline-flex shrink-0 mx-2 md:mx-3 w-[320px] md:w-[380px]">
      <div className="bg-[#0a0a0a] border border-[#1A1A1A]/20 rounded-2xl p-5 md:p-6 hover:border-[#1A1A1A]/50 transition-colors w-full whitespace-normal shadow-[0_0_15px_-3px_rgba(6,102,6,0.25)] hover:shadow-[0_0_20px_-3px_rgba(6,102,6,0.4)]">
        <p className="text-sm md:text-base text-[#fcf6e6]/80 leading-relaxed mb-4 line-clamp-3">"{q.text}"</p>
        <div className="flex items-center gap-3">
          {q.image ? (
            <img 
              src={q.image} 
              alt={q.author} 
              className="h-10 w-10 rounded-full object-cover shrink-0 ring-2 ring-[#1A1A1A]/40 shadow-[0_0_10px_rgba(6,102,6,0.5)]"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-[#1A1A1A]/20 flex items-center justify-center font-bold text-sm text-[#1A1A1A] shrink-0 ring-2 ring-[#1A1A1A]/20">
              {q.author[0]}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-bold text-xs text-[#fcf6e6]">{q.author}</div>
            <div className="text-[#fcf6e6]/40 text-[11px] truncate">{q.role}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center uppercase">{t('quoteTitle')}</h2>
      </div>
      
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - scrolls left */}
      <div className="overflow-hidden mb-4 md:mb-6">
        <div ref={row1Ref} className="flex whitespace-nowrap" style={{ willChange: 'transform' }}>
          {tripled.map((q, i) => <ReviewCard key={`a-${i}`} q={q} />)}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex whitespace-nowrap" style={{ willChange: 'transform' }}>
          {tripledRow2.map((q, i) => <ReviewCard key={`b-${i}`} q={q} />)}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { t } = useTranslation();
  return (
  <section className="py-24 md:py-48 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] max-w-[600px] max-h-[600px] bg-[#1A1A1A]/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
    
    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 md:mb-8 relative z-10 uppercase">
      {t('ctaTitle1')} <br/> {t('ctaTitle2')}
    </h2>
    <p className="text-base md:text-xl text-[#fcf6e6]/60 mb-10 md:mb-12 max-w-2xl mx-auto relative z-10">
      {t('ctaDesc')}
    </p>
    <div className="relative z-10 flex justify-center">
      <BeamButton className="w-full sm:w-auto">{t('bookADemo')}</BeamButton>
    </div>
  </section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
  <footer id="about" className="bg-[#050505] border-t border-white/10 pt-12 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 mb-12 md:mb-20">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center mb-4 md:mb-6">
            <img src="/kalm_logo.png" alt="kalm logo" className="h-8 object-contain" />
          </div>
          <p className="text-[#fcf6e6]/50 text-xs md:text-sm leading-relaxed">
            {t('footerDesc')}
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">{t('navAbout')}</h4>
          <ul className="space-y-3 md:space-y-4 text-[#fcf6e6]/60 text-xs md:text-sm">
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('aboutFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('careersFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('privacyFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('contactFooter')}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">{t('toolsFooterTitle')}</h4>
          <ul className="space-y-3 md:space-y-4 text-[#fcf6e6]/60 text-xs md:text-sm">
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('osCoreFooter')}</a></li>
            <li><a href="/dashboard" className="hover:text-[#1A1A1A] transition-colors">{t('dashboardFooter')}</a></li>
            <li><a href="/admin" className="hover:text-[#1A1A1A] transition-colors">IT Admin Hub (God Mode)</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('classroomFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('integrationsFooter')}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">{t('resourcesFooterTitle')}</h4>
          <ul className="space-y-3 md:space-y-4 text-[#fcf6e6]/60 text-xs md:text-sm">
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('blogFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('docFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('webinarsFooter')}</a></li>
            <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">{t('supportFooter')}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-[#fcf6e6]/40">
        <p>© {new Date().getFullYear()} {t('rightsFooter')}</p>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fcf6e6] selection:bg-[#1A1A1A] selection:text-white font-sans overflow-x-hidden relative">
      <CursorGlow />
      <GridBackground />
      <BackgroundMotion />
      <ShootingStars />
      
      <Header />

      <main className="relative z-10">
        <HeroSection />
        <IntroSection />
        <LogoSlider />
        <FeatureTeasers />
        <AlternatingSections />
        <SecurityCards />
        <NewsTeasers />
        <QuotesSlider />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
