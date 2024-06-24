import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

function Button({
    variant = "primary",
    className = "",
    children,
    ...rest
}: IButtonProps) {
    return (
        <button
            className={`py-5 px-10 text-md rounded-xl ${
                variant === "primary" ? "bg-dark-blue" : "bg-accent-gradient"
            } hover:enabled:bg-accent-gradient hover:disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            <div className="flex items-center justify-center gap-2">
                {children}
            </div>
        </button>
    );
}

export default Button;
