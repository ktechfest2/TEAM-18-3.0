// Every screen's URL in one place. Numbers match the design canvas.
// Use these instead of typing paths by hand, so a rename only happens here.
export const routes = {
  splash: "/", //                                01
  onboarding: {
    language: "/onboarding/language", //           02
    register: "/onboarding/register", //           03
    verify: "/onboarding/verify", //               04
    location: "/onboarding/location", //           05
    ready: "/onboarding/ready", //                 06
  },
  home: "/home", //                              07
  report: {
    hub: "/report", //                             08
    voted: "/report/voted", //                     09
    votedLocation: "/report/voted/location", //    10
    votedReview: "/report/voted/review", //        11
    votedDone: "/report/voted/done", //            12
    result: "/report/result", //                   15
    resultPhoto: "/report/result/photo", //        16
    incident: "/report/incident", //               18
    incidentDone: "/report/incident/done", //      19
  },
  stats: {
    national: "/stats", //                         13
    location: "/stats/location", //               14
  },
  myReports: "/reports", //                      17
  news: {
    list: "/news", //                              20
    article: (id: string) => `/news/${id}`, //     21
  },
  notifications: "/notifications", //            22
  events: {
    list: "/events", //                            23
    detail: (id: string) => `/events/${id}`, //    24
    checkout: (id: string) => `/events/${id}/checkout`, // 25
    ticket: (id: string) => `/tickets/${id}`, //   26
    create: "/events/new", //                      27
    analytics: (id: string) => `/events/${id}/analytics`, // 28
  },
  profile: "/profile", //                        29
  settings: "/settings", //                      30
  plans: "/plans", //                            31
  ussd: "/ussd", //                              32 (preview of the basic-phone menu)
  admin: "/admin", //                            33 / 34
  offline: "/offline",
} as const;
