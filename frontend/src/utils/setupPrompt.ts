import type { UserProfile } from '../types/api';
import { canStartTour } from '../features/firstInvoiceTour/tourSteps';

export type SetupPromptChoices = {
  showFirstInvoice: boolean;
  showAdjustSeries: boolean;
  copy: string;
};

/** What the "Company created" dialog offers, by role. */
export function setupPromptChoices(companyRole: UserProfile['role'] | null, isAdmin: boolean): SetupPromptChoices {
  const showFirstInvoice = canStartTour(companyRole);
  if (showFirstInvoice) {
    return {
      showFirstInvoice,
      showAdjustSeries: isAdmin,
      copy: 'Your company is ready. Create your first invoice now. We will show you each step.',
    };
  }
  return {
    showFirstInvoice,
    showAdjustSeries: isAdmin,
    copy: isAdmin
      ? 'You can now optionally adjust invoice series before creating invoices.'
      : 'Setup is complete. You can continue to dashboard now.',
  };
}
