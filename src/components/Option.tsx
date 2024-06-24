import type { MouseEventHandler, ReactNode } from "react";
import IcCheck from "../assets/CheckRoundFill.svg?react";
import IcClose from "../assets/CloseRoundFill.svg?react";
import Button from "./Button";

interface IGridProps {
    children: ReactNode;
}
function Grid({ children }: IGridProps) {
    return (
        <div className="grid w-2/3 grid-cols-2 mt-8 mb-6 gap-7">{children}</div>
    );
}

interface IItemProps {
    children: ReactNode;
    status?: "correct" | "incorrect" | "";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isClicked?: boolean;
    disabled?: boolean;
}
function Item({
    children,
    status = "",
    onClick = () => {},
    isClicked = false,
    disabled = false,
}: IItemProps) {
    return (
        <Button
            className={isClicked ? "bg-accent-gradient" : ""}
            onClick={onClick}
            disabled={disabled}
        >
            <span>{children}</span>
            {status === "correct" ? (
                <IcCheck />
            ) : status === "incorrect" ? (
                <IcClose />
            ) : (
                ""
            )}
        </Button>
    );
}

export default {
    Grid,
    Item,
};
