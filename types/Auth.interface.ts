export interface ValidateSession {
    status:  string;
    message: string;
    user:    User;
}

export interface User {
    id:        number;
    email:     string;
    username:  string;
    role:      string;
    createdAt: Date;
}
