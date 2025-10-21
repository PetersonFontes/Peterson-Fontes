import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProposalForm from './components/ProposalForm';
import ProspectingAssistant from './components/ProspectingAssistant';
import ProposalView from './components/ProposalView';
import DashboardView from './components/DashboardView';
import Login from './components/Login';
import Register from './components/Register';
import { generateProposals } from './services/geminiService';
import type { BriefingData } from './types';
import ProspectingDashboard from './components/ProspectingDashboard';
import IntegrationsView from './components/IntegrationsView';
import ClientsView from './components/ClientsView';
import ReportsView from './components/ReportsView';


declare global {
    interface Window {
        marked: {
            parse: (markdown: string) => string;
        };
    }
}

type View = 'dashboard' | 'clients' | 'prospectingDashboard' | 'proposal' | 'reports' | 'prospecting' | 'integrations';
type Screen = 'login' | 'register' | 'app';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('login');
    const [view, setView] = useState<View>('dashboard');
    const [isGenerating, setIsGenerating] = useState(false);
    const [proposals, setProposals] = useState<string[]>([]);
    const [briefingData, setBriefingData] = useState<BriefingData | null>(null);
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) || 'light'
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleGenerateProposals = async (data: BriefingData) => {
        setIsGenerating(true);
        setBriefingData(data);
        setProposals([]);
        try {
            const result = await generateProposals(data);
            const parsedHtmlProposals = result
                .split('---NEXT PROPOSAL---')
                .map(p => window.marked.parse(p.trim()));
            setProposals(parsedHtmlProposals);
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleBackToForm = () => {
        setProposals([]);
        setBriefingData(null);
    };

    const handleNavigate = (newView: View) => {
        setView(newView);
        if (newView !== 'proposal') {
            handleBackToForm();
        }
        setIsSidebarOpen(false); // Close sidebar on navigation
    };

    const handleLoginSuccess = () => {
        setScreen('app');
    };

    const handleLogout = () => {
        setScreen('login');
        setView('dashboard');
        setProposals([]);
        setBriefingData(null);
    };

    const handleNavigateToRegister = () => {
        setScreen('register');
    };
    
    const handleNavigateToLogin = () => {
        setScreen('login');
    };

    if (screen === 'login') {
        return <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={handleNavigateToRegister} />;
    }
    
    if (screen === 'register') {
        return <Register onNavigateToLogin={handleNavigateToLogin} />;
    }

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
                return <DashboardView onNavigate={handleNavigate} />;
            case 'clients':
                return <ClientsView />;
            case 'prospecting':
                return <ProspectingAssistant />;
            case 'prospectingDashboard':
                return <ProspectingDashboard />;
            case 'reports':
                return <ReportsView />;
            case 'integrations':
                return <IntegrationsView />;
            case 'proposal':
                if (proposals.length > 0 && briefingData) {
                    return <ProposalView companyName={briefingData.companyName} proposals={proposals} onBack={handleBackToForm} />;
                }
                return <ProposalForm isGenerating={isGenerating} onGenerate={handleGenerateProposals} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans overflow-hidden">
            <Sidebar 
                activeView={view} 
                onNavigate={handleNavigate} 
                onLogout={handleLogout} 
                onToggleTheme={handleToggleTheme}
                theme={theme}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between mb-6 flex-shrink-0">
                    <img src="https://storage.googleapis.com/static.proti.app/a87f1772-23b0-45a8-822-297a38a34b22/image_c21dfa.png" alt="Logo SCC SBT" className="h-8 dark:invert-[.85]" />
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-label="Abrir menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </header>
                <div className="flex-grow">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default App;
