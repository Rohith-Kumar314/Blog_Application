export interface ILoginForm{
    email:string,
    password:string
}

export interface IRegisterForm {
    username: string;
    password: string;
    email: string;
    role: "User" | "AUTHOR";
}

export interface IRegisterRequest{
    
}

export interface IRegisterResponse{

}