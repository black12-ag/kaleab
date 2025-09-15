// Discord Webhook Service for Contact Form Messages
// Sends contact form submissions to a Discord channel

interface DiscordMessage {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
}

class DiscordService {
  private webhookUrl: string;
  
  constructor() {
    // Get this from Discord Server Settings > Integrations > Webhooks
    this.webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL || '';
  }

  private formatDiscordEmbed(data: DiscordMessage) {
    const currentDate = new Date().toISOString();
    
    const embed = {
      title: "🌟 New Project Inquiry",
      color: 0x5865f2, // Discord blue
      timestamp: currentDate,
      fields: [
        {
          name: "👤 Client Information",
          value: `**Name:** ${data.name}\n**Email:** ${data.email}`,
          inline: false
        },
        {
          name: "📝 Project Message",
          value: data.message.substring(0, 1000) + (data.message.length > 1000 ? '...' : ''),
          inline: false
        }
      ],
      footer: {
        text: "Sent from Portfolio Website"
      }
    };

    // Add project type if provided
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
      
      embed.fields.push({
        name: "💼 Project Type",
        value: projectTypeMap[data.projectType] || data.projectType,
        inline: true
      });
    }

    // Add budget if provided
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
      
      embed.fields.push({
        name: "💵 Budget Range",
        value: budgetMap[data.budget] || data.budget,
        inline: true
      });
    }

    return {
      username: "Portfolio Bot",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      embeds: [embed]
    };
  }

  async sendMessage(messageData: DiscordMessage): Promise<boolean> {
    if (!this.webhookUrl) {
      console.warn('Discord webhook not configured - using fallback storage');
      this.storeFallbackMessage(messageData);
      return false;
    }

    try {
      const discordPayload = this.formatDiscordEmbed(messageData);
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
      });

      if (response.ok) {
        console.log('✅ Message sent to Discord successfully');
        return true;
      } else {
        console.error('❌ Discord webhook error:', response.status);
        this.storeFallbackMessage(messageData);
        return false;
      }
    } catch (error) {
      console.error('❌ Failed to send Discord message:', error);
      this.storeFallbackMessage(messageData);
      return false;
    }
  }

  private storeFallbackMessage(data: DiscordMessage): void {
    const fallbackMessages = JSON.parse(localStorage.getItem('discord_fallback') || '[]');
    fallbackMessages.push({
      id: Date.now().toString(),
      data,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('discord_fallback', JSON.stringify(fallbackMessages));
    console.log('📧 Message stored for manual processing');
  }

  getFallbackMessages(): any[] {
    return JSON.parse(localStorage.getItem('discord_fallback') || '[]');
  }

  clearFallbackMessages(): void {
    localStorage.removeItem('discord_fallback');
  }
}

export default new DiscordService();