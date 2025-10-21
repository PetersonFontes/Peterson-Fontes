import React from 'react';

interface ProposalViewProps {
    companyName: string;
    proposals: string[];
    onBack: () => void;
}

const ProposalView: React.FC<ProposalViewProps> = ({ companyName, proposals, onBack }) => {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <header className="text-center mb-8 border-b dark:border-gray-800 pb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Propostas Estratégicas</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Para: <span className="font-semibold text-gray-800 dark:text-gray-200">{companyName}</span></p>
            </header>

            <div className="space-y-10">
                {proposals.map((proposalHtml, index) => (
                    <section key={index} className="proposal-section bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: proposalHtml }}
                        />
                    </section>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button
                    onClick={onBack}
                    className="bg-gray-800 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                >
                    &larr; Voltar e Editar Briefing
                </button>
            </div>
        </div>
    );
};

export default ProposalView;