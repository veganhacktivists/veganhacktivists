import { rejectOldRequestsWithoutApplicantsTask } from './rejectOldRequestsWithoutApplicantsTask';
import { sendInternalEmailNotificationForRequestsWithoutApplicationsTask } from './sendInternalEmailNotificationForRequestsWithoutApplicationsTask';

export function runHourlyTasks(): void {
  void rejectOldRequestsWithoutApplicantsTask();
  void sendInternalEmailNotificationForRequestsWithoutApplicationsTask();
}
