export interface Subject {
    name: string;
    notesUrl?: string;
    papersUrl?: string;
    notesLink?: string;
    papersLink?: string;
}

export interface Semester {
    id: number;
    title: string;
    subjects: Subject[];
    universityPaperLink?: string;
}

export interface Practical {
    name?: string;
    title?: string;
    subject?: string;
    code?: string;
    sem?: number;
    description?: string;
    url?: string;
    link?: string;
}

export interface Contributor {
    name: string;
    role?: string;
    avatar?: string;
    github?: string;
    linkedin?: string;
}

export interface Theme {
    name: string;
    primaryHex: string;
    secondaryHex: string;
    gradient: string;
    border: string;
    bgHover: string;
    text: string;
    badge: string;
    glow: string;
}