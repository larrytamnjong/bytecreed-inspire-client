import { MenuItem } from "./menu.model";
import { MenuEnum } from "src/app/core/enums/menu-enum";

export const MENU: MenuItem[] = [
  {
    id: MenuEnum.General,
    label: "MENUITEMS.GENERAL.TEXT",
    isTitle: true,
  },
  {
    id: MenuEnum.Dashboard,
    label: "MENUITEMS.DASHBOARD.TEXT",
    icon: "ri-dashboard-fill",
    link: "/",
  },
  {
    id: MenuEnum.Analytics,
    label: "MENUITEMS.ANALYTICS.TEXT",
    icon: "ri-line-chart-line",
    link: "/",
  },
  {
    id: MenuEnum.Configuration,
    label: "MENUITEMS.CONFIGURATIONS.TEXT",
    icon: " ri-settings-3-line",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.School,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SCHOOL",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.Admission,
        label: "MENUITEMS.CONFIGURATIONS.LIST.ADMISSION",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.Sections,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SECTIONS",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.ExamTypes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.EXAMTYPES",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.Subjects,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SUBJECTS",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.Courses,
        label: "MENUITEMS.CONFIGURATIONS.LIST.COURSES",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.Grading,
        label: "MENUITEMS.CONFIGURATIONS.LIST.GRADING",
        parentId: MenuEnum.Configuration,
        isCollapsed: true,
        subItems: [
          {
            id: MenuEnum.GradingSystems,
            label: 'MENUITEMS.GRADING.LIST.GRADINGSYSTEMS',
            link: '/',
            parentId: MenuEnum.Grading
          },
          {
            id: MenuEnum.GradeSetup,
            label: 'MENUITEMS.GRADING.LIST.GRADESETUP',
            link: '/',
            parentId: MenuEnum.Grading
          },
        ]
      },
      {
        id: MenuEnum.Classes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.CLASSES",
        parentId: MenuEnum.Configuration,
        link: "/",
      },
      {
        id: MenuEnum.Academics,
        label: "MENUITEMS.CONFIGURATIONS.LIST.ACADEMICS",
        icon: " ri-calendar-2-line",
        isCollapsed: true,
        subItems: [
          {
            id: MenuEnum.AcademicYear,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICYEARS",
            parentId: MenuEnum.Academics,
            link: "/",
          },
          {
            id: MenuEnum.AcademicTerm,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICTERMS",
            parentId: MenuEnum.Academics,
            link: "/",
          },
          {
            id: MenuEnum.AcademicPeriod,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICPERIODS",
            parentId: MenuEnum.Academics,
            link: "/",
          },
        ],
      }
    ],
  },
  {
    id: MenuEnum.ReportCards,
    label: "MENUITEMS.REPORTING.TEXT",
    isTitle: true,
  },
  {
    id: MenuEnum.ReportCards,
    label: "MENUITEMS.REPORTS.LIST.REPORTCARDS",
    parentId: MenuEnum.Reports,
    link: "/",
    icon: "ri-file-paper-2-line",
  },
  {
    id: MenuEnum.Transcripts,
    label: "MENUITEMS.REPORTS.LIST.TRANSCRIPTS",
    parentId: MenuEnum.Reports,
    link: "/",
    icon: " ri-file-list-3-line",
  },
  {
    id: MenuEnum.MasterSheets,
    label: "MENUITEMS.REPORTS.LIST.MASTERSHEETS",
    parentId: MenuEnum.Reports,
    link: "/",
    icon: "ri-survey-line",
  },

  {
    id: MenuEnum.Core,
    label: "MENUITEMS.CORE.TEXT",
    isTitle: true,
  },
  {
    id: MenuEnum.Personnel,
    label: "MENUITEMS.PERSONNEL.TEXT",
    icon: "ri-admin-line",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.Employees,
        label: "MENUITEMS.PERSONNEL.LIST.EMPLOYEES",
        parentId: MenuEnum.Personnel,
        link: "/",
      },
      {
        id: MenuEnum.Teachers,
        label: "MENUITEMS.PERSONNEL.LIST.TEACHERS",
        parentId: MenuEnum.Personnel,
        link: "/",
      },
    ],
  },
  {
    id: MenuEnum.Students,
    label: "MENUITEMS.STUDENTS.TEXT",
    icon: "ri-team-line",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.StudentRegistration,
        label: "MENUITEMS.STUDENTS.LIST.REGISTRATION",
        parentId: MenuEnum.Students,
        link: "/",
      },
      {
        id: MenuEnum.StudentEnrollments,
        label: "MENUITEMS.STUDENTS.LIST.ENROLLMENTS",
        parentId: MenuEnum.Students,
        link: "/",
      },
    ],
  },
  {
    id: MenuEnum.Parents,
    label: "MENUITEMS.PARENTS.TEXT",
    icon: " ri-parent-line",
    link: "/",
  },
  {
    id: MenuEnum.Attendance,
    label: "MENUITEMS.ATTENDANCE.TEXT",
    icon: "ri-user-voice-line",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.StudentAttendance,
        label: "MENUITEMS.ATTENDANCE.LIST.STUDENTATTENDANCE",
        parentId: MenuEnum.Attendance,
        link: "/",
      },
      {
        id: MenuEnum.TeacherAttendance,
        label: "MENUITEMS.ATTENDANCE.LIST.TEACHERATTENDANCE",
        parentId: MenuEnum.Attendance,
        link: "/",
      },
    ],
  },

  {
    id: MenuEnum.Exams,
    label: "MENUITEMS.EXAMS.TEXT",
    icon: "ri-pencil-ruler-line",
    link: "/",
  },

  {
    id: MenuEnum.Results,
    label: "MENUITEMS.RESULTS.TEXT",
    icon: " ri-pages-line",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.RegisterResults,
        label: "MENUITEMS.RESULTS.LIST.REGISTERRESULTS",
        parentId: MenuEnum.Results,
        link: "/",
      },
      {
        id: MenuEnum.ResultHistory,
        label: "MENUITEMS.RESULTS.LIST.RESULTHISTORY",
        parentId: MenuEnum.Results,
        link: "/",
      },
    ],
  },
  {
    id: MenuEnum.Library,
    label: "MENUITEMS.LIBRARY.TEXT",
    icon: "ri-book-2-fill",
    isCollapsed: true,
    subItems: [],
  },
  {
    id: MenuEnum.Inventory,
    label: "MENUITEMS.INVENTORY.TEXT",
    icon: " ri-shopping-cart-2-fill",
    isCollapsed: true,
    subItems: [],
  },

  {
    id: MenuEnum.Finance,
    label: "MENUITEMS.FINANCE.TEXT",
    icon: " ri-hand-coin-fill",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.Subscription,
        label: "MENUITEMS.FINANCE.LIST.SUBSCRIPTIONS",
        parentId: MenuEnum.Finance,
        link: "/",
      },
    ],
  },
  {
    id: MenuEnum.Boarding,
    label: "MENUITEMS.BOARDING.TEXT",
    icon: "ri-community-line",
    isCollapsed: true,
    subItems: [],
  },

  {
    id: MenuEnum.Transportation,
    label: "MENUITEMS.TRANSPORTATION.TEXT",
    icon: "ri-bus-line",
    isCollapsed: true,
    subItems: [],
  },

  {
    id: MenuEnum.Users,
    label: "MENUITEMS.USERS.TEXT",
    icon: "ri-team-line",
    isCollapsed: true,
    subItems: [
      {
        id: MenuEnum.Roles,
        label: "MENUITEMS.USERS.LIST.ROLES",
        parentId: MenuEnum.Users,
        link: "/",
      },
      {
        id: MenuEnum.ManageUsers,
        label: "MENUITEMS.USERS.LIST.MANAGEUSERS",
        parentId: MenuEnum.Users,
        link: "/",
      },
    ],
  },
];
