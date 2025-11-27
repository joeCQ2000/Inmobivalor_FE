export interface LoginResponse {
    jwttoken?: string;
    requiresOtp?:boolean;
    message?:string;
}