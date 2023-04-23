import { rejectOldRequestsWithoutApplicantsTask } from './rejectOldRequestsWithoutApplicantsTask';

export function runHourlyTasks(): void {
  void rejectOldRequestsWithoutApplicantsTask();
}
