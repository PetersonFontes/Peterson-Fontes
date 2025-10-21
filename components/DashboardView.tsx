import React from 'react';
import SectionHeader from './SectionHeader';

// Fix: Add 'prospectingDashboard' to the View type to allow navigation.
type View = 'dashboard' | 'proposal' | 'prospecting' | 'prospectingDashboard' | 'clients' | 'reports';

// --- Mock Data ---
const kpiData = [
    { title: 'Propostas Enviadas (Mês)', value: '0', change: '', changeType: 'neutral' as const },
    { title: 'Novos Clientes (Mês)', value: '0', change: '', changeType: 'neutral' as const },
    { title: 'Taxa de Conversão', value: '0%', change: '', changeType: 'neutral' as const },
    { title: 'Faturamento (Mês)', value: 'R$ 0,00', change: '', changeType: 'neutral' as const }
];

const proposalStatusData: { client: string, value: string, status: 'Aprovada' | 'Pendente' | 'Recusada' }[] = [];

const monthlyPerformanceData = [
    { month: 'Jan', value: 0 }, { month: 'Fev', value: 0 }, { month: 'Mar', value: 0 },
    { month: 'Abr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Jun', value: 0 }
];

// --- Internal Components ---

const KpiCard: React.FC<typeof kpiData[0]> = ({ title, value, change, changeType }) => {
    return (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
    );
};

const StatusBadge: React.FC<{ status: typeof proposalStatusData[0]['status'] }> = ({ status }) => {
    const statusClasses = {
        'Aprovada': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'Pendente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'Recusada': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold leading-tight rounded-full ${statusClasses[status]}`}>{status}</span>;
}

const BarChart: React.FC<{ data: { month: string, value: number }[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1); // Avoid division by zero
    const hasData = data.some(d => d.value > 0);

    if (!hasData) {
        return (
             <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">Os dados de performance aparecerão aqui.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex items-end justify-around gap-2 pt-4">
            {data.map(item => (
                <div key={item.month} className="flex-1 flex flex-col items-center">
                    <div 
                        className="w-3/4 bg-blue-100 dark:bg-blue-900/50 rounded-t-md"
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                    ></div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">{item.month}</span>
                </div>
            ))}
        </div>
    )
};


// --- Main Dashboard Component ---

const DashboardView: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Dashboard de Vendas</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Bem-vindo, Executivo! Aqui está o resumo da sua performance.</p>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {kpiData.map(item => <KpiCard key={item.title} {...item} />)}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Proposals and Access */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Proposal Status */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <SectionHeader title="Status das Propostas Recentes" />
                        <div className="flow-root">
                           {proposalStatusData.length > 0 ? (
                               <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                                   {proposalStatusData.map(proposal => (
                                       <li key={proposal.client} className="py-4">
                                           <div className="flex items-center space-x-4">
                                               <div className="flex-1 min-w-0">
                                                   <p className="text-md font-medium text-gray-900 dark:text-white truncate">{proposal.client}</p>
                                                   <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{proposal.value}</p>
                                               </div>
                                               <div>
                                                   <StatusBadge status={proposal.status} />
                                               </div>
                                           </div>
                                       </li>
                                   ))}
                               </ul>
                           ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">Nenhuma proposta enviada ainda.</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500">Gere uma nova proposta para ver os dados aqui.</p>
                                </div>
                           )}
                        </div>
                    </div>
                     {/* Quick Access */}
                     <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <SectionHeader title="Acesso Rápido com IA" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <button onClick={() => onNavigate('proposal')} className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 p-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-left space-y-1">
                                <h4 className="font-bold text-lg">Gerar Nova Proposta</h4>
                                <p className="text-sm text-blue-600 dark:text-blue-300">Use o briefing do cliente para criar 3 ofertas comerciais.</p>
                            </button>
                            <button onClick={() => onNavigate('prospectingDashboard')} className="bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 p-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-left space-y-1">
                                <h4 className="font-bold text-lg">Pesquisar Cliente</h4>
                                <p className="text-sm text-indigo-600 dark:text-indigo-300">Analise o mercado e a concorrência antes da visita.</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Performance */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <SectionHeader title="Performance Mensal" />
                    <div className="mt-4 h-64">
                       <BarChart data={monthlyPerformanceData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;