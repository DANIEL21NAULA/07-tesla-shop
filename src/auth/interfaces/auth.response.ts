import type { User } from "@/interfaces/user.interface";

//* Login, Register, Check-auth
export interface AuthResponse {
    user:  User;
    token: string;
}