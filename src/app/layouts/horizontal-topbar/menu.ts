import { MenuItem } from "./menu.model";
import { SchoolMenuEnum } from "src/app/core/enums/menu-enum";
import { PermissionActionEnum } from "src/app/core/enums/permission-action-enum";

export const MENU: MenuItem[] = [
  {
    id: SchoolMenuEnum.Dashboard,
    label: "MENUITEMS.DASHBOARD.TEXT",
    icon: "ri-home-3-line",
    link: "/",
    permission: PermissionActionEnum.School_ViewDashboard,
  },

  {
    id: SchoolMenuEnum.Analytics,
    label: "MENUITEMS.ANALYTICS.TEXT",
    icon: "ri-line-chart-line",
    link: "/",
    permission: PermissionActionEnum.School_ViewAnalytics,
  },

  {
    id: SchoolMenuEnum.Configuration,
    label: "MENUITEMS.CONFIGURATIONS.TEXT",
    icon: " ri-settings-3-line",
    permission: PermissionActionEnum.School_ViewConfiguration,
    subItems: [
      {
        id: SchoolMenuEnum.School,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SCHOOL",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-building-2-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Admission,
        label: "MENUITEMS.CONFIGURATIONS.LIST.ADMISSION",
        parentId: SchoolMenuEnum.Configuration,
        link: "/",
        icon: "ri-user-add-line",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Sections,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SECTIONS",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-list-check-2",
        link: "/",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.ExamTypes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.EXAMTYPES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-menu-add-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Subjects,
        label: "MENUITEMS.CONFIGURATIONS.LIST.SUBJECTS",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-book-open-fill",
        link: "/",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Courses,
        label: "MENUITEMS.CONFIGURATIONS.LIST.COURSES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-stack-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Grading,
        label: "MENUITEMS.CONFIGURATIONS.LIST.GRADING",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-edit-fill",
        isCollapsed: true,
        permission: PermissionActionEnum.School_ManageConfiguration,
        subItems: [
          {
            id: SchoolMenuEnum.GradingSystems,
            label: "MENUITEMS.GRADING.LIST.GRADINGSYSTEMS",
            link: "/",
            parentId: SchoolMenuEnum.Grading,
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
          {
            id: SchoolMenuEnum.GradeSetup,
            label: "MENUITEMS.GRADING.LIST.GRADESETUP",
            link: "/",
            parentId: SchoolMenuEnum.Grading,
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
        ],
      },
      {
        id: SchoolMenuEnum.Classes,
        label: "MENUITEMS.CONFIGURATIONS.LIST.CLASSES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-artboard-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Academics,
        icon: "ri-calendar-line",
        label: "MENUITEMS.CONFIGURATIONS.LIST.ACADEMICS",
        permission: PermissionActionEnum.School_ManageConfiguration,
        subItems: [
          {
            id: SchoolMenuEnum.AcademicYear,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICYEARS",
            parentId: SchoolMenuEnum.Academics,
            link: "/",
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
          {
            id: SchoolMenuEnum.AcademicTerm,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICTERMS",
            parentId: SchoolMenuEnum.Academics,
            link: "/",
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
          {
            id: SchoolMenuEnum.AcademicPeriod,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICPERIODS",
            parentId: SchoolMenuEnum.Academics,
            link: "/",
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
        ],
      },
    ],
  },
  {
    id: SchoolMenuEnum.Reports,
    label: "MENUITEMS.REPORTS.TEXT",
    icon: " ri-pie-chart-line",
    permission: PermissionActionEnum.School_ViewReports,
    subItems: [
      {
        id: SchoolMenuEnum.ReportCards,
        label: "MENUITEMS.REPORTS.LIST.REPORTCARDS",
        parentId: SchoolMenuEnum.Reports,
        icon: "ri-file-paper-2-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageReports,
      },
      {
        id: SchoolMenuEnum.Transcripts,
        label: "MENUITEMS.REPORTS.LIST.TRANSCRIPTS",
        parentId: SchoolMenuEnum.Reports,
        icon: " ri-file-list-3-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageReports,
      },
      {
        id: SchoolMenuEnum.MasterSheets,
        label: "MENUITEMS.REPORTS.LIST.MASTERSHEETS",
        parentId: SchoolMenuEnum.Reports,
        icon: "ri-survey-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageReports,
      },
    ],
  },
  {
    id: SchoolMenuEnum.Personnel,
    label: "MENUITEMS.PERSONNEL.TEXT",
    icon: "ri-admin-line",
    permission: PermissionActionEnum.School_ViewPersonnel,
    subItems: [
      {
        id: SchoolMenuEnum.Employees,
        icon: "ri-admin-fill",
        label: "MENUITEMS.PERSONNEL.LIST.EMPLOYEES",
        parentId: SchoolMenuEnum.Personnel,
        link: "/",
        permission: PermissionActionEnum.School_ViewPersonnel,
      },
      {
        id: SchoolMenuEnum.Teachers,
        label: "MENUITEMS.PERSONNEL.LIST.TEACHERS",
        icon: "ri-team-line",
        parentId: SchoolMenuEnum.Personnel,
        link: "/",
        permission: PermissionActionEnum.School_ViewPersonnel,
      },
    ],
  },

  {
    id: SchoolMenuEnum.Students,
    label: "MENUITEMS.STUDENTS.TEXT",
    icon: "ri-team-line",
    permission: PermissionActionEnum.School_ViewStudents,
    subItems: [
      {
        id: SchoolMenuEnum.StudentRegistration,
        label: "MENUITEMS.STUDENTS.LIST.REGISTRATION",
        icon: "ri-user-add-line",
        parentId: SchoolMenuEnum.Students,
        link: "/",
        permission: PermissionActionEnum.School_ManageStudents,
      },
      {
        id: SchoolMenuEnum.StudentEnrollments,
        label: "MENUITEMS.STUDENTS.LIST.ENROLLMENTS",
        icon: "ri-swap-box-line",
        parentId: SchoolMenuEnum.Students,
        link: "/",
        permission: PermissionActionEnum.School_ManageStudents,
      },
    ],
  },

  {
    id: SchoolMenuEnum.Results,
    label: "MENUITEMS.RESULTS.TEXT",
    icon: " ri-pages-line",
    permission: PermissionActionEnum.School_ViewResults,
    subItems: [
      {
        id: SchoolMenuEnum.RegisterResults,
        label: "MENUITEMS.RESULTS.LIST.REGISTERRESULTS",
        parentId: SchoolMenuEnum.Results,
        icon: "ri-edit-line",
        link: "/",
        permission: PermissionActionEnum.School_RegisterResults,
      },
      {
        id: SchoolMenuEnum.ResultHistory,
        label: "MENUITEMS.RESULTS.LIST.RESULTHISTORY",
        parentId: SchoolMenuEnum.Results,
        icon: "ri-history-line",
        link: "/",
        permission: PermissionActionEnum.School_ManageResultHistory,
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
        permission: PermissionActionEnum.School_ManageParents,
      },
      {
        id: SchoolMenuEnum.Attendance,
        label: "MENUITEMS.ATTENDANCE.TEXT",
        icon: "ri-user-voice-line",
        permission: PermissionActionEnum.School_ViewAttendance,
        subItems: [
          {
            id: SchoolMenuEnum.StudentAttendance,
            label: "MENUITEMS.ATTENDANCE.LIST.STUDENTATTENDANCE",
            parentId: SchoolMenuEnum.Attendance,
            link: "/",
            permission: PermissionActionEnum.School_ViewAttendance,
          },
          {
            id: SchoolMenuEnum.TeacherAttendance,
            label: "MENUITEMS.ATTENDANCE.LIST.TEACHERATTENDANCE",
            parentId: SchoolMenuEnum.Attendance,
            link: "/",
            permission: PermissionActionEnum.School_ViewAttendance,
          },
        ],
      },

      {
        id: SchoolMenuEnum.Exams,
        label: "MENUITEMS.EXAMS.TEXT",
        icon: "ri-pencil-ruler-line",
        link: "/",
        permission: PermissionActionEnum.School_ViewExams,
      },

      {
        id: SchoolMenuEnum.Library,
        label: "MENUITEMS.LIBRARY.TEXT",
        icon: "ri-book-2-fill",
        permission: PermissionActionEnum.School_ViewLibrary,
        subItems: [],
      },
      {
        id: SchoolMenuEnum.Inventory,
        label: "MENUITEMS.INVENTORY.TEXT",
        icon: " ri-shopping-cart-2-fill",
        permission: PermissionActionEnum.School_ViewInventory,
        subItems: [],
      },

      {
        id: SchoolMenuEnum.Finance,
        label: "MENUITEMS.FINANCE.TEXT",
        icon: " ri-hand-coin-fill",
        permission: PermissionActionEnum.School_ViewFinance,
        subItems: [
          {
            id: SchoolMenuEnum.Subscription,
            label: "MENUITEMS.FINANCE.LIST.SUBSCRIPTIONS",
            parentId: SchoolMenuEnum.Finance,
            link: "/",
            permission: PermissionActionEnum.School_ManageSubscription,
          },
        ],
      },
      {
        id: SchoolMenuEnum.Boarding,
        label: "MENUITEMS.BOARDING.TEXT",
        icon: "ri-community-line",
        permission: PermissionActionEnum.School_ViewBoarding,
        subItems: [],
      },

      {
        id: SchoolMenuEnum.Transportation,
        label: "MENUITEMS.TRANSPORTATION.TEXT",
        icon: "ri-bus-line",
        permission: PermissionActionEnum.School_ViewTransportation,
        subItems: [],
      },

      {
        id: SchoolMenuEnum.Users,
        label: "MENUITEMS.USERS.TEXT",
        icon: "ri-team-line",
        permission: PermissionActionEnum.School_ViewUsers,
        subItems: [
          {
            id: SchoolMenuEnum.Roles,
            label: "MENUITEMS.USERS.LIST.ROLES",
            parentId: SchoolMenuEnum.Users,
            link: "/",
            permission: PermissionActionEnum.School_ManageUsers,
          },
          {
            id: SchoolMenuEnum.ManageUsers,
            label: "MENUITEMS.USERS.LIST.MANAGEUSERS",
            parentId: SchoolMenuEnum.Users,
            link: "/",
            permission: PermissionActionEnum.School_ManageUsers,
          },
        ],
      },
    ],
  },
];
