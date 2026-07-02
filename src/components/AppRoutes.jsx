import { Routes, Route, Navigate } from "react-router-dom"; 
import { useRole } from "../hooks/useRole";
import { useMemo } from "react";
import { buildUserNavOptions } from "../Utils/BulidUserNavOptions";
import AssignIncubationEvaluatorsPage from "../pages/Admin/AssignIncubationEvaluatorsPage";
import DashboardLayout from "./layout/DashboardLayout";
import AdminLayout from "./Layout/AdminLayout";
import SecretaryLayout from "./Layout/SecretaryLayout";

import LandingPage1 from "../pages/LandingPage1";
import LandingPage2 from "../pages/LandingPage2";
import SignupPage from "../pages/Auth/SignupPage";
import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgetPasswordPage";
import VerificationPage from "../pages/Auth/VerificationPage";
import NewPasswordPage from "../pages/Auth/NewPasswordPage";

import ProjectDetailsPage from "../pages/Shared/ProjectDetailsPage";
import WorkshopDetailsPage from "../pages/Shared/WorkshopDetailsPage";

import IdeaFormPage from "../pages/Shared/IdeaFormPage";
import VolunteerFormPage from "../pages/Shared/VolunteerFormPage";

import MainLayout from "./Layout/MainLayout";
import UserNavbar from "./UserNavbar";

import VisitorMainPage from "../pages/Visitor/VisitorMainPage";
import ProjectsPage from "../pages/Shared/ProjectsPage";
import ActivitiesPage from "../pages/Shared/ActivitiesPage";
import FavoritesPage from "../pages/Visitor/FavoritesPage";
import NotificationsPage from "../features/notifications/pages/NotificationsPage";
import MessagesPage from "../features/messaging/pages/MessagesPage";

import ProfileInfoPage from "../pages/IdeaOwner/ProfileInfoPage";

import ProfilePage from "../pages/Shared/ProfilePage";
import ContactPage from "../pages/Shared/ContactPage";
import SettingsPage from "../pages/Shared/SettingsPage";
import ChangePasswordPage from "../pages/Shared/ChangePasswordPage";

import ConsultantsPage from "../pages/IdeaOwner/ConsultantsPage";
import ConsultantsListPage from "../pages/IdeaOwner/ConsultantsListPage";
import TeamPage from "../pages/IdeaOwner/TeamPage";
import IdeaOwnerMainPage from "../pages/IdeaOwner/IdeaOwnerMainPage";
import TeamRequestPage from "../pages/IdeaOwner/TeamRequestPage";
import IncubationStagesPage from "../pages/IdeaOwner/IncubationStagesPage";
import VolunteerCenterPage from "../pages/Volunteer/VolunteerCenterPage";
import VolunteerMainPage from "../pages/Volunteer/VolunteerMainPage";
import VolunteerRequestsPage from "../pages/Volunteer/VolunteerRequestsPage";
import ScheduleManagementPage from "../pages/Volunteer/ScheduleManagementPage";
import AddWorkshopPage from "../pages/Volunteer/AddWorkshopPage";
import AssignedProjectsPage from "../pages/Volunteer/AssignedProjectsPage";
import WorkshopsPage from "../pages/Volunteer/WorkshopsPage";
import WorkshopInfoPage from "../pages/Volunteer/WorkshopInfoPage";
import VolunteerRequestDetailsPage from "../pages/Volunteer/VolunteerRequestDetailsPage";
import EditVolunteerProfilePage from "../pages/Volunteer/EditVolunteerProfilePage";
import ProjectInfoPage from "../pages/Volunteer/ProjectInfoPage";
import IncubationInfoPage from "../pages/Incubation/IncubationInfoPage";
import EvaluationCenterPage from "../pages/Evaluation/EvaluationCenterPage";
import EvaluatedMainPage from "../pages/Evaluation/EvaluatedMainPage";
import EvaluationFormPage from "../pages/Evaluation/EvaluationFormPage";
import NotesPage from "../pages/Evaluation/NotesPage";
import ExhibitionCardPage from "../pages/Incubation/ExhibitionCardPage";
import IncubatedMainPage from "../pages/Incubation/IncubatedMainPage";

import AdminMainPage from "../pages/Admin/AdminMainPage";
import StatisticsPage from "../pages/Admin/StatisticsPage";
import UsersPage from "../pages/Admin/UsersPage";
import UserDetailsPage from "../pages/Admin/UserDetailsPage";
import TaskDetailsPage from "../pages/Admin/TaskDetailsPage";
import VolunteerRequestPage from "../pages/Admin/VolunteerRequestPage";
import VolunteersPage from "../pages/Admin/VolunteersPage";
import AdminSettingsPage from "../pages/Admin/AdminSettingsPage";
import IncubationSeasonsPage from "../pages/Admin/IncubationSeasonsPage";
import SeasonDetailsPage from "../pages/Admin/SeasonDetailsPage";
import IncubationRequestDetails from "../pages/Admin/IncubationRequestDetails";
import CreateSeasonPage from "../pages/Admin/CreateSeasonPage";
import PreviewFormPage from "../pages/Admin/PreviewFormPage";
import AddSessionPage from "../pages/Admin/AddSessionPage";
import CampManagementPage from "../pages/Admin/CampManagementPage";
import IncubatedPage from "../pages/Admin/IncubatedPage";
import WorkshopsTablePage from "../pages/Admin/WorkshopsTablePage";
import EvaluationManagementPage from "../pages/Admin/EvaluationManagementPage";
import AssignEvaluatorsPage from "../pages/Admin/AssignEvaluatorsPage";
import ProjectsManagementPage from "../pages/Admin/ProjectsManagementPage";
import CardRequestDetailsPage from "../pages/Admin/CardRequestDetailsPage";
import ExhibitionManagementPage from "../pages/Admin/ExhibitionManagementPage";
import LatestReviewPage from "../pages/Admin/LatestReviewPage";
import AdminProjectsDetailsPage from "../pages/Admin/AdminProjectsDetailsPage";
import GraduatedProjectsPage from "../pages/Admin/GraduatedProjectsPage";
import CampWorkshopsPage from "../pages/Volunteer/CampWorkshopsPage";
import CampProjectsPage from "../pages/Volunteer/CampProjectsPage";
import SelectingVolunteerPage from "../pages/Admin/SelectingVolunteerPage";

import IncubationReviewPage from "../pages/Evaluation/IncubationReviewPage";
import IncubationProjectInfoPage from "../pages/Incubation/IncubationProjectInfoPage";

import PublicWorkshopDetailsPage from "../pages/Volunteer/PublicWorkshopDetailsPage";
import AIConsultantChatPage from "../pages/AiConsultantChatPage";

const AppRoutes = () => {
  const { roles } = useRole();
  const userNavOptions = useMemo(() => {
    return buildUserNavOptions(roles || []);
  }, [roles]);

  return (
    <Routes>
      {/* Landing Routes */}
      <Route path="/" element={<LandingPage1 />} />
      <Route path="/about" element={<LandingPage2 />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgetpassword" element={<ForgotPasswordPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/new-password" element={<NewPasswordPage />} />

      <Route path="/ProjectDetails/:id" element={<ProjectDetailsPage />} />
      <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
      <Route
      path="/messagespage"
      element={<MessagesPage />}
      />

      <Route
      path="/messagespage/:id"
      element={<MessagesPage />}
      />

      <Route path="/ideaform" element={<IdeaFormPage />} />
      <Route path="/volunteerform" element={<VolunteerFormPage />} />

      {/* ---------------- VISITOR (تم تفكيك الـ && لحماية الـ DOM من الشلل الـ Routing) ---------------- */}
      <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
       <Route 
    path="/visitor-mainpage" 
    element={
      roles.includes("visitor") || localStorage.getItem("access_token") ? (
        <VisitorMainPage />
      ) : (
        <Navigate to="/login" replace />
      )
    } 
  />
        <Route path="/projectspage" element={<ProjectsPage />} />
        <Route path="/activitiespage" element={<ActivitiesPage />} />
        <Route path="/favoritespage" element={<FavoritesPage />} />
        <Route path="/notificationspage" element={<NotificationsPage />} />
        <Route path="/messagespage" element={<MessagesPage />} />
        <Route path="/messagespage/:id" element={<MessagesPage />} />
      </Route>

      <Route element={<DashboardLayout roles={roles} userName="" email="" />}>
        <Route path="/profile" element={<ProfilePage userName="" email="" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* ---------------- IDEA OWNER ---------------- */}
      {roles.includes("idea_owner") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/ideaowner-mainpage" element={<IdeaOwnerMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/messagespage/:id" element={<MessagesPage />} />
          <Route path="/incubation-stages" element={<IncubationStagesPage />} />
        </Route>
      )}

      {roles.includes("idea_owner") && (
        <Route element={<DashboardLayout roles={roles} userName="" email="" />}>
          <Route path="/profile" element={<ProfilePage userName="" email="" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/consultantslist/:categoryId" element={<ConsultantsListPage />} />
        </Route>
        
      )}

      {/* ---------------- VOLUNTEER ---------------- */}
      {roles.includes("volunteer") && (
        <Route element={<DashboardLayout roles={roles} userName="" email="" />}>
          <Route path="/volunteer-profile" element={<EditVolunteerProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/volunteer-center" element={<VolunteerCenterPage />} />
          <Route path="/requests-page" element={<VolunteerRequestsPage />} />
          
          <Route path="/schedule-page" element={<ScheduleManagementPage />} />
          <Route path="/workshopinfo/:id" element={<WorkshopInfoPage />} />
          <Route path="/assigned-projects-page" element={<AssignedProjectsPage />} />
          <Route path="/volunteer-request/:id" element={<VolunteerRequestDetailsPage />} />
          <Route path="/CampWorkShopsPage" element={<CampWorkshopsPage />} />
          <Route path="/CampProjectsPage/:workshopId" element={<CampProjectsPage />} />
        </Route>
      )}

      {roles.includes("volunteer") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/volunteer-mainpage" element={<VolunteerMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/messagespage/:id" element={<MessagesPage />} />
        </Route>
      )}
      <Route path="/workshop-page" element={<WorkshopsPage />} />

      {/* ---------------- EVALUATOR ---------------- */}
      {roles.includes("evaluator") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/evaluator-mainpage" element={<EvaluatedMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/messagespage/:id" element={<MessagesPage />} />
        </Route>
      )}

      {roles.includes("evaluator") && (
        <Route element={<DashboardLayout roles={roles} userName="" email="" />}>
          <Route path="/volunteer-profile" element={<EditVolunteerProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/evaluation-center" element={<EvaluationCenterPage />} />
          <Route path="/volunteer-center" element={<VolunteerCenterPage />} />
          <Route path="/requests-page" element={<VolunteerRequestsPage />} />
          <Route path="/workshop-page" element={<WorkshopsPage />} />
          <Route path="/workshopinfo/:id" element={<WorkshopInfoPage />} />
          <Route path="/schedule-page" element={<ScheduleManagementPage />} />
          <Route path="/evaluationform/:idea_id" element={<EvaluationFormPage />} />
          <Route path="/notes/:idea_id" element={<NotesPage />} />
          <Route path="/assigned-projects-page" element={<AssignedProjectsPage />} />
          <Route path="/volunteer-request/:id" element={<VolunteerRequestDetailsPage />} />
          <Route path="/incubation-review/:idea_id" element={<IncubationReviewPage />} />
        </Route>
      )}

      {/* ---------------- INCUBATOR ---------------- */}
      {roles.includes("incubator") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/incubator-mainpage" element={<IncubatedMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/messagespage/:id" element={<MessagesPage />} />
          <Route path="/incubation-stages" element={<IncubationStagesPage />} />
        </Route>
      )}

      {roles.includes("incubator") && (
        <Route element={<DashboardLayout roles={roles} userName="" email="" />}>
          <Route path="/profile" element={<ProfilePage userName="" email="" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/consultantslist/:categoryId" element={<ConsultantsListPage />} />
        </Route>
      )}

      {/* صفحات مشتركة */}
      <Route path="/workshopinfo/:id" element={<WorkshopInfoPage />} />
      <Route path="/evaluationform" element={<EvaluationFormPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/exhibition-card/:id" element={<ExhibitionCardPage />} />
      <Route path="/TeamRequestPage" element={<TeamRequestPage />} />
      <Route path="/AddworkshopPage" element={<AddWorkshopPage />} />
      <Route path="/projectinfo/:id" element={<ProjectInfoPage />} />
      <Route path="/incubation-projectinfo/:id" element={<IncubationProjectInfoPage />} />
      <Route path="/incubationinfo/:idea_id" element={<IncubationInfoPage />} />
      <Route path="/profileinfo/:userId" element={<ProfileInfoPage />} />
       <Route
            path="/public-workshops/:workshop_id"
            element={<PublicWorkshopDetailsPage />}
          />
           <Route path="/ai-consultant/:categoryId" element={<AIConsultantChatPage />}/>

      {/* ---------------- Admin ---------------- */}
      {roles.includes("admin") && (
        <Route element={<AdminLayout adminName="" email="" />}>
          <Route path="/admin-mainpage" element={<AdminMainPage />} />
          <Route path="/admin/statistics" element={<StatisticsPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/volunteers" element={<VolunteersPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/admin/seasons" element={<IncubationSeasonsPage />} />
         
          <Route path="/admin/add-session/:id" element={<AddSessionPage />} />
          <Route path="/admin/camp-management/:id" element={<CampManagementPage />} />
          <Route path="/admin/incubated" element={<IncubatedPage />} />
          <Route path="/admin/workshops" element={<WorkshopsTablePage />} />
          <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
          <Route path="/admin/evaluation" element={<EvaluationManagementPage />} />
          <Route path="/admin/assign-evaluators/:id" element={<AssignEvaluatorsPage />} />
          <Route path="/admin/assigned-projects" element={<ProjectsManagementPage />} />
          <Route path="/admin/exhibition" element={<ExhibitionManagementPage />} />
          <Route path="/requests-details/:submissionId" element={<CardRequestDetailsPage />} />
          <Route path="/Selectingvolunteer/:teamRequestId" element={<SelectingVolunteerPage />} />
        </Route>
      )}
      {roles.includes("admin") && (
        <Route>
          <Route path="/admin/users/:id" element={<UserDetailsPage />} />
          <Route path="/admin/incubation_seasons/applications/:id" element={<IncubationRequestDetails />} />
          <Route path="/admin/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="/admin/details/:id" element={<VolunteerRequestPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/messagespage/:id" element={<MessagesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/admin/assign-incubation-evaluators/:id" element={<AssignIncubationEvaluatorsPage />} />
          <Route path="/admin/latest-review/:idea_id" element={<LatestReviewPage />} />
          <Route path="/admin/projects-details/:id" element={<AdminProjectsDetailsPage />} />
          <Route path="/admin/graduated-projects" element={<GraduatedProjectsPage />} /> 
          <Route path="/admin/create-season" element={<CreateSeasonPage />} />
          <Route path="/admin/preview-form" element={<PreviewFormPage />} /> 
          <Route path="/incubation-seasons/:id" element={<SeasonDetailsPage />} />
        </Route>
      )}
      {/* ---------------- secretary ---------------- */}
      {roles.includes("secretary") && (
        <Route element={<SecretaryLayout adminName="" email="" />}>
          <Route path="/admin-mainpage" element={<AdminMainPage />} />
           <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/volunteers" element={<VolunteersPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/admin/seasons" element={<IncubationSeasonsPage />} />
         
         <Route path="/admin/add-session/:id" element={<AddSessionPage />} />
          <Route path="/admin/camp-management/:id" element={<CampManagementPage />} />
          <Route path="/admin/incubated" element={<IncubatedPage />} />
          <Route path="/admin/workshops" element={<WorkshopsTablePage />} />
          <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
          <Route path="/admin/evaluation" element={<EvaluationManagementPage />} />
          <Route path="/admin/assigned-projects" element={<ProjectsManagementPage />} />
          <Route path="/admin/exhibition" element={<ExhibitionManagementPage />} />
          <Route path="/requests-details/:submissionId" element={<CardRequestDetailsPage />} />
          <Route path="/Selectingvolunteer/:teamRequestId" element={<SelectingVolunteerPage />} />
           </Route>
      )}
      {roles.includes("secretary") && (
        <Route>
          <Route path="/admin/incubation_seasons/applications/:id" element={<IncubationRequestDetails />} />
          <Route path="/admin/details/:id" element={<VolunteerRequestPage />} />
          <Route path="/admin/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/messagespage/:id" element={<MessagesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
           <Route path="/admin/create-season" element={<CreateSeasonPage />} />
          <Route path="/admin/latest-review/:idea_id" element={<LatestReviewPage />} />
          <Route path="/admin/projects-details/:id" element={<AdminProjectsDetailsPage />} />
          <Route path="/admin/graduated-projects" element={<GraduatedProjectsPage />} /> 
          <Route path="/incubation-seasons/:id" element={<SeasonDetailsPage />} />
        </Route>
      )}
     
    </Routes>
  );
};

export default AppRoutes;