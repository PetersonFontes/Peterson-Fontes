import React from 'react';

const reportCards = [
    {
        title: 'Relatório de Faturamento Mensal',
        description: 'Análise detalhada do faturamento por cliente, região e tipo de mídia.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
        actionText: 'Visualizar Relatório',
    },
    {
        title: 'Performance por Vendedor',
        description: 'Compare o desempenho da equipe de vendas com base em metas, propostas e conversões.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        actionText: 'Analisar Equipe',
    },
    {
        title: 'Análise de Descontos Aplicados',
        description: 'Visualize a média de descontos por tipo de cliente e campanha para otimizar a rentabilidade.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5z" /></svg>,
        actionText: 'Verificar Descontos',
    },
    {
        title: 'Programas Mais Vendidos',
        description: 'Identifique os programas Top, Médio e Baixo desempenho em vendas de mídia.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        actionText: 'Analisar Grade',
    }
];

const ReportsView: React.FC = () => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Metas e Relatórios</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Acesse análises detalhadas para embasar suas decisões estratégicas.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reportCards.map(card => (
                     <div key={card.title} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
                        <div className="flex items-center gap-4 mb-3">
                           <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 p-3 rounded-lg">
                                {card.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3>
                        </div>
                        <p className="flex-grow text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{card.description}</p>
                         <button
                            disabled
                            className="mt-auto w-full text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            {card.actionText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsView;