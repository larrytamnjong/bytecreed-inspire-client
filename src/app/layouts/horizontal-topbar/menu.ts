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
    link: "/school/analytics",
    permission: PermissionActionEnum.School_ViewAnalytics,
  },

  {
    id: SchoolMenuEnum.Configuration,
    label: "MENUITEMS.CONFIGURATION.TEXT",
    icon: " ri-settings-3-line",
    permission: PermissionActionEnum.School_ViewConfiguration,
    subItems: [
      {
        id: SchoolMenuEnum.School,
        label: "MENUITEMS.CONFIGURATION.LIST.SCHOOL",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-building-2-line",
        link: "/school/configuration/school",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Admission,
        label: "MENUITEMS.CONFIGURATION.LIST.ADMISSION",
        parentId: SchoolMenuEnum.Configuration,
        link: "/school/configuration/admission",
        icon: "ri-user-add-line",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Sections,
        label: "MENUITEMS.CONFIGURATION.LIST.SECTIONS",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-list-check-2",
        link: "/school/configuration/sections",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.ExamTypes,
        label: "MENUITEMS.CONFIGURATION.LIST.EXAMTYPES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-menu-add-line",
        link: "/school/configuration/exam-types",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Subjects,
        label: "MENUITEMS.CONFIGURATION.LIST.SUBJECTS",
        parentId: SchoolMenuEnum.Configuration,
        icon: " ri-book-open-fill",
        link: "/school/configuration/subjects",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Courses,
        label: "MENUITEMS.CONFIGURATION.LIST.COURSES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-stack-line",
        link: "/school/configuration/courses",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Grading,
        label: "MENUITEMS.CONFIGURATION.LIST.GRADING",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-edit-fill",
        isCollapsed: true,
        permission: PermissionActionEnum.School_ManageConfiguration,
        subItems: [
          {
            id: SchoolMenuEnum.GradingSystems,
            label: "MENUITEMS.GRADING.LIST.GRADINGSYSTEMS",
            link: "/school/configuration/grading/grading-systems",
            parentId: SchoolMenuEnum.Grading,
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
          {
            id: SchoolMenuEnum.GradeSetup,
            label: "MENUITEMS.GRADING.LIST.GRADESETUP",
            link: "/school/configuration/grading/grade-setup",
            parentId: SchoolMenuEnum.Grading,
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
        ],
      },
      {
        id: SchoolMenuEnum.Classes,
        label: "MENUITEMS.CONFIGURATION.LIST.CLASSES",
        parentId: SchoolMenuEnum.Configuration,
        icon: "ri-artboard-line",
        link: "/school/configuration/classes",
        permission: PermissionActionEnum.School_ManageConfiguration,
      },
      {
        id: SchoolMenuEnum.Academics,
        icon: "ri-calendar-line",
        label: "MENUITEMS.CONFIGURATION.LIST.ACADEMICS",
        permission: PermissionActionEnum.School_ManageConfiguration,
        subItems: [
          {
            id: SchoolMenuEnum.AcademicYear,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICYEARS",
            parentId: SchoolMenuEnum.Academics,
            link: "/school/configuration/academics/academic-years",
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
          {
            id: SchoolMenuEnum.AcademicTerm,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICTERMS",
            parentId: SchoolMenuEnum.Academics,
            link: "/school/configuration/academics/academic-terms",
            permission: PermissionActionEnum.School_ManageConfiguration,
          },
          {
            id: SchoolMenuEnum.AcademicPeriod,
            label: "MENUITEMS.ACADEMICS.LIST.ACADEMICPERIODS",
            parentId: SchoolMenuEnum.Academics,
            link: "/school/configuration/academics/academic-periods",
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
        link: "/school/reporting/report-cards",
        permission: PermissionActionEnum.School_ManageReports,
      },
      {
        id: SchoolMenuEnum.Transcripts,
        label: "MENUITEMS.REPORTS.LIST.TRANSCRIPTS",
        parentId: SchoolMenuEnum.Reports,
        icon: " ri-file-list-3-line",
        link: "/school/reporting/transcripts",
        permission: PermissionActionEnum.School_ManageReports,
      },
      {
        id: SchoolMenuEnum.MasterSheets,
        label: "MENUITEMS.REPORTS.LIST.MASTERSHEETS",
        parentId: SchoolMenuEnum.Reports,
        icon: "ri-survey-line",
        link: "/school/reporting/master-sheets",
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
        link: "/school/personnel/employees",
        permission: PermissionActionEnum.School_ViewPersonnel,
      },
      {
        id: SchoolMenuEnum.Teachers,
        label: "MENUITEMS.PERSONNEL.LIST.TEACHERS",
        icon: "ri-team-line",
        parentId: SchoolMenuEnum.Personnel,
        link: "/school/personnel/teachers",
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
        link: "/school/students/student-registration",
        permission: PermissionActionEnum.School_ManageStudents,
      },
      {
        id: SchoolMenuEnum.StudentEnrollments,
        label: "MENUITEMS.STUDENTS.LIST.ENROLLMENTS",
        icon: "ri-swap-box-line",
        parentId: SchoolMenuEnum.Students,
        link: "/school/students/student-enrollments",
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
        link: "/school/results/register-results",
        permission: PermissionActionEnum.School_RegisterResults,
      },
      {
        id: SchoolMenuEnum.ResultHistory,
        label: "MENUITEMS.RESULTS.LIST.RESULTHISTORY",
        parentId: SchoolMenuEnum.Results,
        icon: "ri-history-line",
        link: "/school/results/result-history",
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
        link: "/school/parents",
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
            link: "/school/attendance/student-attendance",
            permission: PermissionActionEnum.School_ViewAttendance,
          },
          {
            id: SchoolMenuEnum.TeacherAttendance,
            label: "MENUITEMS.ATTENDANCE.LIST.TEACHERATTENDANCE",
            parentId: SchoolMenuEnum.Attendance,
            link: "/school/attendance/teacher-attendance",
            permission: PermissionActionEnum.School_ViewAttendance,
          },
        ],
      },

      {
        id: SchoolMenuEnum.Exams,
        label: "MENUITEMS.EXAMS.TEXT",
        icon: "ri-pencil-ruler-line",
        link: "/school/exams",
        permission: PermissionActionEnum.School_ViewExams,
      },

      {
        id: SchoolMenuEnum.Library,
        label: "MENUITEMS.LIBRARY.TEXT",
        icon: "ri-book-2-fill",
        permission: PermissionActionEnum.School_ViewLibrary,
        link: "/school/library",
      },
      {
        id: SchoolMenuEnum.Inventory,
        label: "MENUITEMS.INVENTORY.TEXT",
        icon: " ri-shopping-cart-2-fill",
        permission: PermissionActionEnum.School_ViewInventory,
        link: "/school/inventory",
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
            link: "/school/finance/subscriptions",
            permission: PermissionActionEnum.School_ManageSubscription,
          },
        ],
      },
      {
        id: SchoolMenuEnum.Boarding,
        label: "MENUITEMS.BOARDING.TEXT",
        icon: "ri-community-line",
        permission: PermissionActionEnum.School_ViewBoarding,
        link: "/school/boarding",
      },

      {
        id: SchoolMenuEnum.Transportation,
        label: "MENUITEMS.TRANSPORTATION.TEXT",
        icon: "ri-bus-line",
        permission: PermissionActionEnum.School_ViewTransportation,
        link: "/school/transportation",
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
            link: "/school/users/roles",
            permission: PermissionActionEnum.School_ManageUsers,
          },
          {
            id: SchoolMenuEnum.ManageUsers,
            label: "MENUITEMS.USERS.LIST.MANAGEUSERS",
            parentId: SchoolMenuEnum.Users,
            link: "/school/users/manage-users",
            permission: PermissionActionEnum.School_ManageUsers,
          },
        ],
      },
    ],
  },
];
