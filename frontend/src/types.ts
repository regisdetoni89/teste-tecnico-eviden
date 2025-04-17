export interface Bookmark {
    id: number;
    title: string;
    url: string;
    remember_date: string;
}

export interface BookmarkFormData {
    title: string;
    url: string;
    remember_date: string;
} 