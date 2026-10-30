export interface TimelineItem {
    type: 'work' | 'education',
    title: string,
    place: string,
    shortPlace?: string,
    start: string,
    end?: string,
    current?: boolean,
    summary?: string,
    stack: string[]
}
