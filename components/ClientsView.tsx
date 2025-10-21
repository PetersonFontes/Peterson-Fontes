import React from 'react';
import SectionHeader from './SectionHeader';

const mockClients = [
    { id: 1, name: 'Lojas Catarinense', segment: 'Varejo', region: 'Florianópolis', status: 'Ativo' },
    { id: 2, name: 'Supermercados Preço Bom', segment: 'Supermercado', region: 'Joinville', status: 'Ativo' },
    { id: 3, name: 'Construtora Pinheiro', segment: 'Construção Civil', region: 'Criciúma', status: 'Inativo' },
    { id: 4, name: 'Tech Solutions SA', segment: 'Tecnologia', region: 'Blumenau', status: 'Prospect' },
    { id: 5, name: 'Universidade do Vale', segment: 'Educação', region: 'Chapecó', status: 'Ativo' },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusClasses = {
        'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'Inativo': 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        'Prospect': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold leading-tight rounded-full ${statusClasses[status as keyof typeof statusClasses] || statusClasses['Inativo']}`}>{status}</span>;
}

const ClientsView: React.FC = () => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Clientes</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Gerencie sua carteira de clientes e leads.</p>
            </header>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="relative w-full md:w-1/3">
                        <input type="text" placeholder="Buscar cliente..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <button className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        <span>Adicionar Cliente</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nome</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Segmento</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Região</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {mockClients.map((client) => (
                                <tr key={client.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{client.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{client.segment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{client.region}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={client.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientsView;