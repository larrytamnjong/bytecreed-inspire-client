import { icon } from "leaflet";
import { MenuItem } from "./menu.model";
import { SchoolMenuEnum } from "src/app/core/enums/menu-enum";

export const MENU: MenuItem[] = [
  {
    id: SchoolMenuEnum.General,
    label: "MENUITEMS.GENERAL.TEXT",
    isTitle: true,
  },

  {
    id: SchoolMenuEnum.Dashboard,
    label: "MENUITEMS.DASHBOARD.TEXT",
    icon: "ri-home-4-line",
    link: "/",
  },

  {
    id: SchoolMenuEnum.Analytics,
    label: "MENUITEMS.ANALYTICS.TEXT",
    icon: "ri-line-chart-line",
    link: "/",
  },

  {
    id: SchoolMenuEnum.Configuration,
    label: "MENUITEMS.CONFIGURATIONS.TEXT",
    icon: " ri-settings-3-line",
    subItems: [
      {
        id: SchoolMenuEnum.School,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SCHOOL",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-building-2-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Admission,
        label: "MENUITEMS.CONFIGURATIONS.LIST.ADMISSION",
        parentId: SchoolMenuEnum.Configuration,
        link: "/",
        icon: "ri-user-add-line",
      },
      {
        id: SchoolMenuEnum.Sections,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SECTIONS",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-list-check-2",
        link: "/",
      },
      {
        id: SchoolMenuEnum.ExamTypes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.EXAMTYPES",
        parentId: SchoolMenuEnum.Configuration,
        icon : "ri-menu-add-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Subjects,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SUBJECTS",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-book-open-fill",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Courses,
        label: "MENUITEMS.CONFIGURATIONS.LIST.COURSES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-stack-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Grading,
        label: "MENUITEMS.CONFIGURATIONS.LIST.GRADING",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-edit-fill",
        isCollapsed: true,
        subItems: [
          {
            id: SchoolMenuEnum.GradingSystems,
            label: "MENUITEMS.GRADING.LIST.GRADINGSYSTEMS",
            link: "/",
            parentId: SchoolMenuEnum.Grading,
          },
          {
            id: SchoolMenuEnum.GradeSetup,
            label: "MENUITEMS.GRADING.LIST.GRADESETUP",
            link: "/",
            parentId: SchoolMenuEnum.Grading,
          },
        ],
      },
      {
        id: SchoolMenuEnum.Classes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.CLASSES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-artboard-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Academics,
        icon: "ri-calendar-line",
        label: "MENUITEMS.CONFIGURATIONS.LIST.ACADEMICS",
        subItems: [
          {
            id: SchoolMenuEnum.AcademicYear,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICYEARS",
            parentId: SchoolMenuEnum.Academics,
            link: "/",
          },
          {
            id: SchoolMenuEnum.AcademicTerm,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICTERMS",
            parentId: SchoolMenuEnum.Academics,
            link: "/",
          },
          {
            id: SchoolMenuEnum.AcademicPeriod,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICPERIODS",
            parentId: SchoolMenuEnum.Academics,
            link: "/",
          },
        ],
      }
    ],
  },
  {
    id: SchoolMenuEnum.Reports,
    label: "MENUITEMS.REPORTS.TEXT",
    icon: " ri-pie-chart-line",
    subItems: [
      {
        id: SchoolMenuEnum.ReportCards,
        label: "MENUITEMS.REPORTS.LIST.REPORTCARDS",
        parentId: SchoolMenuEnum.Reports,
        icon: "ri-file-paper-2-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Transcripts,
        label: "MENUITEMS.REPORTS.LIST.TRANSCRIPTS",
        parentId: SchoolMenuEnum.Reports,
        icon: " ri-file-list-3-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.MasterSheets,
        label: "MENUITEMS.REPORTS.LIST.MASTERSHEETS",
        parentId: SchoolMenuEnum.Reports,
        icon: "ri-survey-line",
        link: "/",
      },
    ],
  },
  {
    id: SchoolMenuEnum.Personnel,
    label: "MENUITEMS.PERSONNEL.TEXT",
    icon: "ri-admin-line",
    subItems: [
      {
        id: SchoolMenuEnum.Employees,
        icon: "ri-admin-fill",
        label: "MENUITEMS.PERSONNEL.LIST.EMPLOYEES",
        parentId: SchoolMenuEnum.Personnel,
        link: "/",
      },
      {
        id: SchoolMenuEnum.Teachers,
        label: "MENUITEMS.PERSONNEL.LIST.TEACHERS",
        icon: "ri-team-line",
        parentId: SchoolMenuEnum.Personnel,
        link: "/",
      },
    ],
  },

  {
    id: SchoolMenuEnum.Students,
    label: "MENUITEMS.STUDENTS.TEXT",
    icon: "ri-team-line",
    subItems: [
      {
        id: SchoolMenuEnum.StudentRegistration,
        label: "MENUITEMS.STUDENTS.LIST.REGISTRATION",
        icon: "ri-user-add-line",
        parentId: SchoolMenuEnum.Students,
        link: "/",
      },
      {
        id: SchoolMenuEnum.StudentEnrollments,
        label: "MENUITEMS.STUDENTS.LIST.ENROLLMENTS",
        icon: "ri-swap-box-line",
        parentId: SchoolMenuEnum.Students,
        link: "/",
      },
    ],
  },

  {
    id: SchoolMenuEnum.Results,
    label: "MENUITEMS.RESULTS.TEXT",
    icon: " ri-pages-line",
    subItems: [
      {
        id: SchoolMenuEnum.RegisterResults,
        label: "MENUITEMS.RESULTS.LIST.REGISTERRESULTS",
        parentId: SchoolMenuEnum.Results,
        icon : "ri-edit-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.ResultHistory,
        label: "MENUITEMS.RESULTS.LIST.RESULTHISTORY",
        parentId: SchoolMenuEnum.Results,
        icon : "ri-history-line",
        link: "/",
      },
    ],
  },

  {
    id: SchoolMenuEnum.HeaderMore,
    label: "HEADER.MORE.TEXT",
    icon: "ri-briefcase-2-line",
    subItems: [
      {
        id: SchoolMenuEnum.Parents,
        label: "MENUITEMS.PARENTS.TEXT",
        icon: " ri-parent-line",
        link: "/",
      },
      {
        id: SchoolMenuEnum.Attendance,
        label: "MENUITEMS.ATTENDANCE.TEXT",
        icon: "ri-user-voice-line",
        subItems: [
          {
            id: SchoolMenuEnum.StudentAttendance,
            label: "MENUITEMS.ATTENDANCE.LIST.STUDENTATTENDANCE",
            parentId: SchoolMenuEnum.Attendance,
            link: "/",
          },
          {
            id: SchoolMenuEnum.TeacherAttendance,
            label: "MENUITEMS.ATTENDANCE.LIST.TEACHERATTENDANCE",
            parentId: SchoolMenuEnum.Attendance,
            link: "/",
          },
        ],
      },

      {
        id: SchoolMenuEnum.Exams,
        label: "MENUITEMS.EXAMS.TEXT",
        icon: "ri-pencil-ruler-line",
        link: "/",
      },

      {
        id: SchoolMenuEnum.Library,
        label: "MENUITEMS.LIBRARY.TEXT",
        icon: "ri-book-2-fill",
        subItems: [],
      },
      {
        id: SchoolMenuEnum.Inventory,
        label: "MENUITEMS.INVENTORY.TEXT",
        icon: " ri-shopping-cart-2-fill",
        subItems: [],
      },

      {
        id: SchoolMenuEnum.Finance,
        label: "MENUITEMS.FINANCE.TEXT",
        icon: " ri-hand-coin-fill",
        subItems: [
          {
            id: SchoolMenuEnum.Subscription,
            label: "MENUITEMS.FINANCE.LIST.SUBSCRIPTIONS",
            parentId: SchoolMenuEnum.Finance,
            link: "/",
          },
        ],
      },
      {
        id: SchoolMenuEnum.Boarding,
        label: "MENUITEMS.BOARDING.TEXT",
        icon: "ri-community-line",
        subItems: [],
      },

      {
        id: SchoolMenuEnum.Transportation,
        label: "MENUITEMS.TRANSPORTATION.TEXT",
        icon: "ri-bus-line",
        subItems: [],
      },

      {
        id: SchoolMenuEnum.Users,
        label: "MENUITEMS.USERS.TEXT",
        icon: "ri-team-line",
        subItems: [
          {
            id: SchoolMenuEnum.Roles,
            label: "MENUITEMS.USERS.LIST.ROLES",
            parentId: SchoolMenuEnum.Users,
            link: "/",
          },
          {
            id: SchoolMenuEnum.ManageUsers,
            label: "MENUITEMS.USERS.LIST.MANAGEUSERS",
            parentId: SchoolMenuEnum.Users,
            link: "/",
          },
        ],
      },
    ],
  },
];
