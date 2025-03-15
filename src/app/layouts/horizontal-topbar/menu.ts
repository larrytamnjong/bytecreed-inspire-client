import { icon } from "leaflet";
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
    subItems: [
      {
        id: MenuEnum.School,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SCHOOL",
        parentId: MenuEnum.Configuration,
        icon: " ri-building-2-line",
        link: "/",
      },
      {
        id: MenuEnum.Admission,
        label: "MENUITEMS.CONFIGURATIONS.LIST.ADMISSION",
        parentId: MenuEnum.Configuration,
        link: "/",
        icon: "ri-user-add-line",
      },
      {
        id: MenuEnum.Sections,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SECTIONS",
        parentId: MenuEnum.Configuration,
        icon: " ri-list-check-2",
        link: "/",
      },
      {
        id: MenuEnum.ExamTypes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.EXAMTYPES",
        parentId: MenuEnum.Configuration,
        icon : "ri-menu-add-line",
        link: "/",
      },
      {
        id: MenuEnum.Subjects,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SUBJECTS",
        parentId: MenuEnum.Configuration,
        icon: " ri-book-open-fill",
        link: "/",
      },
      {
        id: MenuEnum.Courses,
        label: "MENUITEMS.CONFIGURATIONS.LIST.COURSES",
        parentId: MenuEnum.Configuration,
        icon: "ri-stack-line",
        link: "/",
      },
      {
        id: MenuEnum.Grading,
        label: "MENUITEMS.CONFIGURATIONS.LIST.GRADING",
        parentId: MenuEnum.Configuration,
        icon: "ri-edit-fill",
        isCollapsed: true,
        subItems: [
          {
            id: MenuEnum.GradingSystems,
            label: "MENUITEMS.GRADING.LIST.GRADINGSYSTEMS",
            link: "/",
            parentId: MenuEnum.Grading,
          },
          {
            id: MenuEnum.GradeSetup,
            label: "MENUITEMS.GRADING.LIST.GRADESETUP",
            link: "/",
            parentId: MenuEnum.Grading,
          },
        ],
      },
      {
        id: MenuEnum.Classes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.CLASSES",
        parentId: MenuEnum.Configuration,
        icon: "ri-artboard-line",
        link: "/",
      },
      {
        id: MenuEnum.Academics,
        icon: "ri-calendar-line",
        label: "MENUITEMS.CONFIGURATIONS.LIST.ACADEMICS",
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
    id: MenuEnum.Reports,
    label: "MENUITEMS.REPORTS.TEXT",
    icon: " ri-pie-chart-line",
    subItems: [
      {
        id: MenuEnum.ReportCards,
        label: "MENUITEMS.REPORTS.LIST.REPORTCARDS",
        parentId: MenuEnum.Reports,
        icon: "ri-file-paper-2-line",
        link: "/",
      },
      {
        id: MenuEnum.Transcripts,
        label: "MENUITEMS.REPORTS.LIST.TRANSCRIPTS",
        parentId: MenuEnum.Reports,
        icon: " ri-file-list-3-line",
        link: "/",
      },
      {
        id: MenuEnum.MasterSheets,
        label: "MENUITEMS.REPORTS.LIST.MASTERSHEETS",
        parentId: MenuEnum.Reports,
        icon: "ri-survey-line",
        link: "/",
      },
    ],
  },
  {
    id: MenuEnum.Personnel,
    label: "MENUITEMS.PERSONNEL.TEXT",
    icon: "ri-admin-line",
    subItems: [
      {
        id: MenuEnum.Employees,
        icon: "ri-admin-fill",
        label: "MENUITEMS.PERSONNEL.LIST.EMPLOYEES",
        parentId: MenuEnum.Personnel,
        link: "/",
      },
      {
        id: MenuEnum.Teachers,
        label: "MENUITEMS.PERSONNEL.LIST.TEACHERS",
        icon: "ri-team-line",
        parentId: MenuEnum.Personnel,
        link: "/",
      },
    ],
  },

  {
    id: MenuEnum.Students,
    label: "MENUITEMS.STUDENTS.TEXT",
    icon: "ri-team-line",
    subItems: [
      {
        id: MenuEnum.StudentRegistration,
        label: "MENUITEMS.STUDENTS.LIST.REGISTRATION",
        icon: "ri-user-add-line",
        parentId: MenuEnum.Students,
        link: "/",
      },
      {
        id: MenuEnum.StudentEnrollments,
        label: "MENUITEMS.STUDENTS.LIST.ENROLLMENTS",
        icon: "ri-swap-box-line",
        parentId: MenuEnum.Students,
        link: "/",
      },
    ],
  },

  {
    id: MenuEnum.Results,
    label: "MENUITEMS.RESULTS.TEXT",
    icon: " ri-pages-line",
    subItems: [
      {
        id: MenuEnum.RegisterResults,
        label: "MENUITEMS.RESULTS.LIST.REGISTERRESULTS",
        parentId: MenuEnum.Results,
        icon : "ri-edit-line",
        link: "/",
      },
      {
        id: MenuEnum.ResultHistory,
        label: "MENUITEMS.RESULTS.LIST.RESULTHISTORY",
        parentId: MenuEnum.Results,
        icon : "ri-history-line",
        link: "/",
      },
    ],
  },

  {
    id: MenuEnum.HeaderMore,
    label: "HEADER.MORE.TEXT",
    icon: "ri-briefcase-2-line",
    subItems: [
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
        id: MenuEnum.Library,
        label: "MENUITEMS.LIBRARY.TEXT",
        icon: "ri-book-2-fill",
        subItems: [],
      },
      {
        id: MenuEnum.Inventory,
        label: "MENUITEMS.INVENTORY.TEXT",
        icon: " ri-shopping-cart-2-fill",
        subItems: [],
      },

      {
        id: MenuEnum.Finance,
        label: "MENUITEMS.FINANCE.TEXT",
        icon: " ri-hand-coin-fill",
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
        subItems: [],
      },

      {
        id: MenuEnum.Transportation,
        label: "MENUITEMS.TRANSPORTATION.TEXT",
        icon: "ri-bus-line",
        subItems: [],
      },

      {
        id: MenuEnum.Users,
        label: "MENUITEMS.USERS.TEXT",
        icon: "ri-team-line",
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
    ],
  },
];
