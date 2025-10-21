import React, { useState } from 'react';

interface LoginProps {
    onLoginSuccess: () => void;
    onNavigateToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic: any non-empty values will log in.
        if (matricula && senha) {
            onLoginSuccess();
        } else {
            alert('Por favor, preencha a matrícula e a senha.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                 <img src="https://storage.googleapis.com/static.proti.app/a87f1772-23b0-45a8-822-297a38a34b22/image_c21dfa.png" alt="Logo SCC SBT" className="h-12 mx-auto mb-8 dark:invert-[.85]" />
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-1">Bem-vindo de volta!</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Acesse seu painel de vendas.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Matrícula</label>
                            <input
                                type="text"
                                id="matricula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Sua matrícula"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Sua senha"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                        >
                            Entrar
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Não tem uma conta?{' '}
                        <button onClick={onNavigateToRegister} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Cadastre-se
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;