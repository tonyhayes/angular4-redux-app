export interface ScheduleInfo {
  name: string; /*Lists your schedules by the name you assign to them*/
  repeats: RepeatTime; /*Describes how often the schedule is set to run.*/
  sourceFile: string; /*file associated with the schedule*/
  outputLocation: string; /* location that the scheduled report is saved*/
  lastRun: string; /* last time and date when the schedule was run*/
  nextRun: string; /* next time and date when the schedule will run again*/
  status: string; /*current Status of the schedule. The state can be either Normal or Paused.*/
}
export interface ReportInfo {
  name: string; /*Lists your report by the name you assign to them*/
  sourceFile: string; /*file associated with the report*/
  outputLocation: string; /* location that the report is saved*/
  lastRun: string; /* last time and date when the report was run*/
  status: string; /*current Status of the report. The state can be either Normal or Paused.*/
}

export interface RepeatTime {
  repeatTimeStart: string; /* all schedules are blocked from running from date*/
  repeatTimeEnds: string; /* all schedules are blocked from running to date*/
  repeats: string; /*Describes how often backout is active.*/
  repeatsEndBy: string; /*Describes when the  repeater ends.*/
}

export interface Report {
  id: string;
  blackoutTimesList: RepeatTime[];
  reportInfo: ReportInfo;
  scheduleInfo: ScheduleInfo;
}

export function generateMockReport(): Report {
  return {
    id: '1',
    blackoutTimesList: [
      {
        repeatTimeStart: '1513616909621' ,
        repeatTimeEnds: '1513616909621',
        repeats: 'Daily',
        repeatsEndBy: 'Never'
      }
    ],
    reportInfo: {
      name: 'report name',
      sourceFile: '/path/to/report',
      outputLocation: '/output/path/to/report',
      lastRun: '1513616909621',
      status: 'Normal',
    },
    scheduleInfo: {
      name: 'report schedule name',
      repeats: {
        repeatTimeStart: '1513616909621',
        repeatTimeEnds: '1513616909621',
        repeats: 'Daily',
        repeatsEndBy: 'Never'
      },
      sourceFile: '/path/to/report',
      outputLocation: '/output/path/to/report',
      lastRun: '1513616909621',
      nextRun: '1513616909621',
      status: 'Normal',
    },
  };
}
