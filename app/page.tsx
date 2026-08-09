'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { Typewriter, AnimatedCounter, Reveal, Magnetic } from '@/components/InteractiveComponents';
import { SearchModal, ContributeModal } from '@/components/Modals';

export default function HomePage() {
    const [activeSem, setActiveSem] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    const activeTheme = THEMES[currentThemeIndex];

    const [scrollProgress, setScrollProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const tickingRef = useRef(false);

    const cycleTheme = useCallback(() => {
        setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length);
    }, []);

    // 1. Optimized Scroll Listener with requestAnimationFrame
    useEffect(() => {
        const updateScroll = () => {
            const scrollPosition = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((scrollPosition / totalHeight) * 100);
            }
            setShowScrollTop(scrollPosition > 500);
            tickingRef.current = false;
        };

        const onScroll = () => {
            if (!tickingRef.current) {
                window.requestAnimationFrame(updateScroll);
                tickingRef.current = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // 2. Keyboard shortcut for search
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
        setFeedbackSent(true);
        setTimeout(() => setFeedbackSent(false), 3000);
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
                className={`fixed top-0 left-0 h-1 z-[100] transition-all duration-150 bg-gradient-to-r ${activeTheme.gradient}`}
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
                                        className="rounded object-contain mix-blend-screen"
                                        priority
                                    />
                                </div>
                            </div>
                            <span className={`font-bold text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient}`}>
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
                                Updated Academic Hub
                            </div>

                            <Reveal delay={200}>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] mb-8">
                                    <span className="block text-white drop-shadow-2xl typing-cursor min-h-[4.5rem] md:min-h-auto">
                                        <Typewriter text="Computer Science & Design" delay={50} />
                                    </span>
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.gradient} text-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mt-6`}>
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

                        {/* Fixed Static Hero Card (No Cursor Tilt) */}
                        <div className="order-1 md:order-2 relative group w-full">
                            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
                                <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradient} opacity-[0.08]`}></div>

                                <div className="flex items-center justify-center p-6 min-h-[350px] sm:min-h-[450px] relative">
                                    <div className="relative z-10 w-full h-full flex items-center justify-center max-h-[300px] sm:max-h-[400px]">
                                        <Image
                                            src={HERO_IMAGE}
                                            alt="KKW College - Karmaveer Kakasaheb Wagh Education Society"
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-contain scale-100 sm:scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] filter contrast-125 mix-blend-screen"
                                            priority
                                        />
                                    </div>
                                </div>

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
                        </div>
                    </div>

                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-slate-400 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('semesters')}>
                        <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                </section>

                {/* Semesters Section */}
                <section id="semesters" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
                            Academic Archives
                        </h2>
                        <div className={`h-1.5 w-24 bg-gradient-to-r ${activeTheme.gradient} mx-auto rounded-full`}></div>
                        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                            Select your semester to access notes, papers, and resources tailored for you.
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {SEMESTERS.map((sem: Semester, index) => {
                            const theme = getTheme(index);
                            const isActive = activeSem === sem.id;

                            return (
                                <Reveal key={sem.id} delay={index * 100}>
                                    <div className="group transition-all duration-300 ease-out hover:scale-[1.01] relative">
                                        <div
                                            className={`glass-card rounded-2xl overflow-hidden border transition-all duration-500 relative ${isActive ? 'border-transparent ring-2 ring-offset-2 ring-offset-slate-950 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'border-slate-800 hover:border-slate-600'}`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-10' : ''}`}></div>

                                            <button
                                                onClick={() => toggleSem(sem.id)}
                                                className={`relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between text-left transition-all duration-300 ${isActive ? 'bg-slate-900/50' : 'hover:bg-slate-800/40'}`}
                                            >
                                                <div className="flex items-center gap-4 sm:gap-6">
                                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xl sm:text-3xl shadow-lg transition-all duration-300 transform group-hover:rotate-6 ${isActive ? `bg-gradient-to-br ${theme.gradient} text-white scale-110` : 'bg-slate-800 text-slate-500 group-hover:text-white'}`}>
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
                                                        {sem.subjects.map((sub: Subject, idx) => {
                                                            const notesUrl = (sub as any).notesUrl;
                                                            const papersUrl = (sub as any).papersUrl;

                                                            return (
                                                                <div key={idx}
                                                                    className="p-4 sm:p-5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-400/50 transition-all flex flex-col justify-between group/card hover:bg-slate-800/80 duration-300 shadow-lg relative overflow-hidden"
                                                                >
                                                                    <div className="flex items-start justify-between gap-3 mb-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className={`p-2 rounded-lg bg-slate-900 border border-slate-700 ${theme.text}`}>
                                                                                {getSubjectIcon(sub.name)}
                                                                            </div>
                                                                            <h4 className="font-bold text-white text-base sm:text-lg group-hover/card:text-blue-400 transition-colors">
                                                                                {sub.name}
                                                                            </h4>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/40">
                                                                        {notesUrl && (
                                                                            <a
                                                                                href={notesUrl}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-blue-500/20"
                                                                            >
                                                                                <BookOpen className="w-3.5 h-3.5" /> Notes
                                                                            </a>
                                                                        )}
                                                                        {papersUrl && (
                                                                            <a
                                                                                href={papersUrl}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-purple-500/20"
                                                                            >
                                                                                <FileText className="w-3.5 h-3.5" /> Papers
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* Practicals Section */}
                <section id="practicals" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
                            Practical Manuals
                        </h2>
                        <div className={`h-1.5 w-24 bg-gradient-to-r ${activeTheme.gradient} mx-auto rounded-full`}></div>
                        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                            Direct access to lab codes, practical guides, and manual repositories.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {PRACTICALS.map((prac: any, idx) => (
                            <Reveal key={idx} delay={idx * 50}>
                                <div className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-slate-600 transition-all flex flex-col justify-between group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-blue-400">
                                                <Code className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                                                    {prac.title || prac.name}
                                                </h3>
                                                <p className="text-xs text-slate-400">{prac.subject || prac.category}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href={prac.url || prac.link || '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-2 w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                                    >
                                        <span>View Code / Manual</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Feedback Section */}
                <section id="feedback" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                    <div className="glass-panel p-8 md:p-10 rounded-2xl border border-slate-800 text-center space-y-6">
                        <div className="inline-p-3 rounded-2xl bg-blue-500/10 text-blue-400 mx-auto">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-white">Have Feedback or Suggestions?</h2>
                        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                            Help us improve the resource portal. Submit missing notes, report broken links, or request new subjects.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-2">
                            <input
                                type="text"
                                value={feedbackMsg}
                                onChange={(e) => setFeedbackMsg(e.target.value)}
                                placeholder="Describe your suggestion or issue..."
                                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                            />
                            <button
                                onClick={handleFeedback}
                                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${activeTheme.gradient} text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95`}
                            >
                                {feedbackSent ? (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                                <span>{feedbackSent ? 'Sent!' : 'Submit'}</span>
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer id="about" className="border-t border-slate-800 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Image src={LOGO_URL} alt="KKW Logo" width={32} height={32} className="rounded object-contain" />
                        <div>
                            <p className="font-bold text-white">KKW CSD Hub</p>
                            <p className="text-xs text-slate-500">Built for Computer Science & Design Students</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-400">
                        <a href={REPO_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a>
                        <a href={UPLOAD_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Submit Resources</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}