import { MouseEventHandler, ReactNode } from "react";

interface IListProps {
    children: ReactNode;
}
function List({ children }: IListProps) {
    return <div className="flex flex-wrap gap-4 mt-4">{children}</div>;
}

interface IItemProps {
    children: ReactNode;
    isCurrent?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Item({ children, isCurrent = false, onClick = () => {} }: IItemProps) {
    return (
        <button
            className={`text-base rounded-full size-11 ${
                isCurrent ? "bg-accent-gradient" : "bg-dark-blue"
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default {
    Item,
    List,
};
