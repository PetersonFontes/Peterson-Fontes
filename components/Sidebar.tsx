import React from 'react';

type View = 'dashboard' | 'clients' | 'prospectingDashboard' | 'proposal' | 'reports' | 'prospecting' | 'integrations';

type Theme = 'light' | 'dark';

interface SidebarProps {
    activeView: View;
    onNavigate: (view: View) => void;
    onLogout: () => void;
    onToggleTheme: () => void;
    theme: Theme;
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onLogout, onToggleTheme, theme, isOpen, onClose }) => {
    const baseClasses = "w-full text-left px-3 py-2.5 rounded-md transition-colors duration-200 flex items-center gap-3 text-sm font-medium";
    const activeClasses = "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
    const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white";

    const navItems = [
        { view: 'dashboard' as View, label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { view: 'clients' as View, label: 'Clientes', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
        { view: 'prospectingDashboard' as View, label: 'Prospecção (IA)', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
        { view: 'proposal' as View, label: 'Propostas (IA)', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { view: 'reports' as View, label: 'Metas e Relatórios', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    ];

    const isActive = (view: View) => {
        if (view === 'prospectingDashboard') {
            return activeView === 'prospecting' || activeView === 'prospectingDashboard';
        }
        return activeView === view;
    }

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 p-4 flex flex-col flex-shrink-0 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="flex justify-between items-center mb-8 pl-2">
                    <img src="https://storage.googleapis.com/static.proti.app/a87f1772-23b0-45a8-822-297a38a34b22/image_c21dfa.png" alt="Logo SCC SBT" className="h-10 dark:invert-[.85]" />
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 -mr-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-label="Fechar menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='flex-grow overflow-y-auto'>
                    <nav className="flex flex-col gap-y-2">
                       {navItems.map(item => (
                           <button
                               key={item.view}
                               onClick={() => onNavigate(item.view)}
                               className={`${baseClasses} ${isActive(item.view) ? activeClasses : inactiveClasses}`}
                           >
                               {item.icon}
                               <span>{item.label}</span>
                           </button>
                       ))}
                    </nav>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2 flex-shrink-0">
                     <button 
                        onClick={() => onNavigate('integrations')}
                        className={`${baseClasses} ${activeView === 'integrations' ? activeClasses : inactiveClasses}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                        <span>Integrações</span>
                    </button>
                    <button
                        onClick={onToggleTheme}
                        className={`${baseClasses} ${inactiveClasses} justify-between`}
                        aria-label={`Mudar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
                    >
                        <div className="flex items-center gap-3">
                            {theme === 'light' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            )}
                            <span>Tema</span>
                        </div>
                        <div className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 dark:bg-gray-700">
                            <span className={`inline-block w-4 h-4 transform bg-white dark:bg-gray-800 rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </div>
                    </button>
                    <button
                        onClick={onLogout}
                        className={`${baseClasses} ${inactiveClasses}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
