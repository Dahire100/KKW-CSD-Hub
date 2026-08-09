export interface Subject {
    name: string;
    notesUrl?: string;
    papersUrl?: string;
    // ... keep existing fields
}


export interface Semester {
    id: number;
    title: string;
    subjects: Subject[];
    universityPaperLink?: string;
}

export interface Practical {
    title: string;
    subject: string;
    url: string;
    // ... keep existing fields (e.g. name, repo, etc.)
}

export interface Contributor {
    name: string;
    github: string;
    linkedin: string;
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
