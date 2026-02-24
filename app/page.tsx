'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
    BookOpen, FileText, Download, Github, Linkedin, ExternalLink, ChevronDown, Menu, X,
    MessageSquare, Send, Code, Terminal, GraduationCap,
    Users, Globe, Zap, Heart, Search, UploadCloud, Palette,
    Calculator, Atom, Beaker, Binary, Brain, Gamepad2, Cloud, Server, Shield,
    Briefcase, Smartphone, Monitor, Cpu, Database,
} from 'lucide-react';
import {
    SEMESTERS, PRACTICALS, CONTRIBUTOR, HERO_IMAGE, REPO_LINK, UPLOAD_LINK, THEMES, LOGO_URL,
} from '@/lib/constants';
import { Semester, Subject } from '@/lib/types';
import AnimatedBackground from '@/components/AnimatedBackground';
import { TiltCard, Typewriter, AnimatedCounter, Reveal, Magnetic } from '@/components/InteractiveComponents';
import { SearchModal, ContributeModal } from '@/components/Modals';

export default function HomePage() {
    const [activeSem, setActiveSem] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    const activeTheme = THEMES[currentThemeIndex];

    const [scrollProgress, setScrollProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const cycleTheme = useCallback(() => {
        setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length);
    }, []);

    // Scroll progress and show top button
    useEffect(() => {
        const updateScroll = () => {
            const scrollPosition = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress((scrollPosition / totalHeight) * 100);
            setShowScrollTop(scrollPosition > 500);
        };
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    // Spotlight effect
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (window.innerWidth < 768) return;
            const cards = document.querySelectorAll('.spotlight-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleSem = useCallback((id: number) => {
        setActiveSem(prev => prev === id ? null : id);
    }, []);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    }, []);

    const handleFeedback = useCallback(() => {
        if (!feedbackMsg.trim()) return;
        const body = encodeURIComponent(feedbackMsg);
        window.open(`${REPO_LINK}/issues/new?body=${body}`, '_blank');
        setFeedbackMsg('');
    }, [feedbackMsg]);

    const getSubjectIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('math') || n.includes('statistics') || n.includes('discrete')) return <Calculator className="w-5 h-5" />;
        if (n.includes('physics')) return <Atom className="w-5 h-5" />;
        if (n.includes('chemistry')) return <Beaker className="w-5 h-5" />;
        if (n.includes('data structure') || n.includes('algorithm')) return <Binary className="w-5 h-5" />;
        if (n.includes('operating system') || n.includes('os') || n.includes('linux')) return <Server className="w-5 h-5" />;
        if (n.includes('programming') || n.includes('c++') || n.includes('java') || n.includes('python')) return <Terminal className="w-5 h-5" />;
        if (n.includes('app') || n.includes('mobile') || n.includes('android')) return <Smartphone className="w-5 h-5" />;
        if (n.includes('ai') || n.includes('intelligence') || n.includes('deep learning') || n.includes('neural')) return <Brain className="w-5 h-5" />;
        if (n.includes('data') || n.includes('database') || n.includes('dbms') || n.includes('big data')) return <Database className="w-5 h-5" />;
        if (n.includes('electronics') || n.includes('iot') || n.includes('hardware') || n.includes('embedded') || n.includes('digital') || n.includes('processor')) return <Cpu className="w-5 h-5" />;
        if (n.includes('graphics') || n.includes('game') || n.includes('ar') || n.includes('vr') || n.includes('multimedia')) return <Gamepad2 className="w-5 h-5" />;
        if (n.includes('network') || n.includes('cloud') || n.includes('distributed')) return <Cloud className="w-5 h-5" />;
        if (n.includes('security') || n.includes('blockchain') || n.includes('crypto')) return <Shield className="w-5 h-5" />;
        if (n.includes('design') || n.includes('ui') || n.includes('ux')) return <Palette className="w-5 h-5" />;
        if (n.includes('business') || n.includes('management') || n.includes('internship') || n.includes('project')) return <Briefcase className="w-5 h-5" />;
        if (n.includes('drawing')) return <Monitor className="w-5 h-5" />;
        return <BookOpen className="w-5 h-5" />;
    };

    const getTheme = (index: number) => THEMES[index % THEMES.length];

    return (
        <div className="relative min-h-screen text-slate-100 selection:bg-pink-500/30 overflow-hidden w-full">
            <AnimatedBackground theme={activeTheme} />

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <ContributeModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />

            {/* Scroll Progress Bar */}
            <div
                className={`fixed top-0 left-0 h-1 z-[100] transition-all duration-300 bg-gradient-to-r ${activeTheme.gradient}`}
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
                            <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-r ${activeTheme.gradient} rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200`}></div>
                                <div className="relative bg-slate-950 p-1 rounded-lg border border-white/10 overflow-hidden">
                                    <Image
                                        src={LOGO_URL}
                                        alt="KKW Logo"
                                        width={28}
                                        height={28}
                                        className="rounded object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                            <span className={`font-bold text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient} animate-text-gradient`}>
                                KKW CSD Hub
                            </span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-lg text-sm text-slate-400 hover:text-white transition-all group mr-2 w-48"
                            >
                                <Search className="w-4 h-4" />
                                <span>Search...</span>
                                <span className="ml-auto text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-slate-500 group-hover:text-slate-400">Ctrl K</span>
                            </button>

                            <div className="flex items-center space-x-1">
                                {['Home', 'Semesters', 'Practicals', 'Feedback', 'About'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/10 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">{item}</span>
                                    </button>
                                ))}

                                <button
                                    onClick={cycleTheme}
                                    className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 text-white/80 hover:text-white bg-gradient-to-br ${activeTheme.gradient} bg-opacity-10 hover:shadow-lg`}
                                    title={`Current Theme: ${activeTheme.name}`}
                                >
                                    <Palette className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() => setUploadOpen(true)}
                                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all hover:scale-110 active:scale-95"
                                    title="Upload / Contribute"
                                >
                                    <UploadCloud className="w-5 h-5" />
                                </button>

                                <a
                                    href={REPO_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ml-2 p-2 text-slate-400 hover:text-white transition-all hover:rotate-12 hover:scale-110 hover:bg-white/10 rounded-full"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center gap-2">
                            <button onClick={cycleTheme} className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                                <Palette className="w-6 h-6" />
                            </button>
                            <button onClick={() => setUploadOpen(true)} className="p-2 rounded-md text-blue-400 hover:bg-blue-500/10 transition-colors">
                                <UploadCloud className="w-6 h-6" />
                            </button>
                            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                                <Search className="w-6 h-6" />
                            </button>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className={`md:hidden absolute w-full glass-nav border-b border-slate-700 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {['Home', 'Semesters', 'Practicals', 'Feedback', 'About'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="block w-full text-left px-4 py-4 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-transparent active:bg-white/10 transition-all"
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => { setUploadOpen(true); setMobileMenuOpen(false); }}
                            className="w-full text-left px-4 py-4 rounded-xl text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 border border-transparent active:bg-blue-500/20 transition-all flex items-center gap-2"
                        >
                            <UploadCloud className="w-5 h-5" /> Contribute / Upload
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10">

                {/* Hero Section */}
                <section id="home" className="min-h-[100dvh] pt-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center animate-fade-in-up">
                        <div className="text-left space-y-6 md:space-y-8 order-2 md:order-1 relative z-10">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/60 border ${activeTheme.border} backdrop-blur-md text-xs md:text-sm font-medium ${activeTheme.text} shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-colors cursor-default`}>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeTheme.badge} opacity-75`}></span>
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${activeTheme.badge}`}></span>
                                </span>
                                Updated for 2024-25 Batch
                            </div>

                            <Reveal delay={200}>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] mb-8">
                                    <span className="block text-white drop-shadow-2xl typing-cursor min-h-[4.5rem] md:min-h-auto">
                                        <Typewriter text="Computer Science & Design" delay={50} />
                                    </span>
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient} animate-text-gradient text-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mt-6`}>
                                        Resource Hub
                                    </span>
                                </h1>
                            </Reveal>

                            <Reveal delay={300}>
                                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg drop-shadow-md">
                                    Unlock your potential with our curated collection of notes, question papers, and practical solutions.
                                </p>
                            </Reveal>

                            <Reveal delay={400}>
                                <div className="flex flex-wrap gap-4 sm:gap-5 pt-4">
                                    <Magnetic>
                                        <button
                                            onClick={() => scrollToSection('semesters')}
                                            className="group relative px-8 py-4 bg-transparent rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto text-center cursor-pointer shadow-xl shadow-blue-500/10"
                                        >
                                            <div className="absolute inset-0 animated-border-gradient opacity-100 rounded-xl"></div>
                                            <div className="absolute inset-[2px] bg-slate-900 rounded-[10px] z-10"></div>
                                            <div className={`relative z-20 flex items-center justify-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${activeTheme.gradient} transition-all`}>
                                                <BookOpen className="w-5 h-5 text-white" />
                                                Start Learning
                                            </div>
                                        </button>
                                    </Magnetic>

                                    <Magnetic>
                                        <button
                                            onClick={() => scrollToSection('practicals')}
                                            className="px-8 py-4 glass-card text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 w-full sm:w-auto cursor-pointer"
                                        >
                                            <Code className="w-5 h-5" /> Lab Manuals
                                        </button>
                                    </Magnetic>

                                    <Magnetic>
                                        <a
                                            href={UPLOAD_LINK}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-8 py-4 glass-card text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 w-full sm:w-auto"
                                        >
                                            <UploadCloud className="w-5 h-5" /> Contribute
                                        </a>
                                    </Magnetic>
                                </div>
                            </Reveal>
                        </div>

                        <TiltCard className="order-1 md:order-2 relative group w-full">
                            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform transition-all duration-500 bg-black">
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradient} opacity-[0.08]`}></div>

                                {/* Hex Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.04]" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 17.5V42.5L30 55L5 42.5V17.5L30 5Z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                                    backgroundSize: '60px 60px',
                                }}></div>

                                {/* Decorative icons */}
                                <div className="absolute top-10 left-10 text-white/10 animate-float">
                                    <Code size={40} />
                                </div>
                                <div className="absolute bottom-10 right-10 text-white/5 animate-float animation-delay-2000">
                                    <Terminal size={32} />
                                </div>
                                <div className="absolute top-1/2 left-4 text-white/5 animate-float animation-delay-4000">
                                    <Database size={24} />
                                </div>

                                {/* Logo Container */}
                                <div className="flex items-center justify-center p-6 min-h-[350px] sm:min-h-[450px] relative">
                                    {/* Animated rings */}
                                    <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border border-white/[0.08] animate-[spin_25s_linear_infinite]"></div>
                                    <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-[22rem] md:h-[22rem] rounded-full border border-white/[0.05] animate-[spin_35s_linear_infinite_reverse]"></div>
                                    <div className="absolute w-44 h-44 sm:w-60 sm:h-60 md:w-68 md:h-68 rounded-full border border-dashed border-white/[0.06] animate-[spin_20s_linear_infinite]"></div>

                                    {/* Glow behind logo */}
                                    <div className={`absolute w-full h-full bg-gradient-to-r ${activeTheme.gradient} rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>

                                    {/* Logo — invert+hue-rotate makes white→black, screen blend makes black→transparent */}
                                    <div className="relative z-10 w-full h-full flex items-center justify-center max-h-[300px] sm:max-h-[400px]">
                                        <Image
                                            src={HERO_IMAGE}
                                            alt="KKW College - Karmaveer Kakasaheb Wagh Education Society"
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-contain scale-100 sm:scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Bottom Info Bar */}
                                <div className="relative z-20 px-4 pb-4 sm:px-6 sm:pb-6 flex flex-wrap items-end justify-between gap-3">
                                    <div className={`glass-panel p-3 sm:p-4 rounded-xl border-l-4 ${activeTheme.border} bg-black/60 backdrop-blur-md`}>
                                        <p className={`text-[10px] sm:text-xs font-mono ${activeTheme.text} mb-1 flex items-center gap-1`}><GraduationCap size={12} /> EXCELLENCE</p>
                                        <p className="font-bold text-white text-base sm:text-lg">KKW CSD Department</p>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-4 text-right">
                                        <div className="text-center">
                                            <p className={`text-lg font-black ${activeTheme.text}`}>8</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Semesters</p>
                                        </div>
                                        <div className="w-px h-8 bg-slate-700"></div>
                                        <div className="text-center">
                                            <p className={`text-lg font-black ${activeTheme.text}`}>{PRACTICALS.length}+</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Labs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute -inset-4 bg-gradient-to-r ${activeTheme.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10`}></div>
                        </TiltCard>
                    </div>

                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('semesters')}>
                        <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                </section>

                {/* Semesters Section */}
                <section id="semesters" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            Academic Archives
                        </h2>
                        <div className={`h-1.5 w-24 bg-gradient-to-r ${activeTheme.gradient} mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]`}></div>
                        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                            Select your semester to access notes, papers, and resources tailored for you.
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-6 spotlight-group">
                        {SEMESTERS.map((sem: Semester, index) => {
                            const theme = getTheme(index);
                            const isActive = activeSem === sem.id;

                            return (
                                <Reveal key={sem.id} delay={index * 100}>
                                    <div className="group transition-all duration-300 ease-out hover:scale-[1.02] hover:-rotate-1 hover:z-20 relative">
                                        <TiltCard
                                            className={`glass-card rounded-2xl overflow-hidden border transition-all duration-500 relative ${isActive ? 'border-transparent ring-2 ring-offset-2 ring-offset-slate-950 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'border-slate-800 hover:border-slate-600'}`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-10' : ''}`}></div>

                                            <button
                                                onClick={() => toggleSem(sem.id)}
                                                className={`relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between text-left transition-all duration-300 ${isActive ? 'bg-slate-900/50' : 'hover:bg-slate-800/40'}`}
                                            >
                                                <div className="flex items-center gap-4 sm:gap-6">
                                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xl sm:text-3xl shadow-lg transition-all duration-300 transform group-hover:rotate-12 ${isActive ? `bg-gradient-to-br ${theme.gradient} text-white scale-110` : 'bg-slate-800 text-slate-500 group-hover:text-white'}`}>
                                                        {sem.id}
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-lg sm:text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                                            {sem.title}
                                                        </h3>
                                                        <p className={`text-xs sm:text-sm font-medium ${isActive ? theme.text : 'text-slate-500'}`}>
                                                            {sem.subjects.length} Modules Available
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-slate-800/50 transition-all duration-500 border border-slate-700 ${isActive ? `rotate-180 bg-gradient-to-br ${theme.gradient} text-white border-transparent` : 'text-slate-500 group-hover:text-white group-hover:border-slate-500'}`}>
                                                    <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6" />
                                                </div>
                                            </button>

                                            {isActive && (
                                                <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 border-t border-white/5 bg-black/20 animate-fade-in-up relative z-10">
                                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                                                        {sem.subjects.map((sub: Subject, idx) => (
                                                            <div key={idx}
                                                                className="p-4 sm:p-5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-400/50 transition-all flex flex-col justify-between group/card hover:bg-slate-800/80 duration-300 shadow-lg relative overflow-hidden"
                                                                style={{ animationDelay: `${idx * 100}ms` }}
                                                            >
                                                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

                                                                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 relative z-10">
                                                                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${theme.gradient} shadow-lg text-white group-hover/card:scale-110 transition-transform flex-shrink-0`}>
                                                                        {getSubjectIcon(sub.name)}
                                                                    </div>
                                                                    <h4 className="font-semibold text-slate-100 text-base sm:text-lg leading-snug group-hover/card:text-white transition-colors">{sub.name}</h4>
                                                                </div>

                                                                <div className="flex flex-col xs:flex-row gap-3 mt-auto relative z-10">
                                                                    {sub.notesLink && sub.notesLink !== '#' ? (
                                                                        <a href={sub.notesLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-600 hover:border-blue-400 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] shadow-sm">
                                                                            <FileText className="w-4 h-4" /> {sub.name === 'Internship' ? 'View Material' : 'Notes'}
                                                                        </a>
                                                                    ) : (
                                                                        <span className="flex-1 flex items-center justify-center gap-2 bg-slate-900/30 text-slate-600 border border-slate-800 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
                                                                            {sub.name === 'Internship' ? 'No Material' : 'No Notes'}
                                                                        </span>
                                                                    )}

                                                                    {sub.name !== 'Internship' && (
                                                                        sub.papersLink && sub.papersLink !== '#' ? (
                                                                            <a href={sub.papersLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-600 hover:border-blue-400 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] shadow-sm">
                                                                                <Download className="w-4 h-4" /> Papers
                                                                            </a>
                                                                        ) : (
                                                                            <span className="flex-1 flex items-center justify-center gap-2 bg-slate-900/30 text-slate-600 border border-slate-800 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed opacity-50">
                                                                                No Papers
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {sem.universityPaperLink && (
                                                        <div className="mt-6 sm:mt-8 flex justify-end">
                                                            <a href={sem.universityPaperLink} target="_blank" rel="noreferrer" className={`group/link inline-flex items-center gap-2 text-xs sm:text-sm font-bold ${theme.text} hover:brightness-125 transition-all bg-white/5 px-5 py-3 rounded-full hover:bg-white/10 border border-white/5 hover:border-white/20 w-full sm:w-auto justify-center`}>
                                                                <span>Access Official University Archives</span>
                                                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </TiltCard>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* Practicals Section */}
                <section id="practicals" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 relative border-y border-white/5">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <Reveal>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
                                        <span className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${activeTheme.gradient} shadow-lg shadow-indigo-500/20`}>
                                            <Code className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </span>
                                        Lab Manuals
                                    </h2>
                                    <p className="text-slate-400 max-w-xl text-base md:text-lg">
                                        Comprehensive practical resources featuring code, outputs, and documentation.
                                    </p>
                                </div>
                                <div className="flex md:block items-center justify-between md:text-right">
                                    <div className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeTheme.gradient}`}>
                                        <AnimatedCounter end={PRACTICALS.length} />+
                                    </div>
                                    <div className={`text-sm font-bold ${activeTheme.text} opacity-80 uppercase tracking-widest`}>Labs Available</div>
                                </div>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 spotlight-group">
                            {PRACTICALS.map((prac, idx) => {
                                const theme = getTheme(idx);
                                return (
                                    <Reveal key={idx} delay={(idx % 4) * 100} className="h-full">
                                        <a href={prac.link} target="_blank" rel="noreferrer" className="block h-full">
                                            <TiltCard className={`group glass-card p-1 rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-lg relative overflow-hidden h-full`}>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                                <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-5 h-full flex items-center gap-4 relative z-10 border border-slate-800 group-hover:border-transparent transition-colors">
                                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                                        <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-2">{prac.name}</h4>
                                                        <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 inline-flex items-center gap-1 ${theme.text} brightness-110`}>
                                                            View Files <ExternalLink size={8} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </TiltCard>
                                        </a>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Feedback Section */}
                <section id="feedback" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Reveal>
                        <TiltCard>
                            <div className="glass-panel rounded-3xl p-1 border border-slate-700/50 relative overflow-hidden group">
                                <div className={`absolute inset-0 bg-gradient-to-r ${activeTheme.gradient} opacity-40 group-hover:opacity-60 transition-opacity blur-xl animate-pulse`}></div>

                                <div className="bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 md:p-12 relative z-10">
                                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                        <div className="flex-1 space-y-6 md:space-y-8">
                                            <div className={`inline-block p-3 md:p-4 rounded-2xl bg-gradient-to-br ${activeTheme.gradient} shadow-xl shadow-purple-500/20 mb-2 transform rotate-3 hover:rotate-6 transition-transform`}>
                                                <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Community Driven</h2>
                                                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                                                    This project thrives on your contributions. Found a bug? Have better notes? Let&apos;s build this together.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 pt-2">
                                                <a href={CONTRIBUTOR.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] transition-all hover:scale-110 border border-slate-700 hover:border-transparent hover:shadow-[0_0_20px_rgba(0,119,181,0.5)]">
                                                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                                                </a>
                                                <a href={REPO_LINK} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black transition-all hover:scale-110 border border-slate-700 hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Submit an Issue / Request</label>
                                                    <textarea
                                                        value={feedbackMsg}
                                                        onChange={(e) => setFeedbackMsg(e.target.value)}
                                                        placeholder="Tell us what's on your mind..."
                                                        className="w-full h-32 md:h-40 bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none placeholder-slate-600 shadow-inner text-sm md:text-base"
                                                    ></textarea>
                                                </div>
                                                <button
                                                    onClick={handleFeedback}
                                                    className={`w-full py-3 md:py-4 bg-gradient-to-r ${activeTheme.gradient} text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 active:scale-95`}
                                                >
                                                    <Send className="w-5 h-5" /> Create GitHub Issue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </Reveal>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <Reveal>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient}`}>
                                        Empowering CSD Students
                                    </span>
                                </h2>
                                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                                    The KKW CSD Hub is more than just a repository; it&apos;s a collaborative ecosystem designed to streamline your academic journey.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Users, title: 'Community First', desc: 'Built by students, for students. We understand the curriculum challenges and curate resources that actually matter.', color: 'blue' },
                                { icon: Globe, title: 'Open Source', desc: 'Completely transparent and open. Contribute your own notes, fix issues, and help the repository grow on GitHub.', color: 'purple' },
                                { icon: Zap, title: 'Always Updated', desc: 'Regular updates ensure you have access to the latest syllabus changes, question patterns, and practical definitions.', color: 'pink' },
                            ].map((card, idx) => (
                                <Reveal key={idx} delay={(idx + 1) * 100}>
                                    <TiltCard className="h-full">
                                        <div className="h-full glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                                            <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                            <div className={`w-14 h-14 rounded-2xl bg-${card.color}-500/20 flex items-center justify-center mb-6 text-${card.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                                <card.icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                            <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                                        </div>
                                    </TiltCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 mt-20 border-t border-white/5 bg-[#020617] pt-16 pb-8 overflow-hidden">
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50`}></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-4 text-center md:text-left">
                                <div className="inline-flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
                                    <div className="relative p-1 rounded-xl bg-slate-950 border border-white/10 group-hover:border-blue-500/50 transition-colors shadow-lg overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        <Image
                                            src={LOGO_URL}
                                            alt="KKW Logo"
                                            width={24}
                                            height={24}
                                            className="rounded relative z-10 brightness-[2] mix-blend-screen"
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">KKW CSD Hub</span>
                                        <span className="block text-xs text-slate-500 font-medium">© {new Date().getFullYear()} Open Source Community</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
                                    A collaborative initiative to streamline resources for Computer Science & Design students.
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-end space-y-6">
                                <div className="flex gap-4">
                                    {[
                                        { icon: Github, href: CONTRIBUTOR.github, label: "GitHub" },
                                        { icon: Linkedin, href: CONTRIBUTOR.linkedin, label: "LinkedIn" }
                                    ].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-3 rounded-full bg-slate-900 border border-white/5 hover:border-blue-500/30 text-slate-400 hover:text-white hover:bg-blue-600/10 transition-all duration-300 hover:scale-110 group"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                        </a>
                                    ))}
                                </div>

                                <div className="glass-panel px-5 py-3 rounded-full border border-white/5 bg-slate-900/50 backdrop-blur-sm hover:border-white/10 transition-colors">
                                    <p className="text-sm text-slate-400 flex items-center gap-1.5">
                                        Crafted with
                                        <span className="relative inline-flex items-center justify-center">
                                            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                                            <span className="absolute inset-0 bg-rose-500 blur-md opacity-40 animate-pulse"></span>
                                        </span>
                                        by
                                        <a
                                            href={CONTRIBUTOR.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${activeTheme.gradient} hover:brightness-125 transition-all hover:tracking-wide`}
                                        >
                                            {CONTRIBUTOR.name}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </main>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 right-6 z-50 p-3 rounded-xl glass-panel border border-white/20 text-white transition-all duration-500 shadow-2xl ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    } hover:scale-110 active:scale-90 hover:bg-blue-600/20 cursor-pointer`}
            >
                <ChevronDown className="w-6 h-6 rotate-180" />
            </button>
        </div>
    );
}
