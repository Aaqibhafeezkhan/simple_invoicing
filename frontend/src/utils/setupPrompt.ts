import type { UserProfile } from '../types/api';
import { canStartTour } from '../features/firstInvoiceTour/tourSteps';

export type SetupPromptChoices = {
  showFirstInvoice: boolean;
  dismissLabel: string;
  copy: string;
};

/**
 * What the "Company created" dialog offers, by role. Invoice numbering is left
 * out on purpose: the default series works, and new users who stopped to adjust
 * it never reached their first invoice.
 */
export function setupPromptChoices(companyRole: UserProfile['role'] | null): SetupPromptChoices {
  if (canStartTour(companyRole)) {
    return {
      showFirstInvoice: true,
      dismissLabel: 'Skip for now',
      copy: 'Your company is ready. Create your first invoice now. We will show you each step.',
    };
  }
  return {
    showFirstInvoice: false,
    dismissLabel: 'Go to dashboard',
    copy: 'Setup is complete. You can continue to the dashboard now.',
  };
}
