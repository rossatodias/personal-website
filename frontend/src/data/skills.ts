// Skill categories for the Skills section

export interface Skill {
    name: string
    level: number // 0–100
    color: string // Tailwind bg class
}

export interface SkillCategory {
    title: string
    icon: string
    skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
    {
        title: 'Linguagens',
        icon: '{ }',
        skills: [
            { name: 'Python', level: 85, color: 'bg-lavender-400' },
            { name: 'C / C++', level: 70, color: 'bg-lavender-400' },
            { name: 'JavaScript / TypeScript', level: 65, color: 'bg-lavender-400' },
            { name: 'MATLAB', level: 40, color: 'bg-lavender-400' },
        ],
    },
    {
        title: 'Sistemas & Redes',
        icon: '⟳',
        skills: [
            { name: 'Linux / Shell', level: 75, color: 'bg-mint-400' },
            { name: 'AWS', level: 65, color: 'bg-mint-400' },
            { name: 'Docker', level: 55, color: 'bg-mint-400' },
            { name: 'PostgreSQL', level: 50, color: 'bg-mint-400' },
        ],
    },
    {
        title: 'Web & Frameworks',
        icon: '</>',
        skills: [
            { name: 'Node.js', level: 80, color: 'bg-peach-400' },
            { name: 'React', level: 70, color: 'bg-peach-400' },
            { name: 'Express', level: 60, color: 'bg-peach-400' },
            { name: 'Tailwind CSS', level: 40, color: 'bg-peach-400' },
        ],
    },
]
