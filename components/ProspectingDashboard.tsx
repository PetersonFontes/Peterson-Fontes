import React from 'react';
import SectionHeader from './SectionHeader';

// --- Initial Data ---
const kpiData = [
    { title: 'Relatórios Gerados (Mês)', value: '0' },
    { title: 'Leads Mapeados', value: '0' },
    { title: 'Taxa de Oportunidade', value: '0%' },
    { title: 'Visitas Agendadas', value: '0' }
];

const recentReports: { company: string, date: string, status: 'Oportunidade' | 'Contato Inicial' | 'Mapeado' }[] = [];

const funnelData = [
    { stage: 'Mapeados', count: 0, color: 'bg-blue-500' },
    { stage: 'Contato Inicial', count: 0, color: 'bg-indigo-500' },
    { stage: 'Oportunidades', count: 0, color: 'bg-purple-500' },
    { stage: 'Visitas Agendadas', count: 0, color: 'bg-pink-500' },
];

// --- Internal Components ---

const KpiCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
);

const StatusBadge: React.FC<{ status: typeof recentReports[0]['status'] }> = ({ status }) => {
    const statusClasses = {
        'Oportunidade': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'Contato Inicial': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'Mapeado': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold leading-tight rounded-full ${statusClasses[status]}`}>{status}</span>;
}

// --- Main Dashboard Component ---

const ProspectingDashboard: React.FC = () => {
    const maxFunnelCount = Math.max(...funnelData.map(item => item.count), 1);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Painel de Prospecção</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Analise suas atividades e identifique novas oportunidades.</p>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {kpiData.map(item => <KpiCard key={item.title} {...item} />)}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Recent Reports */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <SectionHeader title="Últimos Relatórios de Prospecção" />
                    <div className="flow-root">
                       {recentReports.length > 0 ? (
                            <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                                {recentReports.map(report => (
                                    <li key={report.company} className="py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-medium text-gray-900 dark:text-white truncate">{report.company}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Analisado em: {report.date}</p>
                                            </div>
                                            <div>
                                                <StatusBadge status={report.status} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400">Nenhum relatório de prospecção gerado.</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500">Use o Assistente de Prospecção para analisar uma empresa.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Prospecting Funnel */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <SectionHeader title="Funil de Prospecção" />
                    <div className="mt-4 space-y-4">
                        {funnelData.map(item => (
                            <div key={item.stage}>
                                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    <span>{item.stage}</span>
                                    <span>{item.count}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${(item.count / maxFunnelCount) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProspectingDashboard;