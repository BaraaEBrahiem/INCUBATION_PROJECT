import { Routes, Route } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import { buildUserNavOptions } from"../Utils/BulidUserNavOptions";
import AssignIncubationEvaluatorsPage
from "../pages/Admin/AssignIncubationEvaluatorsPage";
import DashboardLayout from "./layout/DashboardLayout";
import AdminLayout from "./Layout/AdminLayout";

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
import NotificationsPage from "../pages/Shared/NotificationsPage";
import MessagesPage from "../pages/Shared/MessagesPage";

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
import CampWorkshopsPage from "../pages/Volunteer/CampWorkShopPage";
import CampProjectsPage from "../pages/Volunteer/CampProjectsPage";

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
import SelectingVolunteerPage from "../pages/Admin/SelectingVolunteerPage";

import AdminSettingsPage from "../pages/Admin/AdminSettingsPage";
import IncubationSeasonsPage from "../pages/Admin/IncubationSeasonsPage";
import SeasonDetailsPage from "../pages/Admin/SeasonDetailsPage"
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
const AppRoutes = () => {
    const { roles } = useRole();
    const userNavOptions = buildUserNavOptions(roles);
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
      <Route path="/messagespage/:id" element={<MessagesPage />} />

      <Route path="/ideaform" element={<IdeaFormPage />} />
      <Route path="/volunteerform" element={<VolunteerFormPage />} />

      {/* ---------------- VISITOR ---------------- */}
      {roles.includes("visitor") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/visitor-mainpage" element={<VisitorMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/favoritespage" element={<FavoritesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
        </Route>
      )}

      {roles.includes("visitor") && (
        <Route element={<DashboardLayout roles={roles} userName="أسماء محمد" email="assmaa@example.com" />}>
          <Route path="/profile" element={<ProfilePage userName="أسماء محمد" email="assmaa@example.com" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>
      )}

      {/* ---------------- IDEA OWNER ---------------- */}
      {roles.includes("ideaOwner") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/ideaowner-mainpage" element={<IdeaOwnerMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          <Route path="/incubation-stages" element={<IncubationStagesPage />} />
        </Route>
      )}

      {roles.includes("ideaOwner") && (
        <Route element={<DashboardLayout roles={roles} userName="مريم أحمد" email="maryam@example.com" />}>
          <Route path="/profile" element={<ProfilePage userName="مريم أحمد" email="maryam@example.com" />} />
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
        <Route element={<DashboardLayout roles={roles} userName="مايا محمد" email="maya@example.com" />}>
          <Route path="/volunteer-profile" element={<EditVolunteerProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/volunteer-center" element={<VolunteerCenterPage />} />
          <Route path="/requests-page" element={<VolunteerRequestsPage />} />
          <Route path="/workshop-page" element={<WorkshopsPage />} />
           <Route path="/CampWorkShopsPage" element={<CampWorkshopsPage/>}/>
          <Route path ="/CampProjectsPage" element={<CampProjectsPage/>}/>
         
          <Route path="/schedule-page" element={<ScheduleManagementPage />} />
          <Route path="/workshopinfo/:id" element={<WorkshopInfoPage />} />
          <Route path="/assigned-projects-page" element={<AssignedProjectsPage />} />
          <Route path="/volunteer-request/:id" element={<VolunteerRequestDetailsPage />} />
        </Route>
      )}

      {roles.includes("volunteer") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/volunteer-mainpage" element={<VolunteerMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
        </Route>
      )}

      {/* ---------------- VOLUNTEER EVALUATOR ---------------- */}
      {roles.includes("volunteer_evaluator") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/volunteer-evaluated-mainpage" element={<EvaluatedMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
          
        </Route>
      )}

      {roles.includes("volunteer_evaluator") && (
        <Route element={<DashboardLayout roles={roles} userName="مايا محمد" email="maya@example.com" />}>
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
            <Route path="/evaluationform" element={<EvaluationFormPage />} />
            <Route path="/notes/:id" element={<NotesPage />} />
           <Route path="/assigned-projects-page" element={<AssignedProjectsPage />} />
          <Route path="/volunteer-request/:id" element={<VolunteerRequestDetailsPage />} />
        </Route>
      )}

      {/* ---------------- VOLUNTEER INCUBATED ---------------- */}
      {roles.includes("volunteer_incubated") && (
        <Route element={<MainLayout header={<UserNavbar navOptions={userNavOptions} />} footer={null} />}>
          <Route path="/volunteer-incubated-mainpage" element={<IncubatedMainPage />} />
          <Route path="/projectspage" element={<ProjectsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/notificationspage" element={<NotificationsPage />} />
          <Route path="/messagespage" element={<MessagesPage />} />
           <Route path="/incubation-stages" element={<IncubationStagesPage />} />
        </Route>
      )}

      {roles.includes("volunteer_incubated") && (
        <Route element={<DashboardLayout roles={roles} userName="مايا محمد" email="maya@example.com" />}>
          <Route path="/volunteer-profile" element={<EditVolunteerProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/volunteer-center" element={<VolunteerCenterPage />} />
          <Route path="/volunteer-request/:id" element={<VolunteerRequestDetailsPage />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/assigned-projects-page" element={<AssignedProjectsPage />} />
           <Route path="/requests-page" element={<VolunteerRequestsPage />} />
          <Route path="/workshop-page" element={<WorkshopsPage />} />
           <Route path="/workshopinfo/:id" element={<WorkshopInfoPage />} />
           <Route path="/schedule-page" element={<ScheduleManagementPage />} />
          <Route path="/consultantslist/:categoryId" element={<ConsultantsListPage />} />
        </Route>
      )}

      {/* صفحات مشتركة */}
      <Route path="/evaluationform" element={<EvaluationFormPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/exhibition-card" element={<ExhibitionCardPage />} />
      <Route path="/TeamRequestPage" element={<TeamRequestPage />} />
      <Route path="/AddworkshopPage" element={<AddWorkshopPage />} />
      <Route path="/projectinfo/:id" element={<ProjectInfoPage />} />
      <Route path="/incubationinfo" element={<IncubationInfoPage />} />
      <Route path="/profileinfo/:userId" element={<ProfileInfoPage />} />

     {/* ---------------- Admin ---------------- */}
      {roles.includes("admin") && (
        <Route element={<AdminLayout adminName="مايا محمد" email="maya@example.com" />}>
          <Route path="/admin-mainpage" element={<AdminMainPage />} />
          <Route path="/admin/statistics" element={<StatisticsPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/volunteers" element={<VolunteersPage />} />
          <Route path="/Selectingvolunteer" element={<SelectingVolunteerPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/admin/seasons" element={<IncubationSeasonsPage />} />
          <Route path="/incubation-seasons/:id" element={<SeasonDetailsPage />} />
          <Route path="/admin/create-season" element={<CreateSeasonPage />} />
          <Route path="/admin/preview-form" element={<PreviewFormPage />} />
          <Route path="/admin/add-session/:id" element={<AddSessionPage />} />
          <Route path="/admin/camp-management/:id" element={<CampManagementPage />} />
          <Route path="/admin/incubated" element={<IncubatedPage />} />
          <Route path="/admin/workshops" element={<WorkshopsTablePage />} />
          <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
          <Route path="/admin/evaluation" element={<EvaluationManagementPage/>} />
          <Route path= "/admin/assign-evaluators/:id" element={<AssignEvaluatorsPage />} />
          <Route path="/admin/assigned-projects" element={<ProjectsManagementPage />} />
          <Route path="/admin/exhibition" element={<ExhibitionManagementPage/>} />
          <Route path="/requests-details/:id" element={<CardRequestDetailsPage />} />
        </Route>
      )} 
      {roles.includes("admin") && (
      <Route>
      <Route path="/admin/users/visitor/:id" element={<UserDetailsPage />} />
      <Route path="/admin/users/volunteer/:id" element={<UserDetailsPage />} />
      <Route path="/admin/users/incubated/:id" element={<UserDetailsPage />} />
      <Route path="/admin/users/graduated/:id" element={<UserDetailsPage />} />
      <Route path="/admin/users/idea-owner/:id" element={<UserDetailsPage />} />
      <Route path="/admin/incubation_seasons/applications/:id" element={<IncubationRequestDetails />} />
      <Route path="/admin/tasks/:taskId" element={<TaskDetailsPage />} />
      <Route path="/admin/details/:id" element={<VolunteerRequestPage />} />
      <Route path="/messagespage" element={<MessagesPage />} />
      <Route path="/notificationspage" element={<NotificationsPage />} />
      <Route path="/projectspage" element={<ProjectsPage />} />
      <Route
  path="/admin/assign-incubation-evaluators/:id"
  element={
    <AssignIncubationEvaluatorsPage />
  }
/>
      </Route>
      )}
      
    </Routes>
  );
};

export default AppRoutes;
