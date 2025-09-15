// Enhanced Contact Service - Multiple delivery options
import telegramService from './telegramService';
import discordService from './discordService';
import { emailService } from './emailService';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
}

interface ContactOptions {
  enableTelegram: boolean;
  enableDiscord: boolean;
  enableEmail: boolean;
  enableWhatsApp: boolean;
  priority: 'telegram' | 'discord' | 'email' | 'whatsapp';
}

class ContactService {
  private options: ContactOptions;

  constructor() {
    // Configure your preferred contact methods
    this.options = {
      enableTelegram: true,     // RECOMMENDED - Instant notifications
      enableDiscord: false,     // Alternative to Telegram  
      enableEmail: false,       // Traditional but slower
      enableWhatsApp: true,     // Current method (manual)
      priority: 'telegram'      // Primary delivery method
    };
  }

  async submitContactForm(formData: ContactFormData): Promise<{
    success: boolean;
    method: string;
    message: string;
  }> {
    const results: Array<{ method: string; success: boolean }> = [];

    // Try Telegram first (if enabled)
    if (this.options.enableTelegram) {
      try {
        const success = await telegramService.sendMessage(formData);
        results.push({ method: 'Telegram', success });
        if (success) {
          return {
            success: true,
            method: 'Telegram',
            message: '✅ Message sent to Telegram instantly! You will receive a response within 24 hours.'
          };
        }
      } catch (error) {
        // Telegram failed, trying next method
      }
    }

    // Try Discord (if enabled)
    if (this.options.enableDiscord) {
      try {
        const success = await discordService.sendMessage(formData);
        results.push({ method: 'Discord', success });
        if (success) {
          return {
            success: true,
            method: 'Discord',
            message: '✅ Message sent to Discord successfully! You will receive a response within 24 hours.'
          };
        }
      } catch (error) {
        // Discord failed, trying next method
      }
    }

    // Try Email (if enabled)
    if (this.options.enableEmail) {
      try {
        const success = await this.sendContactEmail(formData);
        results.push({ method: 'Email', success });
        if (success) {
          return {
            success: true,
            method: 'Email',
            message: '✅ Message sent via email successfully! You will receive a response within 24 hours.'
          };
        }
      } catch (error) {
        // Email failed, trying next method
      }
    }

    // Fallback to WhatsApp (always available)
    if (this.options.enableWhatsApp) {
      return this.handleWhatsAppFallback(formData);
    }

    // If all methods failed
    return {
      success: false,
      method: 'None',
      message: '❌ Unable to send message. Please try contacting directly via WhatsApp or email.'
    };
  }

  private async sendContactEmail(formData: ContactFormData): Promise<boolean> {
    // Format email content
    const emailContent = this.formatEmailMessage(formData);
    
    // Send to your email using EmailJS
    const templateData = {
      to_email: 'munir.ayub@example.com', // Your email
      to_name: 'Munir Ayub',
      from_name: formData.name,
      from_email: formData.email,
      subject: `New Project Inquiry from ${formData.name}`,
      message: emailContent,
      project_type: formData.projectType || 'Not specified',
      budget_range: formData.budget || 'Not specified'
    };

    // For now, just return false as we don't have a contact form email template configured
    // You can add this method to emailService.ts if needed
    return false;
  }

  private formatEmailMessage(formData: ContactFormData): string {
    let message = `New Project Inquiry Details:\n\n`;
    message += `Name: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    
    if (formData.projectType) {
      message += `Project Type: ${formData.projectType}\n`;
    }
    
    if (formData.budget) {
      message += `Budget Range: ${formData.budget}\n`;
    }
    
    message += `\nMessage:\n${formData.message}\n\n`;
    message += `Submitted: ${new Date().toLocaleString()}\n`;
    message += `Source: Portfolio Website Contact Form`;
    
    return message;
  }

  private handleWhatsAppFallback(formData: ContactFormData): {
    success: boolean;
    method: string;
    message: string;
  } {
    // Store for admin panel viewing
    this.storeContactMessage(formData);

    return {
      success: true,
      method: 'WhatsApp (Manual)',
      message: '📱 Opening WhatsApp with your message pre-filled. Click send to submit your inquiry!'
    };
  }

  private storeContactMessage(formData: ContactFormData): void {
    const storedMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    storedMessages.push({
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'pending',
      method: 'whatsapp_manual'
    });
    localStorage.setItem('contact_messages', JSON.stringify(storedMessages));
  }

  // Admin panel methods
  getStoredMessages(): any[] {
    return JSON.parse(localStorage.getItem('contact_messages') || '[]');
  }

  markMessageAsRead(messageId: string): void {
    const messages = this.getStoredMessages();
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read', readAt: new Date().toISOString() } : msg
    );
    localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
  }

  deleteMessage(messageId: string): void {
    const messages = this.getStoredMessages();
    const filteredMessages = messages.filter(msg => msg.id !== messageId);
    localStorage.setItem('contact_messages', JSON.stringify(filteredMessages));
  }

  // Configuration methods
  updateContactOptions(newOptions: Partial<ContactOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  getContactOptions(): ContactOptions {
    return { ...this.options };
  }
}

export default new ContactService();