import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import { generateProspectingReport } from '../services/geminiService';
import SectionHeader from './SectionHeader';
import ChatMessage from './ChatMessage';

declare global {
    interface Window {
        marked: {
            parse: (markdown: string) => string;
        };
    }
}

const ProspectingAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([
        { id: 0, sender: 'ai', htmlContent: 'Olá! Sou seu Agente de Prospecção. Digite o nome de uma empresa para eu gerar um relatório de inteligência de mercado e te ajudar a preparar a visita.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userInput = input.trim();
        if (!userInput || isLoading) return;

        const newUserMessage: ChatMessageType = {
            id: Date.now(),
            sender: 'user',
            htmlContent: userInput,
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        const loadingAiMessage: ChatMessageType = {
            id: Date.now() + 1,
            sender: 'ai',
            htmlContent: '<div class="flex justify-center items-center p-2"><div class="loader"></div></div>'
        };
        setMessages(prev => [...prev, loadingAiMessage]);

        try {
            // Fix: Handle the new response structure containing text and groundingChunks.
            const { text, groundingChunks } = await generateProspectingReport(userInput);
            let finalHtml = window.marked.parse(text);

            if (groundingChunks && groundingChunks.length > 0) {
                const sourcesList = groundingChunks
                    .map(chunk => {
                        if (chunk.web && chunk.web.uri) {
                            const title = chunk.web.title || chunk.web.uri;
                            return `<li><a href="${chunk.web.uri}" target="_blank" rel="noopener noreferrer">${title}</a></li>`;
                        }
                        return null;
                    })
                    .filter(Boolean)
                    .join('');
                
                if (sourcesList) {
                    finalHtml += `
                        <div class="mt-4 pt-2 border-t border-gray-200 dark:border-gray-600">
                            <h4 class="font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">Fontes da Web:</h4>
                            <ul class="list-disc list-inside space-y-1 text-sm">${sourcesList}</ul>
                        </div>
                    `;
                }
            }

            setMessages(prev => prev.map(msg => msg.id === loadingAiMessage.id ? { ...msg, htmlContent: finalHtml } : msg));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Desculpe, não consegui realizar a análise. Tente novamente.";
            setMessages(prev => prev.map(msg => msg.id === loadingAiMessage.id ? { ...msg, htmlContent: errorMessage } : msg));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl h-[85vh] mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <header className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Assistente de Prospecção</h1>
                <p className="text-md text-gray-600 dark:text-gray-400 mt-2">Use a IA para pesquisar clientes e preparar suas visitas comerciais.</p>
            </header>
            <div className="flex flex-col flex-grow h-full overflow-hidden">
                <div ref={chatHistoryRef} className="flex-grow overflow-y-auto pr-4 -mr-4 mb-4 flex flex-col space-y-2">
                   {messages.map(msg => (
                       <ChatMessage key={msg.id} sender={msg.sender} htmlContent={msg.htmlContent} />
                   ))}
                </div>
                <form id="chat-form" onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        className="flex-grow block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 text-gray-900 dark:text-gray-200"
                        placeholder="Digite o nome da empresa..."
                        autoComplete="off"
                    />
                    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProspectingAssistant;