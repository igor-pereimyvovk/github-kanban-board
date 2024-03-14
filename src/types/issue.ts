export type Issue = {
    id: number;
    body: string | null;
    title: string | null;
    comments: number;
    user: { login: string };
    created_at: string;
    closed_at: string | null;
    state?: "toDo" | "inProgress" | "done";
};
