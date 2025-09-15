// Telegram Bot Service for Contact Form Messages
// This sends contact form submissions directly to your Telegram

interface TelegramMessage {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
}

class TelegramService {
  private botToken: string;
  private chatId: string;
  
  constructor() {
    // Get these from @BotFather on Telegram
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
    this.chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
    
    // Debug logging
    console.log('🤖 Telegram Service Initialized:');
    console.log('   Bot Token:', this.botToken ? `${this.botToken.substring(0, 10)}...` : 'NOT SET');
    console.log('   Chat ID:', this.chatId || 'NOT SET');
  }

  private formatMessage(data: TelegramMessage): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let message = `🌟 *NEW PROJECT INQUIRY* 🌟\n\n`;
    message += `📅 *Date:* ${currentDate}\n`;
    message += `👤 *Name:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;
    
    if (data.projectType) {
      const projectTypeMap: { [key: string]: string } = {
        'web-application': '🌐 Web Application',
        'mobile-app': '📱 Mobile App', 
        'ecommerce-platform': '🛒 E-commerce Platform',
        'booking-system': '📅 Booking System',
        'dashboard-admin': '📊 Dashboard/Admin Panel',
        'api-development': '🔗 API Development',
        'enterprise-solution': '🏢 Enterprise Solution',
        'ui-ux-design': '🎨 UI/UX Design',
        'consulting': '💡 Technical Consulting',
        'other': '⚙️ Other/Custom Project'
      };
      message += `💼 *Project Type:* ${projectTypeMap[data.projectType] || data.projectType}\n`;
    }
    
    if (data.budget) {
      const budgetMap: { [key: string]: string } = {
        'under-5k': '💰 Under $5,000',
        '5k-10k': '💰 $5,000 - $10,000',
        '10k-25k': '💰 $10,000 - $25,000',
        '25k-50k': '💰 $25,000 - $50,000',
        '50k-plus': '💰 $50,000+',
        'hourly-rate': '⏰ Hourly Rate',
        'lets-discuss': '💬 Let\'s Discuss'
      };
      message += `💵 *Budget:* ${budgetMap[data.budget] || data.budget}\n`;
    }
    
    message += `\n📝 *Message:*\n${data.message}\n\n`;
    message += `---\n`;
    message += `✅ Sent from Portfolio Website`;
    
    return message;
  }

  async sendMessage(messageData: TelegramMessage): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.warn('Telegram bot not configured - using fallback storage');
      this.storeFallbackMessage(messageData);
      return false;
    }

    try {
      const telegramMessage = this.formatMessage(messageData);
      
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: telegramMessage,
          parse_mode: 'Markdown'
        })
      });

      const result = await response.json();
      
      if (result.ok) {
        console.log('✅ Message sent to Telegram successfully');
        return true;
      } else {
        console.error('❌ Telegram API error:', result);
        this.storeFallbackMessage(messageData);
        return false;
      }
    } catch (error) {
      console.error('❌ Failed to send Telegram message:', error);
      this.storeFallbackMessage(messageData);
      return false;
    }
  }

  private storeFallbackMessage(data: TelegramMessage): void {
    const fallbackMessages = JSON.parse(localStorage.getItem('telegram_fallback') || '[]');
    fallbackMessages.push({
      id: Date.now().toString(),
      data,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('telegram_fallback', JSON.stringify(fallbackMessages));
    console.log('📧 Message stored for manual processing');
  }

  // For admin panel - retrieve fallback messages
  getFallbackMessages(): any[] {
    return JSON.parse(localStorage.getItem('telegram_fallback') || '[]');
  }

  // Clear processed fallback messages
  clearFallbackMessages(): void {
    localStorage.removeItem('telegram_fallback');
  }
}

export default new TelegramService();