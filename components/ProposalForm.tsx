import React, { useState } from 'react';
import type { BriefingData } from '../types';
import Loader from './Loader';
import SectionHeader from './SectionHeader';

interface ProposalFormProps {
    isGenerating: boolean;
    onGenerate: (data: BriefingData) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ isGenerating, onGenerate }) => {
    const [formData, setFormData] = useState<Omit<BriefingData, 'estimatedBudget'> & { estimatedBudget: number | '' }>({
        companyName: '',
        clientType: 'normal',
        productService: '',
        targetAudience: '',
        estimatedBudget: '',
        mediaType: 'crossmedia',
        campaignStartDate: '',
        campaignEndDate: '',
        briefingText: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit: BriefingData = {
            ...formData,
            estimatedBudget: String(formData.estimatedBudget),
        };
        onGenerate(dataToSubmit);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
             <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Gerador de Propostas Estratégicas</h1>
                <p className="text-md text-gray-600 dark:text-gray-400 mt-2">Preencha o formulário para gerar 3 opções de propostas comerciais.</p>
            </header>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <SectionHeader title="1. Dados do Cliente" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome da Empresa *</label>
                            <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Nome da Empresa" required />
                        </div>
                        <div>
                            <label htmlFor="clientType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Cliente *</label>
                            <select id="clientType" value={formData.clientType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required>
                                <option value="normal">Normal</option>
                                <option value="prefeitura">Prefeitura</option>
                                <option value="governo">Governo</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <SectionHeader title="2. Detalhes da Campanha" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="productService" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Produto/Serviço *</label>
                            <input type="text" id="productService" value={formData.productService} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Ex: Varejo de moda" required />
                        </div>
                        <div>
                            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Público-alvo *</label>
                            <input type="text" id="targetAudience" value={formData.targetAudience} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Ex: Mulheres 25-45 classe B" required />
                        </div>
                        <div>
                            <label htmlFor="estimatedBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Orçamento Estimado *</label>
                            <input type="number" id="estimatedBudget" value={formData.estimatedBudget} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Ex: 10000" required />
                        </div>
                        <div>
                            <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foco de Mídia</label>
                            <select id="mediaType" value={formData.mediaType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200">
                                <option value="crossmedia">TV + Digital (Cross Mídia)</option>
                                <option value="tv">Apenas TV</option>
                                <option value="digital">Apenas Digital</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="campaignStartDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Início da Campanha *</label>
                            <input type="date" id="campaignStartDate" value={formData.campaignStartDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required />
                        </div>
                        <div>
                            <label htmlFor="campaignEndDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fim da Campanha *</label>
                            <input type="date" id="campaignEndDate" value={formData.campaignEndDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required />
                        </div>
                    </div>
                </div>

                <div>
                    <SectionHeader title="3. Briefing Estratégico" />
                    <textarea id="briefingText" rows={6} value={formData.briefingText} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Descreva os objetivos da campanha, mensagem-chave, diferenciais e qualquer outra informação relevante." required></textarea>
                </div>

                <button type="submit" disabled={isGenerating} className="mt-6 w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 text-lg disabled:bg-blue-400 disabled:cursor-not-allowed">
                    {isGenerating ? (
                        <>
                            <span id="button-text">Gerando...</span>
                            <Loader size="sm" />
                        </>
                    ) : (
                        <span>Analisar e Gerar Proposta</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ProposalForm;