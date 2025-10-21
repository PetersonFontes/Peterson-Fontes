import React, { useState } from 'react';

interface RegisterProps {
    onNavigateToLogin: () => void;
}

const regions = [
    'Florianópolis',
    'Criciúma',
    'Chapecó',
    'Blumenau',
    'Joinville'
];

const Register: React.FC<RegisterProps> = ({ onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        region: regions[0],
        matricula: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration logic
        alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
        onNavigateToLogin();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center py-12 px-4">
            <div className="w-full max-w-md">
                <img src="https://storage.googleapis.com/static.proti.app/a87f1772-23b0-45a8-822-297a38a34b22/image_c21dfa.png" alt="Logo SCC SBT" className="h-12 mx-auto mb-8 dark:invert-[.85]" />
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-1">Crie sua Conta</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Comece a usar a plataforma de vendas.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                            <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required />
                        </div>
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Região</label>
                            <select id="region" value={formData.region} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required>
                                {regions.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Matrícula</label>
                            <input type="text" id="matricula" value={formData.matricula} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                            <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200" required />
                        </div>
                        <button type="submit" className="w-full flex justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                            Cadastrar
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Já tem uma conta?{' '}
                        <button onClick={onNavigateToLogin} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Faça o login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;