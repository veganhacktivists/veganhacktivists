import { rejectOldRequestsWithoutApplicantsTask } from './rejectOldRequestsWithoutApplicantsTask';
import { sendInternalEmailNotificationForRequestsWithoutApplicationsTask } from './sendInternalEmailNotificationForRequestsWithoutApplicationsTask';
import { requestPlaygroundApplicantFeedbackTask } from './requestFeedbackTask';

export function runHourlyTasks(): void {
  void rejectOldRequestsWithoutApplicantsTask();
  void sendInternalEmailNotificationForRequestsWithoutApplicationsTask();
  void requestPlaygroundApplicantFeedbackTask();
}
