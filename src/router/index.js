import { createRouter, createWebHistory } from "vue-router";
// import Toast from "../alert/alert.js";
import LogIn from '@/pages/signin/LogIn.vue'
import SignUp from '@/pages/signup/SignUp.vue'
import HomeVue from '@/pages/main/Home.vue'
import CompanyApprove from '@/components/modals/CompanyApprove.vue'
//import CancelCompanyApprove from '@/components/modals/CancelCompanyApprove.vue'
import CorporateApprovedenied from '@/components/modals/CorporateApprovedenied.vue'
import CompletionCompanyApprovalRequest from '@/components/modals/CompletionCompanyApprovalRequest.vue'
// import OtpnotRegistered from '@/components/modals/OtpnotRegistered.vue'
import OtpRegistrationCompleted from '@/components/modals/OtpRegistrationCompleted.vue'
// import RegisterOtp from '@/components/modals/RegisterOtp.vue'
// import OtpRegistrationFailed from '@/components/modals/OtpRegistrationFailed.vue'
import LicenseExpiration from '@/components/modals/LicenseExpiration.vue'
import LicenseExpirationD3 from '@/components/modals/LicenseExpirationD3.vue'
import UserClickMessage from '@/pages/common/UserClickMessage.vue'
import ElectronicPayment from '@/pages/common/ElectronicPayment.vue'
import EvidencePayment from '@/pages/common/EvidencePayment.vue'
import ApprovalManagement from '@/components/modals/ApprovalManagement.vue'
// import PaymentCompleted from '@/components/modals/PaymentCompleted.vue'
import ChooseCompany from '@/components/modals/ChooseCompany.vue'
import KeepCompanyOfYourChoice from '@/components/modals/KeepCompanyOfYourChoice.vue'
import UnableToConnect from '@/components/modals/UnableToConnect.vue'
import DataBackupAvailable from '@/components/modals/DataBackupAvailable.vue'
import CancelDataBackup from '@/components/modals/CancelDataBackup.vue'
import FindEmailOtpVerification from '@/pages/signin/FindEmailOtpVerification.vue'
import FindEmailOtpVerificationModal from '@/components/modals/FindEmailOtpVerificationModal.vue'
import FindPasswordPage from '@/pages/signin/FindPasswordPage.vue'
import PasswordResetPage from '@/pages/signin/PasswordResetPage.vue'
import SignUpCompanyCode from '@/pages/signup/SignUpCompanyCode.vue'
import SignupModal from '@/components/modals/SignupModal.vue'
import VerifyPassword from '@/pages/changeuserinformation/VerifyPassword.vue'
import ChangeUserInformation from '@/pages/changeuserinformation/ChangeUserInformation.vue'
import ChangeUserInformationPasswordReset from '@/pages/changeuserinformation/ChangeUserInformationPasswordReset.vue'
import VerifyPasswordWithTheCurrentPassword from '@/pages/changeuserinformation/VerifyPasswordWithTheCurrentPassword.vue'
import RegisterAdditionalCompanyerror from '@/components/modals/RegisterAdditionalCompanyerror.vue'
import RegisterAdditionalCompany from '@/components/modals/RegisterAdditionalCompany.vue'
import InformationProtectionPolicy from '@/pages/policymanagement/InformationProtectionPolicy.vue'
import InformationProtectionPolicyadded from '@/pages/policymanagement/InformationProtectionPolicyadded.vue'
import InformationProtectionPolicyaddedSucessfulModal from '@/components/modals/InformationProtectionPolicyaddedSucessfulModal.vue'
import ViewEvidenceDetails from '@/pages/policymanagement/ViewEvidenceDetails.vue'
import InformationProtectionPolicySetting from '@/pages/policymanagement/InformationProtectionPolicySetting.vue'
import InformationProtectionPolicySettingWithContent from '@/pages/policymanagement/InformationProtectionPolicySettingWithContent.vue'
import AssetListSelection from '@/pages/assetmanagement/AssetListSelection.vue'
import AddAssetsCorrectionDelete from '@/pages/assetmanagement/AddAssetsCorrectionDelete.vue'
import MyRevisionHistory from '@/pages/assetmanagement/MyRevisionHistory.vue'
import AssetClassificationColumnSetting from '@/pages/assetmanagement/AssetClassificationColumnSetting.vue'
import EditAssetGroup from '@/pages/assetmanagement/EditAssetGroup.vue'
import AssetSharing from '@/pages/assetmanagement/AssetSharing.vue'
import AssetShareRequest from '@/components/modals/AssetShareRequest.vue'
import AssetSharingHistory from '@/pages/assetmanagement/AssetSharingHistory.vue'
import AssetSharingHistorytwo from '@/pages/assetmanagement/AssetSharingHistorytwo.vue'
import AssetSharingHistorythree from '@/pages/assetmanagement/AssetSharingHistorythree.vue'
import AssetShareRequestModal from '@/components/modals/AssetShareRequestModal.vue'
import AssetClassificationCriteria from '@/components/modals/AssetClassificationCriteria.vue'
import AssetMaterialityAssessmentCriteria from '@/components/modals/AssetMaterialityAssessmentCriteria.vue'
import AssetLedgerDownload from '@/components/modals/AssetLedgerDownload.vue'
import NetworkDiagram from '@/pages/assetmanagement/NetworkDiagram.vue'
import ImageAdditionModal from '@/components/modals/ImageAdditionModal.vue'
import DeleteTheSchematics from '@/components/modals/DeleteTheSchematics.vue'
import UnableToUpload from '@/components/modals/UnableToUpload.vue'
import DeleteCompleted from '@/components/modals/DeleteCompleted.vue'
import CheckAttachment from '@/components/modals/CheckAttachment.vue'
import EstablishmentOperationManagementSystem from '@/pages/diagnosismanagement/EstablishmentOperationManagementSystem.vue'
import DetailsEstablishmentOperationOfManagementSystem from '@/pages/diagnosismanagement/DetailsEstablishmentOperationOfManagementSystem.vue'
import DetailsPageWithResult from '@/pages/diagnosismanagement/DetailsPageWithResult.vue'
import StartingDiagnosisFrom3rdTimeOnwards from '@/components/modals/StartingDiagnosisFrom3rdTimeOnwards.vue'
import StartDiagnosisButtonSelectedWithoutAnyPreviousResult from '@/components/modals/StartDiagnosisButtonSelectedWithoutAnyPreviousResult.vue'
import FailedToCompleteDiagnosis from '@/components/modals/FailedToCompleteDiagnosis.vue'
import DiagnosisComplete from '@/components/modals/DiagnosisComplete.vue'
import UserConfirmationForProceedingFinalDiagnosis from '@/components/modals/UserConfirmationForProceedingFinalDiagnosis.vue'
import TechnicalDiagnosticResults from '@/pages/diagnosismanagement/TechnicalDiagnosticResults.vue'
import TechnicalDiagnosticResultstwo from '@/pages/diagnosismanagement/TechnicalDiagnosticResultstwo.vue'
import TechnicalDiagnosticResultsmodalone from '@/components/modals/TechnicalDiagnosticResultsmodalone.vue'
import TechnicalDiagnosticResultsmodaltwo from '@/components/modals/TechnicalDiagnosticResultsmodaltwo.vue'
import DetailedResult from '@/pages/diagnosismanagement/DetailedResult.vue'
import DetailedTechnicalDiagnosisResult from '@/pages/diagnosismanagement/DetailedTechnicalDiagnosisResult.vue'
import DetailedTechnicalDiagnosisResulttwo from '@/pages/diagnosismanagement/DetailedTechnicalDiagnosisResulttwo.vue'
import DetailedTechnicalDiagnosisResultServerOnClick from '@/pages/diagnosismanagement/DetailedTechnicalDiagnosisResultServerOnClick.vue'
import ResultReportUploadDiagnosisSelection from '@/pages/diagnosismanagement/ResultReportUploadDiagnosisSelection.vue'
import DetailedTechnicalDiagnosisResultFromCompany from '@/pages/diagnosismanagement/DetailedTechnicalDiagnosisResultFromCompany.vue'
import DetailedTechnicalDiagnosisResultSecondOngoingDiagnosis from '@/pages/diagnosismanagement/DetailedTechnicalDiagnosisResultSecondOngoingDiagnosis.vue'
import ManualDiagnosisImplementation from '@/pages/diagnosismanagement/ManualDiagnosisImplementation.vue'
import ConfirmChangesModal from '@/components/modals/ConfirmChangesModal.vue'
import ThreatAnalysisSelection from '@/pages/riskmanagement/ThreatAnalysisSelection.vue'
import DashboardOne from '@/pages/dashboard/DashboardOne.vue'
import FindId from '@/pages/signin/FindId.vue'
import FindPassword from '@/pages/signin/FindPassword.vue'
import NoticeOne from '@/pages/customercenter/NoticeOne.vue'
import NoticeDetails from '@/pages/customercenter/NoticeDetails.vue'
import NoticeHowtouse from '@/pages/customercenter/NoticeHowtouse.vue'
import NoticeInquiry from '@/pages/customercenter/NoticeInquiry.vue'
import AddInquiry from '@/pages/customercenter/AddInquiry.vue'
import editInquiry from '@/pages/customercenter/editInquiry.vue'
import userAdmin from "@/pages/useradmin/userAdmin.vue"
import userAprovePending from "@/pages/useradmin/userAprovePending.vue"
import userAproveComplete from "@/pages/useradmin/userAproveComplete.vue"
import permissionClassificationManagement from "@/pages/useradmin/permissionClassificationManagement.vue"
import LogManagement from "@/pages/useradmin/LogManagement/LogManagement.vue"
import NoticeFaq from "@/pages/customercenter/NoticeFaq.vue"
import VerifyOtp from "@/components/modals/VerifyOtp.vue"
import FaqSidebar from "@/components/FaqSidebar.vue"
import FaqRightside from "@/components/FaqRightside.vue"
import AddInquiryDetails from "@/pages/customercenter/AddInquiryDetails.vue"
import NoticeBoard from "@/pages/bulletinboard/NoticeBoard.vue"
import Writeabulletinboardpost from "@/pages/bulletinboard/Writeabulletinboardpost.vue"
import bulletinboarddetails from "@/pages/bulletinboard/bulletinboarddetails.vue"
import NoticeBoardForUserAdminRight from "@/pages/bulletinboard/NoticeBoardForUserAdminRight.vue"
import LicenseExtension from "@/components/modals/LicenseExtension.vue"
import LicensePackage from "@/components/modals/LicensePackage.vue"
import ChangeLicensePackage from "@/components/modals/ChangeLicensePackage.vue"
// import ManageBulletinBoardsforCorrection from "@/components/modals/ManageBulletinBoardsforCorrection.vue"
import ScheduleManagement from "@/pages/schedulemanagement/ScheduleManagement.vue"
import AddAnEvent from "@/components/modals/AddAnEvent.vue"
import CalenderSharing from "@/components/modals/CalenderSharing.vue"
import ManagementDiagnosisSettingsList from "@/pages/useradmin/ManagementDiagnosisSettingsList.vue"
import TechnicalDiagnosisSettingsList from "@/pages/useradmin/TechnicalDiagnosisSettingsList.vue"
import ManagementDiagnosisSettingsModal from "@/components/modals/ManagementDiagnosisSettingsModal.vue"
import UserAdminSidebar from "@/components/UserAdminSidebar.vue"
import TechnicalDiagnosisSettingSelection from "@/pages/useradmin/TechnicalDiagnosisSettingSelection.vue"
import TechnicalDiagnosisSettingsform from "@/pages/useradmin/TechnicalDiagnosisSettingsform.vue"
import TechnicalDiagnosisTemplateAdd from "@/pages/useradmin/TechnicalDiagnosisTemplateAdd.vue"
import TechnicalDiagnosisAdd from "@/pages/useradmin/TechnicalDiagnosisAdd.vue"
import LicenseManagement from "@/pages/useradmin/LicenseManagement.vue"
import RefundRequest from "@/components/modals/RefundRequest.vue"
import LicenseList from "@/components/modals/LicenseList.vue"
import EvidenceListPage from "@/pages/avidencemanagement/EvidenceListPage.vue"
import DetailsOfEvidenceOne from "@/pages/avidencemanagement/DetailsOfEvidenceOne.vue"
import DetailsOfEvidenceTwo from "@/pages/avidencemanagement/DetailsOfEvidenceTwo.vue"
import DetailsOfEvidenceThree from "@/pages/avidencemanagement/DetailsOfEvidenceThree.vue"
import AddEvidence from "@/pages/avidencemanagement/Addevidence.vue"
import EvidenceGrouping from "@/pages/avidencemanagement/EvidenceGrouping.vue"
import SelectFormModalOne from "@/components/modals/SelectFormModalOne.vue"
import SelectFormModalOneNoSearchTerms from "@/components/modals/SelectFormModalOneNoSearchTerms.vue"
import ListOfControlsModal from "@/components/modals/ListOfControlsModal.vue"
import TraceManagementControl from "@/components/modals/TraceManagementControl.vue"
import ChooseApproval from "@/components/modals/ChooseApproval.vue"
import EvidenceDeleteHistory from "@/components/modals/EvidenceDeleteHistory.vue"
import EvidenceSave from "@/components/modals/EvidenceSave.vue"
import ApprovalPayment from "@/components/modals/ApprovalPayment.vue"
import EvidenceDelete from "@/components/modals/EvidenceDelete.vue"
import ApprovalUnauthorizedUser from "@/components/modals/ApprovalUnauthorizedUser.vue"
import CallingDiagnosticResults from "@/components/modals/CallingDiagnosticResults.vue"
import RelatedDocument from "@/components/modals/RelatedDocument.vue"
import RecordEvidence from "@/components/modals/RecordEvidence.vue"
import EnactmentRevisionHistory from "@/pages/avidencemanagement/EnactmentRevisionHistory.vue"
import OperatingStatement from "@/pages/avidencemanagement/OperatingStatement.vue"
import AddPermissionClasification from "@/pages/useradmin/AddPermissionClasification.vue"
import TechnicalDiagnosisEditItemGroup from "@/pages/useradmin/TechnicalDiagnosisEditItemGroup.vue";
import TechnicalDiagnosisaddItemGroup from "@/pages/useradmin/TechnicalDiagnosisaddItemGroup.vue";
import RiskAssessmentResults from '@/pages/riskmanagement/RiskAssessmentResults.vue';
import RiskAssessmentResultsTechnicalArea from '@/pages/riskmanagement/RiskAssessmentResultsTechnicalArea.vue';
import InformationProtectionPlan from '@/pages/riskmanagement/InformationProtectionPlan.vue';
import InformationProtectionPlanTwo from '@/pages/riskmanagement/InformationProtectionPlanTwo.vue';
import ChangeOnce from '@/components/modals/ChangeOnce.vue';
import AddOnSetting from '@/pages/useradmin/AddOnSetting.vue';
import CalculationCriteria from '@/components/modals/CalculationCriteria.vue';
import SelectionRiskManagementlevel from '@/pages/riskmanagement/SelectionRiskManagementlevel.vue';
import DynamicTab from "@/components/DynamicTabTest.vue";
import PermissionList from "@/pages/useradmin/PermissionList.vue";
import ThreatAnalysis from "@/pages/riskmanagement/ThreatAnalysis.vue";
import ChangeCriteria from "@/pages/useradmin/ChangeCriteria.vue";
import PresetDetails from "@/pages/avidencemanagement/PresetDetails.vue";
import DashboardSetUp from '@/components/modals/DashboardSetUp.vue';
import establishmentOperationManagementSystemmodal from '@/components/modals/establishmentOperationManagementSystemmodal.vue';
import CalculationStandardmodal from '@/components/modals/CalculationStandardmodal.vue';
import CalculationStandardmodaltwo from '@/components/modals/CalculationStandardmodaltwo.vue';
import CalculationCriteriamodal from '@/components/modals/CalculationCriteriamodal.vue';
import EvaluationStandardModal from '@/components/modals/EvaluationStandardModal.vue';
import AutomaticUploadIntial from '@/pages/diagnosismanagement/AutomaticUploadIntial.vue'
import AutomaticUploadFinal from '@/pages/diagnosismanagement/AutomaticUploadFinal.vue'
import SocketQA from '@/pages/common/SocketQA.vue';
import terms from '@/pages/common/terms.vue';
import privacy from '@/pages/common/privacy.vue';
import Threatratingcriteria from '@/components/modals/Threatratingcriteria.vue';
import privacypolicymodal from '@/components/modals/privacypolicymodal.vue';
import termsandcondition from '@/components/modals/termsandcondition.vue';



function guest(to, from, next) {
  if (localStorage.token) {
    next({ name: "DashboardOne" });
    Toast.fire({ title: "You already logged in" });
  } else next();
}

function guard(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next({ name: "LogIn" });
    Toast.fire({ title: "Please login to access" });
  }
}

const routes = [
  {
    name: "SocketQA",
    path: "/SocketQA",
    component: SocketQA,
  },

  {
    name: "HomeVue",
    path: "/",
    redirect: { name: 'LogIn' },
    component: HomeVue,
    beforeEnter: guard
  },
  {
    name: "DashboardOne",
    path: "/dashboard",
    component: DashboardOne,
    beforeEnter: guard
  },
  {
    name: "LogIn",
    path: "/logIn",
    component: LogIn,
    beforeEnter: guest
  },
  {
    name: "SignUp",
    path: "/signUp/:id",
    component: SignUp,
    props : true,
    beforeEnter: guest
  },
  {
    name: "DynamicTab",
    path: "/dynamic-tab",
    component: DynamicTab,
    beforeEnter: guard
  },
  {
    name: "CompanyApprove",
    path: "/companyApprove",
    component: CompanyApprove
  },
  {
    name: "CorporateApprovedenied",
    path: "/corporateApprovedenied",
    component: CorporateApprovedenied
  },
  {
    name: "CompletionCompanyApprovalRequest",
    path: "/completionCompanyApprovalRequest",
    component: CompletionCompanyApprovalRequest
  },
  {
    name: "OtpRegistrationCompleted",
    path: "/otpRegistrationCompleted",
    component: OtpRegistrationCompleted
  },
  {
    name: "LicenseExpiration",
    path: "/licenseExpiration",
    component: LicenseExpiration
  },
  {
    name: "LicenseExpirationD3",
    path: "/licenseExpirationD3",
    component: LicenseExpirationD3
  },
  {
    name: "UserClickMessage",
    path: "/userClickMessage",
    component: UserClickMessage,
    beforeEnter: guard
  },
  {
    name: "ElectronicPayment",
    path: "/electronicPayment",
    component: ElectronicPayment,
    beforeEnter: guard
  },
  {
    name: "EvidencePayment",
    path: "/evidencePayment/:e_id?/:t_id?",
    component: EvidencePayment,
    beforeEnter: guard
  },
  {
    name: "ApprovalManagement",
    path: "/approvalManagement",
    component: ApprovalManagement
  },
  // {
  //   name: "PaymentCompleted",
  //   path: "/paymentCompleted",
  //   component: PaymentCompleted
  // },
  {
    name: "ChooseCompany",
    path: "/chooseCompany",
    component: ChooseCompany
  },
  {
    name: "KeepCompanyOfYourChoice",
    path: "/keepCompanyOfYourChoice",
    component: KeepCompanyOfYourChoice
  },
  {
    name: "UnableToConnect",
    path: "/unableToConnect",
    component: UnableToConnect
  },
  {
    name: "DataBackupAvailable",
    path: "/dataBackupAvailable",
    component: DataBackupAvailable
  },
  {
    name: "CancelDataBackup",
    path: "/cancelDataBackup",
    component: CancelDataBackup
  },
  {
    name: "FindEmailOtpVerification",
    path: "/findEmailOtpVerification",
    component: FindEmailOtpVerification
  },
  {
    name: "FindId",
    path: "/findId",
    component: FindId
  },
  {
    name: "FindPassword2",
    path: "/findPassword",
    component: FindPassword
  },
  {
    name: "FindEmailOtpVerificationModal",
    path: "/findEmailOtpVerificationModal",
    component: FindEmailOtpVerificationModal
  },
  {
    name: "FindPasswordPage",
    path: "/findPasswordPage",
    component: FindPasswordPage
  },
  {
    name: "PasswordResetPage",
    path: "/passwordResetPage/:id",
    component: PasswordResetPage
  },
  {
    name: "SignUpCompanyCode",
    path: "/signUpCompanyCode",
    component: SignUpCompanyCode
  },
  {
    name: "SignupModal",
    path: "/signupModal",
    component: SignupModal
  },
  {
    name: "VerifyPassword",
    path: "/verifyPassword",
    component: VerifyPassword
  },
  {
    name: "ChangeUserInformation",
    path: "/changeUserInformation",
    component: ChangeUserInformation,
    beforeEnter: guard
  },
  {
    name: "ChangeUserInformationPasswordReset",
    path: "/changeUserInformationPasswordReset",
    component: ChangeUserInformationPasswordReset
  },
  {
    name: "VerifyPasswordWithTheCurrentPassword",
    path: "/verifyPasswordWithTheCurrentPassword",
    component: VerifyPasswordWithTheCurrentPassword
  },
  {
    name: "RegisterAdditionalCompanyerror",
    path: "/registerAdditionalCompanyerror",
    component: RegisterAdditionalCompanyerror
  },
  {
    name: "RegisterAdditionalCompany",
    path: "/registerAdditionalCompany",
    component: RegisterAdditionalCompany
  },
  {
    name: "InformationProtectionPolicy",
    path: "/informationProtectionPolicy",
    component: InformationProtectionPolicy,
    beforeEnter: guard
  },
  {
    name: "InformationProtectionPolicyadded",
    path: "/informationProtectionPolicyadded",
    component: InformationProtectionPolicyadded,
    beforeEnter: guard
  },
  {
    name: "InformationProtectionPolicyaddedSucessfulModal",
    path: "/informationProtectionPolicyaddedSucessfulModal",
    component: InformationProtectionPolicyaddedSucessfulModal,
    beforeEnter: guard
  },
  {
    name: "ViewEvidenceDetails",
    path: "/viewEvidenceDetails/:id",
    component: ViewEvidenceDetails,
    beforeEnter: guard
  },
  {
    name: "InformationProtectionPolicySetting",
    path: "/informationProtectionPolicySetting",
    component: InformationProtectionPolicySetting,
    beforeEnter: guard
  },
  {
    name: "InformationProtectionPolicySettingWithContent",
    path: "/informationProtectionPolicySettingWithContent/:id?",
    component: InformationProtectionPolicySettingWithContent,
    beforeEnter: guard
  },
  {
    name: "AssetListSelection",
    path: "/assetListSelection",
    component: AssetListSelection,
    beforeEnter: guard
  },
  {
    name: "AddAssetsCorrectionDelete",
    path: "/addAssetsCorrectionDelete",
    component: AddAssetsCorrectionDelete,
    beforeEnter: guard
  },
  {
    name: "MyRevisionHistory",
    path: "/myRevisionHistory",
    component: MyRevisionHistory,
    beforeEnter: guard
  },
  {
    name: "AssetClassificationColumnSetting",
    path: "/assetClassificationColumnSetting",
    component: AssetClassificationColumnSetting,
    beforeEnter: guard
  },
  {
    name: "EditAssetGroup",
    path: "/editAssetGroup/:id?",
    component: EditAssetGroup,
    beforeEnter: guard
  },
  
  {
    name: "AssetSharing",
    path: "/assetSharing/:id?",
    component: AssetSharing,
    beforeEnter: guard
  },
  {
    name: "AssetShareRequest",
    path: "/assetShareRequest",
    component: AssetShareRequest,
    beforeEnter: guard
  },
  {
    name: "AssetSharingHistory",
    path: "/assetSharingHistory",
    component: AssetSharingHistory,
    beforeEnter: guard
  },
  {
    name: "AssetSharingHistorytwo",
    path: "/assetSharingHistorytwo/:id/:cName/:aName",
    component: AssetSharingHistorytwo,
    beforeEnter: guard
  },
  {
    name: "AssetSharingHistorythree",
    path: "/assetSharingHistorythree/:id/:s_id/:cName/:aName",
    component: AssetSharingHistorythree,
    props: true,
    beforeEnter: guard
  },
  // {
  //   name: "AssetSharingHistorythree",
  //   path: "/assetSharingHistorythree",
  //   component: AssetSharingHistorythree
  // },
  {
    name: "AssetShareRequestModal",
    path: "/assetShareRequestModal",
    component: AssetShareRequestModal
  },
  {
    name: "AssetClassificationCriteria",
    path: "/assetClassificationCriteria",
    component: AssetClassificationCriteria
  },
  {
    name: "AssetMaterialityAssessmentCriteria",
    path: "/assetMaterialityAssessmentCriteria",
    component: AssetMaterialityAssessmentCriteria
  },
  {
    name: "AssetLedgerDownload",
    path: "/assetLedgerDownload",
    component: AssetLedgerDownload
  },
  {
    name: "NetworkDiagram",
    path: "/networkDiagram",
    component: NetworkDiagram
  },
  {
    name: "ImageAdditionModal",
    path: "/imageAdditionModal",
    component: ImageAdditionModal
  },
  {
    name: "DeleteTheSchematics",
    path: "/deleteTheSchematics",
    component: DeleteTheSchematics
  },
  {
    name: "UnableToUpload",
    path: "/unableToUpload",
    component: UnableToUpload
  },
  {
    name: "DeleteCompleted",
    path: "/deleteCompleted",
    component: DeleteCompleted
  },
  {
    name: "CheckAttachment",
    path: "/checkAttachment",
    component: CheckAttachment
  },
  {
    name: "EstablishmentOperationManagementSystem",
    path: "/establishmentOperationManagementSystem/:ul?",
    component: EstablishmentOperationManagementSystem,
    beforeEnter: guard
  },
  {
    name: "DetailsEstablishmentOperationOfManagementSystem",
    path: "/detailsEstablishmentOperationOfManagementSystem/:ul?",
    component: DetailsEstablishmentOperationOfManagementSystem,
    beforeEnter: guard
  },
  {
    name: "DetailsPageWithResult",
    path: "/detailsPageWithResult",
    component: DetailsPageWithResult,
    beforeEnter: guard
  },
  {
    name: "StartingDiagnosisFrom3rdTimeOnwards",
    path: "/startingDiagnosisFrom3rdTimeOnwards",
    component: StartingDiagnosisFrom3rdTimeOnwards,
    beforeEnter: guard
  },
  {
    name: "StartDiagnosisButtonSelectedWithoutAnyPreviousResult",
    path: "/startDiagnosisButtonSelectedWithoutAnyPreviousResult",
    component: StartDiagnosisButtonSelectedWithoutAnyPreviousResult
  },
  {
    name: "FailedToCompleteDiagnosis",
    path: "/failedToCompleteDiagnosis",
    component: FailedToCompleteDiagnosis
  },
  {
    name: "DiagnosisComplete",
    path: "/diagnosisComplete",
    component: DiagnosisComplete
  },
  {
    name: "UserConfirmationForProceedingFinalDiagnosis",
    path: "/userConfirmationForProceedingFinalDiagnosis",
    component: UserConfirmationForProceedingFinalDiagnosis
  },
  {
    name: "TechnicalDiagnosticResults",
    path: "/technicalDiagnosticResults",
    component: TechnicalDiagnosticResults,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosticResultstwo",
    path: "/technicalDiagnosticResultstwo",
    component: TechnicalDiagnosticResultstwo,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosticResultsmodalone",
    path: "/technicalDiagnosticResultsmodalone",
    component: TechnicalDiagnosticResultsmodalone
  },
  {
    name: "TechnicalDiagnosticResultsmodaltwo",
    path: "/technicalDiagnosticResultsmodaltwo",
    component: TechnicalDiagnosticResultsmodaltwo,
    beforeEnter: guard
  },
  {
    name: "DetailedResult",
    path: "/detailedResult",
    component: DetailedResult,
    beforeEnter: guard
  },
  {
    name: "DetailedTechnicalDiagnosisResult",
    path: "/detailedTechnicalDiagnosisResult",
    component: DetailedTechnicalDiagnosisResult,
    beforeEnter: guard
  },
  {
    name: "DetailedTechnicalDiagnosisResulttwo",
    path: "/detailedTechnicalDiagnosisResulttwo/:id/:catName",
    component: DetailedTechnicalDiagnosisResulttwo,
    beforeEnter: guard
  },
  {
    name: "DetailedTechnicalDiagnosisResultServerOnClick",
    path: "/detailedTechnicalDiagnosisResultServerDisplay/:cid/:aid/:catName",
    component: DetailedTechnicalDiagnosisResultServerOnClick,
    beforeEnter: guard
  },
  {
    name: "ResultReportUploadDiagnosisSelection",
    path: "/resultReportUploadDiagnosisSelection",
    component: ResultReportUploadDiagnosisSelection,
    beforeEnter: guard
  },
  {
    name: "DetailedTechnicalDiagnosisResultFromCompany",
    path: "/detailedTechnicalDiagnosisResultFromCompany",
    component: DetailedTechnicalDiagnosisResultFromCompany,
    beforeEnter: guard
  },
  {
    name: "DetailedTechnicalDiagnosisResultSecondOngoingDiagnosis",
    path: "/detailedTechnicalDiagnosisResultSecondOngoingDiagnosis/:id/:cId/:assetId",
    component: DetailedTechnicalDiagnosisResultSecondOngoingDiagnosis,
    beforeEnter: guard
  },
  {
    name: "ManualDiagnosisImplementation",
    path: "/ManualDiagnosisImplementation/:id/:cId/:assetId",
    component: ManualDiagnosisImplementation,
    beforeEnter: guard
  },
  {
    name: "ConfirmChangesModal",
    path: "/confirmChangesModal",
    component: ConfirmChangesModal
  },
  {
    name: "ThreatAnalysisSelection",
    path: "/threatAnalysisSelection",
    component: ThreatAnalysisSelection,
    beforeEnter: guard
  },
  {
    name: "ThreatAnalysis",
    path: "/ThreatAnalysis",
    component: ThreatAnalysis,
    beforeEnter: guard
  },
  {
    name: "NoticeOne",
    path: "/noticeone",
    component: NoticeOne,
    beforeEnter: guard
  },
  {
    name: "NoticeDetails",
    path: "/NoticeDetails/:id",
    component: NoticeDetails,
    beforeEnter: guard
  },
  {
    name: "NoticeHowtouse",
    path: "/NoticeHowtouse",
    component: NoticeHowtouse,
    beforeEnter: guard
  },
  {
    name: "NoticeInquiry",
    path: "/NoticeInquiry",
    component: NoticeInquiry,
    beforeEnter: guard
  },
  {
    name: "AddInquiry",
    path: "/AddInquiry",
    component: AddInquiry,
    beforeEnter: guard
  },
  {
    name: "editInquiry",
    path: "/editInquiry/:id",
    component: editInquiry,
    beforeEnter: guard
  },
  {
    name: "UserAdmin",
    path: "/user-admin",
    component: userAdmin,
    beforeEnter: guard
  },
  {
    name: "userAprovePending",
    path: "/user-aprove-pending/:id",
    component: userAprovePending,
    beforeEnter: guard
  },
  {
    name: "userAproveComplete",
    path: "/user-aprove-complete/:id",
    component: userAproveComplete,
    beforeEnter: guard
  },
  {
    name: "permissionClassificationManagement",
    path: "/permission-classification-management/:id?",
    component: permissionClassificationManagement,
    beforeEnter: guard
  },
  {
    name: "AddPermissionClasification",
    path: "/add-permission-clasification/:id?/:authority_name?",
    component: AddPermissionClasification,
    beforeEnter: guard
  },
  {
    name: "LogManagement",
    path: "/log-management",
    component: LogManagement,
    beforeEnter: guard
  },
  {
    name: "NoticeFaq",
    path: "/NoticeFaq",
    component: NoticeFaq,
    beforeEnter: guard
  },
  {
    name: "VerifyOtp",
    path: "/VerifyOtp",
    component: VerifyOtp
  },
  {
    name: "FaqSidebar",
    path: "/FaqSidebar",
    component: FaqSidebar
  },
  {
    name: "FaqRightside",
    path: "/FaqRightside",
    component: FaqRightside
  },
  {
    name: "AddInquiryDetails",
    path: "/AddInquiryDetails/:id",
    component: AddInquiryDetails,
    beforeEnter: guard
  },
  {
    name: "NoticeBoard",
    path: "/NoticeBoard",
    component: NoticeBoard,
    beforeEnter: guard
  },
  {
    name: "Writeabulletinboardpost",
    path: "/Writeabulletinboardpost/:id?/:board_name?",
    component: Writeabulletinboardpost,
    beforeEnter: guard
  },
  {
    name: "bulletinboarddetails",
    path: "/bulletinboarddetails/:id",
    component: bulletinboarddetails,
    beforeEnter: guard
  },
  {
    name: "NoticeBoardForUserAdminRight",
    path: "/NoticeBoardForUserAdminRight",
    component: NoticeBoardForUserAdminRight
  },
  {
    name: "LicenseExtension",
    path: "/LicenseExtension",
    component: LicenseExtension
  },
  {
    name: "LicensePackage",
    path: "/LicensePackage",
    component: LicensePackage
  },
  {
    name: "ChangeLicensePackage",
    path: "/changeLicensePackage",
    component: ChangeLicensePackage
  },
  // {
  //   name: "ManageBulletinBoardsforCorrection",
  //   path: "/manageBulletinBoardsforCorrection",
  //   component: ManageBulletinBoardsforCorrection
  // },
  {
    name: "ScheduleManagement",
    path: "/scheduleManagement",
    component: ScheduleManagement,
    beforeEnter: guard
  },
  {
    name: "AddAnEvent",
    path: "/AddAnEvent",
    component: AddAnEvent
  },
  {
    name: "CalenderSharing",
    path: "/CalenderSharing",
    component: CalenderSharing
  },
  {
    name: "ManagementDiagnosisSettingsList",
    path: "/ManagementDiagnosisSettingsList",
    component: ManagementDiagnosisSettingsList,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosisSettingsList",
    path: "/TechnicalDiagnosisSettingsList",
    component: TechnicalDiagnosisSettingsList
  },
  {
    name: "ManagementDiagnosisSettingsModal",
    path: "/ManagementDiagnosisSettingsModal",
    component: ManagementDiagnosisSettingsModal
  },
  {
    name: "UserAdminSidebar",
    path: "/UserAdminSidebar",
    component: UserAdminSidebar
  },
  {
    name: "TechnicalDiagnosisSettingSelection",
    path: "/TechnicalDiagnosisSettingSelection",
    component: TechnicalDiagnosisSettingSelection,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosisSettingsform",
    path: "/TechnicalDiagnosisSettingsform",
    component: TechnicalDiagnosisSettingsform
  },
  {
    name: "TechnicalDiagnosisTemplateAdd",
    path: "/TechnicalDiagnosisTemplateAdd/:id",
    component: TechnicalDiagnosisTemplateAdd,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosisAdd",
    path: "/TechnicalDiagnosisAdd",
    component: TechnicalDiagnosisAdd
  },
  {
    name: "LicenseManagement",
    path: "/LicenseManagement",
    component: LicenseManagement
  },
  {
    name: "RefundRequest",
    path: "/RefundRequest",
    component: RefundRequest
  },
  {
    name: "LicenseList",
    path: "/LicenseList",
    component: LicenseList
  },
  {
    name: "EvidenceListPage",
    path: "/EvidenceListPage",
    component: EvidenceListPage,
    beforeEnter: guard
  },
  {
    name: "DetailsOfEvidenceOne",
    path: "/DetailsOfEvidenceOne/:id",
    component: DetailsOfEvidenceOne,
    beforeEnter: guard
  },
  {
    name: "AddEvidence",
    path: "/add-evidence",
    component: AddEvidence,
    beforeEnter: guard
  },

  {
    name: "EvidenceSave",
    path: "/EvidenceSave",
    component: EvidenceSave
  },
  {
    name: "ApprovalPayment",
    path: "/ApprovalPayment",
    component: ApprovalPayment
  },
  {
    name: "EvidenceDelete",
    path: "/EvidenceDelete",
    component: EvidenceDelete
  },
  {
    name: "ApprovalUnauthorizedUser",
    path: "/ApprovalUnauthorizedUser",
    component: ApprovalUnauthorizedUser
  },
  {
    name: "CallingDiagnosticResults",
    path: "/CallingDiagnosticResults",
    component: CallingDiagnosticResults
  },
  {
    name: "RelatedDocument",
    path: "/RelatedDocument",
    component: RelatedDocument
  },
  {
    name: "RecordEvidence",
    path: "/RecordEvidence",
    component: RecordEvidence
  },
  {
    name: "EnactmentRevisionHistory",
    path: "/EnactmentRevisionHistory",
    component: EnactmentRevisionHistory,
    beforeEnter: guard
  },
  {
    name: "OperatingStatement",
    path: "/OperatingStatement",
    component: OperatingStatement,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosisEditItemGroup",
    path: "/TechnicalDiagnosisEditItemGroup",
    component: TechnicalDiagnosisEditItemGroup,
    beforeEnter: guard
  },
  {
    name: "TechnicalDiagnosisaddItemGroup",
    path: "/TechnicalDiagnosisaddItemGroup",
    component: TechnicalDiagnosisaddItemGroup,
    beforeEnter: guard
  },
  {
    name: "RiskAssessmentResults",
    path: "/RiskAssessmentResults",
    component: RiskAssessmentResults,
    beforeEnter: guard
  },
  {
    name: "RiskAssessmentResultsTechnicalArea",
    path: "/RiskAssessmentResultsTechnicalArea",
    component: RiskAssessmentResultsTechnicalArea,
    beforeEnter: guard
  },
  {
    name: "InformationProtectionPlan",
    path: "/InformationProtectionPlan",
    component: InformationProtectionPlan,
    beforeEnter: guard
  },
  {
    name: "ChangeOnce",
    path: "/ChangeOnce",
    component: ChangeOnce,
    beforeEnter: guard
  },
  {
    name: "AddOnSetting",
    path: "/AddOnSetting",
    component: AddOnSetting,
    beforeEnter: guard
  },
  {
    name: "CalculationCriteria",
    path: "/CalculationCriteria",
    component: CalculationCriteria,
    beforeEnter: guard
  },
  {
    name: "SelectionRiskManagementlevel",
    path: "/SelectionRiskManagementlevel",
    component: SelectionRiskManagementlevel,
    beforeEnter: guard
  },
  {
    name: "PermissionList",
    path: "/PermissionList",
    component: PermissionList,
    beforeEnter: guard
  },
  {
    name: "EvidenceGrouping",
    path: "/evidence-grouping",
    component: EvidenceGrouping,
    beforeEnter: guard
  },
  {
    name: "ChangeCriteria",
    path: "/ChangeCriteria",
    component: ChangeCriteria,
    beforeEnter: guard
  },
  {
    name: "PresetDetails",
    path: "/PresetDetails/:id",
    component: PresetDetails,
    beforeEnter: guard
  },
  {
    name: "DashboardSetUp",
    path: "/DashboardSetUp",
    component: DashboardSetUp
  },
  {
    name: "establishmentOperationManagementSystemmodal",
    path: "/establishmentOperationManagementSystemmodal",
    component: establishmentOperationManagementSystemmodal,
    beforeEnter: guard
  },
  {
    name: "CalculationStandardmodal",
    path: "/CalculationStandardmodal",
    component: CalculationStandardmodal
  },
  {
    name: "CalculationStandardmodaltwo",
    path: "/CalculationStandardmodaltwo",
    component: CalculationStandardmodaltwo
  },
  {
    name: "CalculationCriteriamodal",
    path: "/CalculationCriteriamodal",
    component: CalculationCriteriamodal
  },
  {
    name: "EvaluationStandardModal",
    path: "/EvaluationStandardModal",
    component: EvaluationStandardModal
  },
  {
    name: "AutomaticUploadIntial",
    path: "/AutomaticUploadIntial/:tId/:assetId/:cid?/:catName",
    component: AutomaticUploadIntial,
    props:true,
    beforeEnter: guard
  },
  {
    name: "AutomaticUploadFinal",
    path: "/AutomaticUploadFinal/:tId/:assetId/:cid?/:catName",
    component: AutomaticUploadFinal,
    beforeEnter: guard
  },
  {
    name: "Threatratingcriteria",
    path: "/Threatratingcriteria",
    component: Threatratingcriteria
  },
  {
    name: "terms",
    path: "/terms-of-use",
    component: terms
  },
  {
    name: "privacy",
    path: "/privacy-policy",
    component: privacy
  },
  {
    name: "privacypolicymodal",
    path: "/privacypolicymodal",
    component: privacypolicymodal
  },
  {
    name: "termsandcondition",
    path: "/termsandcondition",
    component: termsandcondition
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   // always scroll to top
  //   return { top: 0 }
  // },
})
export default router;