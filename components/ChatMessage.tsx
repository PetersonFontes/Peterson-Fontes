import React from 'react';

interface ChatMessageProps {
    sender: 'user' | 'ai';
    htmlContent: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, htmlContent }) => {
    const baseClasses = 'chat-message max-w-[85%] rounded-xl py-3 px-4 mb-2 leading-relaxed';
    const senderClasses = sender === 'user'
        ? 'bg-indigo-600 text-white self-end rounded-br-lg'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start rounded-bl-lg';

    return (
        <div
            className={`${baseClasses} ${senderClasses} ${sender === 'ai' ? 'prose max-w-none' : ''}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default ChatMessage;