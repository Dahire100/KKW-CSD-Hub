/// <reference path="../node_modules/lucide-react/dist/lucide-react.d.ts" />

// Fix for IDE TypeScript server not resolving lucide-react types
// with moduleResolution: "bundler" when the package uses "typings"
// instead of "types" and has no "exports" map.
declare module 'lucide-react' {
    import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

    type IconNode = [
        elementName: keyof SVGElementTagNameMap,
        attrs: Record<string, string>,
    ][];

    interface LucideProps extends Partial<SVGProps<SVGSVGElement>> {
        size?: string | number;
        absoluteStrokeWidth?: boolean;
        color?: string;
        strokeWidth?: string | number;
    }

    type LucideIcon = ForwardRefExoticComponent<
        LucideProps & RefAttributes<SVGSVGElement>
    >;

    // All commonly used icons
    export const BookOpen: LucideIcon;
    export const FileText: LucideIcon;
    export const Download: LucideIcon;
    export const Github: LucideIcon;
    export const Linkedin: LucideIcon;
    export const ExternalLink: LucideIcon;
    export const ChevronDown: LucideIcon;
    export const Menu: LucideIcon;
    export const X: LucideIcon;
    export const MessageSquare: LucideIcon;
    export const Send: LucideIcon;
    export const Code: LucideIcon;
    export const Terminal: LucideIcon;
    export const GraduationCap: LucideIcon;
    export const Users: LucideIcon;
    export const Globe: LucideIcon;
    export const Zap: LucideIcon;
    export const Heart: LucideIcon;
    export const Search: LucideIcon;
    export const UploadCloud: LucideIcon;
    export const Palette: LucideIcon;
    export const Calculator: LucideIcon;
    export const Atom: LucideIcon;
    export const Beaker: LucideIcon;
    export const Binary: LucideIcon;
    export const Brain: LucideIcon;
    export const Gamepad2: LucideIcon;
    export const Cloud: LucideIcon;
    export const Server: LucideIcon;
    export const Shield: LucideIcon;
    export const Briefcase: LucideIcon;
    export const Smartphone: LucideIcon;
    export const Monitor: LucideIcon;
    export const Cpu: LucideIcon;
    export const Database: LucideIcon;
    export const Mail: LucideIcon;
    export const Link: LucideIcon;
    export const GitPullRequest: LucideIcon;
}
