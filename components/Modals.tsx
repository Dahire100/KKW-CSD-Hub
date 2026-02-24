'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
    Search, X, FileText, Download, Code, ExternalLink, UploadCloud,
    GitPullRequest, Github, Mail, Link as LinkIcon,
} from 'lucide-react';
import { SEMESTERS, PRACTICALS, REPO_LINK } from '@/lib/constants';

// --- Search Result Types ---
interface SearchResult {
    type: 'Note' | 'Paper' | 'Lab' | 'Material';
    title: string;
    subtitle: string;
    link: string;
    icon: React.ElementType;
}

// --- Search Modal ---
export const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const results: SearchResult[] = useMemo(() => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();
        const res: SearchResult[] = [];

        SEMESTERS.forEach(sem => {
            sem.subjects.forEach(sub => {
                if (sub.name.toLowerCase().includes(lowerQuery)) {
                    if (sub.notesLink && sub.notesLink !== '#') {
                        res.push({
                            type: sub.name === 'Internship' ? 'Material' : 'Note',
                            title: sub.name,
                            subtitle: `${sem.title} ${sub.name === 'Internship' ? 'Resources' : 'Notes'}`,
                            link: sub.notesLink,
                            icon: FileText
                        });
                    }
                    if (sub.papersLink && sub.papersLink !== '#') {
                        res.push({
                            type: 'Paper',
                            title: sub.name,
                            subtitle: `${sem.title} Question Papers`,
                            link: sub.papersLink,
                            icon: Download
                        });
                    }
                }
            });
        });

        PRACTICALS.forEach(prac => {
            if (prac.name.toLowerCase().includes(lowerQuery)) {
                res.push({
                    type: 'Lab',
                    title: prac.name,
                    subtitle: 'Practical Manual & Codes',
                    link: prac.link,
                    icon: Code
                });
            }
        });

        return res.slice(0, 10);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-10 md:pt-24 px-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-slate-900/90 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col max-h-[80vh]">
                <div className="flex items-center border-b border-slate-800 p-4 bg-slate-900 sticky top-0 z-10">
                    <Search className="w-5 h-5 text-blue-400 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for notes, papers, or labs..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg font-medium"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">ESC</span>
                    </div>
                    <button onClick={onClose} className="md:hidden ml-2"><X className="w-5 h-5 text-slate-400" /></button>
                </div>

                <div className="overflow-y-auto p-2">
                    {query.trim() === '' ? (
                        <div className="py-12 px-6 text-center text-slate-500">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                                <Search className="w-8 h-8 opacity-40" />
                            </div>
                            <p className="text-sm font-medium">Type to search across notes, question papers, and practicals.</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-1">
                            {results.map((res, idx) => (
                                <a
                                    href={res.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={idx}
                                    className="flex items-center p-3 hover:bg-slate-800/80 rounded-xl group transition-all duration-200 border border-transparent hover:border-slate-700"
                                    onClick={onClose}
                                >
                                    <div className={`p-2.5 rounded-lg mr-4 transition-colors ${res.type === 'Lab' ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20' :
                                            res.type === 'Paper' ? 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20' :
                                                'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
                                        }`}>
                                        <res.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-slate-200 font-medium group-hover:text-white transition-colors truncate">{res.title}</h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${res.type === 'Lab' ? 'bg-purple-500' :
                                                    res.type === 'Paper' ? 'bg-orange-500' :
                                                        'bg-blue-500'
                                                }`}></span>
                                            {res.subtitle}
                                        </p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 ml-3 opacity-0 group-hover:opacity-100 transition-all" />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-slate-500">
                            <p>No results found for &quot;<span className="text-slate-300">{query}</span>&quot;</p>
                        </div>
                    )}
                </div>

                {results.length > 0 && (
                    <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-right">
                        <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wide">{results.length} results found</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Contribute Modal ---
export const ContributeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<'files' | 'code'>('files');
    const [subject, setSubject] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, isOpen]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleSubmit = useCallback(() => {
        if (activeTab === 'files') {
            const body = `Hi,\n\nI would like to contribute resources for:\nSubject: ${subject}\n\nLink to resources (Drive/Cloud): ${link}\n\n(Or attach your files to this email)`;
            window.open(`mailto:?subject=Resource Contribution for CSD Hub&body=${encodeURIComponent(body)}`);
        } else {
            const body = `Hi,\n\nI would like to contribute code/practical solutions.\n\nSubject: ${subject}\nLink to Code (GitHub/Gist): ${link}\n\nDescription:`;
            window.open(`${REPO_LINK}/issues/new?title=Code Contribution: ${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
        }
        onClose();
    }, [activeTab, subject, link, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <UploadCloud className="w-6 h-6 text-blue-400" />
                        Contribute Resources
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-800">
                    <button
                        onClick={() => setActiveTab('files')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'files' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                    >
                        Upload Notes / Papers
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'code' ? 'border-purple-500 text-purple-400 bg-purple-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                    >
                        Submit Practical Code
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 bg-slate-800/30">
                    {activeTab === 'files' ? (
                        <div className="space-y-4">
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200 flex items-start gap-3">
                                <UploadCloud className="w-5 h-5 mt-0.5 shrink-0" />
                                <p>To keep this hub high-quality, please share a Google Drive link to your notes or attach them via email.</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-600 transition-all"
                                    placeholder="e.g. Data Structures, AI..."
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Drive Link (Optional)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-600 transition-all"
                                        placeholder="https://drive.google.com/..."
                                        value={link}
                                        onChange={e => setLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-200 flex items-start gap-3">
                                <GitPullRequest className="w-5 h-5 mt-0.5 shrink-0" />
                                <p>We love open source! Share a GitHub Gist or Repo link. We&apos;ll add it to the practicals list.</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Practical / Lab Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-600 transition-all"
                                    placeholder="e.g. Operating Systems Lab 4"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Repo / Gist Link</label>
                                <div className="relative">
                                    <Github className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-600 transition-all"
                                        placeholder="https://github.com/..."
                                        value={link}
                                        onChange={e => setLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        className={`px-5 py-2 rounded-lg text-white font-bold flex items-center gap-2 shadow-lg transition-all transform active:scale-95 ${activeTab === 'files'
                                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                                : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                            }`}
                    >
                        {activeTab === 'files' ? <Mail className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                        {activeTab === 'files' ? 'Send via Email' : 'Submit via GitHub'}
                    </button>
                </div>
            </div>
        </div>
    );
};
