export interface StackItem {
    name: string,
    aliases: string[]
}

export interface StackGroup {
    title: string,
    items: StackItem[]
}
