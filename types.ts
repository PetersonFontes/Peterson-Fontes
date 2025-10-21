
export interface BriefingData {
    companyName: string;
    clientType: 'normal' | 'prefeitura' | 'governo';
    productService: string;
    targetAudience: string;
    estimatedBudget: string;
    mediaType: 'crossmedia' | 'tv' | 'digital';
    campaignStartDate: string;
    campaignEndDate: string;
    briefingText: string;
}

export interface ChatMessage {
    id: number;
    sender: 'user' | 'ai';
    htmlContent: string;
}
