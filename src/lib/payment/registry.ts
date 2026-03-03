import type { PaymentProvider, PaymentType, MethodDefaultLimits } from './types';

export class PaymentProviderRegistry {
  private providers = new Map<PaymentType, PaymentProvider>();

  register(provider: PaymentProvider): void {
    for (const type of provider.supportedTypes) {
      this.providers.set(type, provider);
    }
  }

  getProvider(type: PaymentType): PaymentProvider {
    const provider = this.providers.get(type);
    if (!provider) {
      throw new Error(`No payment provider registered for type: ${type}`);
    }
    return provider;
  }

  hasProvider(type: PaymentType): boolean {
    return this.providers.has(type);
  }

  getSupportedTypes(): PaymentType[] {
    return Array.from(this.providers.keys());
  }

  /** 获取指定渠道的提供商默认限额（未注册时返回 undefined） */
  getDefaultLimit(type: string): MethodDefaultLimits | undefined {
    const provider = this.providers.get(type as PaymentType);
    return provider?.defaultLimits?.[type];
  }

  /** 获取指定渠道对应的提供商 key（如 'easypay'、'stripe'） */
  getProviderKey(type: string): string | undefined {
    const provider = this.providers.get(type as PaymentType);
    return provider?.providerKey;
  }
}

export const paymentRegistry = new PaymentProviderRegistry();
