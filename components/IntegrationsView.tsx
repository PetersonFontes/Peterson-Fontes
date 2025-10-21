import React from 'react';
import SectionHeader from './SectionHeader';

const integrations = [
    {
        name: 'OpenAI API (GPT-4/5)',
        category: 'Inteligência Artificial',
        description: 'O motor por trás da geração de propostas e análises de prospecção, garantindo respostas inteligentes e contextualizadas.',
        status: 'Ativo' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
        color: 'bg-green-500',
        action: null,
    },
    {
        name: 'Firebase Auth',
        category: 'Autenticação e Segurança',
        description: 'Gerencia o login, cadastro e controle de acesso dos usuários, garantindo que cada um acesse apenas os dados de sua região.',
        status: 'Ativo' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        color: 'bg-yellow-500',
        action: null,
    },
    {
        name: 'Google Sheets / Excel',
        category: 'Importação de Dados',
        description: 'Permite a importação e atualização da tabela de mídia, mantendo os preços e descontos sempre sincronizados com o comercial.',
        status: 'Disponível' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H3a2 2 0 00-2 2v4a2 2 0 002 2h2a4 4 0 004-4zm0 0v-2a4 4 0 014-4h2a4 4 0 014 4v2m-6 4h6m-6-4a4 4 0 014-4h2a4 4 0 014 4v2m-6 4h6m-6-4h6" /></svg>,
        color: 'bg-blue-500',
        action: { text: 'Importar Planilha', disabled: false },
    },
     {
        name: 'Importação de PDF (Media Kit)',
        category: 'Documentos',
        description: 'Faça upload de documentos de apoio, como media kits ou apresentações de clientes, para enriquecer suas propostas.',
        status: 'Em Breve' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
        color: 'bg-gray-400',
        action: { text: 'Importar PDF', disabled: true },
    },
    {
        name: 'Power BI / Metabase',
        category: 'Business Intelligence',
        description: 'Conexão para dashboards executivos e relatórios avançados, permitindo uma visão consolidada da performance de todas as praças.',
        status: 'Em Breve' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        color: 'bg-gray-400',
        action: { text: 'Conectar ao BI', disabled: true },
    }
];

const StatusBadge: React.FC<{ status: 'Ativo' | 'Em Breve' | 'Disponível' }> = ({ status }) => {
    const classes = {
        'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'Em Breve': 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        'Disponível': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
    }[status];
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold leading-tight rounded-full ${classes}`}>
            {status}
        </span>
    );
};

const IntegrationsView: React.FC = () => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Integrações da Plataforma</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Conheça o ecossistema tecnológico que potencializa nossa ferramenta.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {integrations.map(integration => (
                    <div key={integration.name} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
                        <div className="p-6 flex items-start gap-5">
                            <div className={`flex-shrink-0 w-16 h-16 rounded-lg ${integration.color} flex items-center justify-center`}>
                                {integration.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{integration.name}</h3>
                                    <StatusBadge status={integration.status} />
                                </div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">{integration.category}</p>
                            </div>
                        </div>
                        <div className="flex-grow px-6 pb-6 pt-2 flex flex-col justify-between">
                           <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{integration.description}</p>
                           {integration.action && (
                                <button
                                    disabled={integration.action.disabled}
                                    className="mt-auto w-full text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    {integration.action.text}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntegrationsView;