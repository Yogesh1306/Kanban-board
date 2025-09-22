const User = {
    id:String,
    name: String
}

export const Task = {
    id: String,
    title: String,
    desc: String,
    assignedTo: User,
    status: "TODO" | "IN_PROGRESS" | "DONE",
    createdAt: String,
}