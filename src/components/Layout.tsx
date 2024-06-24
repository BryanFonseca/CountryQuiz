import type { ReactNode } from "react";

interface ILayoutProps {
    children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
    return (
        <main className="flex items-center justify-center w-screen h-screen text-white bg-cover bg-stripped">
            {children}
        </main>
    );
}

export default Layout;
