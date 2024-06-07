import { ExceptionCode } from "@/@types/errorCode";
import { LocalState } from "@/@types/localState";
import { Role } from "@/store/userStore";

const error = {
  baseTitle: "Error occurred",
  baseDescription: "Something went wrong...",
  userBlocked: "Your account is blocked",
  internalServerErrorDescription:
    "Oops! Something went wrong on our end. Please try again later.",
};

const loginPage = {
  forgotPassword: "Forgot password?",
  loginButton: "Sign in",
  login: "Login",
  password: "Password",
  loginHeader: "Sign in",
  register: "Sign up",
  loginRequired: "Login is required",
  passwordRequired: "Password is required",
  loginError: "Login error",
  invalidCredentials: "Invalid credentials",
  loginNotAllowed: "Login is blocked, check email",
  tryAgain: "Try again",
  codeLengthMessage: "Two-factor authentication code must be 8 digits",
  codeDescription: "Enter two-factor authentication code",
  changeLanguage: "Language",
  submit: "Submit",
  backToLoginForm: "Back to login form",
  tokenError: {
    title: "Incorrect data",
    description: "Provided incorrect token",
  },
  googleLoginButton: "Sign in with Google",
  inactiveAccount: "Your account is inactive, check you e-mail to continue",
};

const userDetailsPage = {
  firstName: "First name",
  lastName: "Last name",
  login: "Login",
  email: "Email",
  language: "Language",
  lastSuccessfulLogin: "Last successful login",
  lastFailedLogin: "Last failed login",
  timezone: "Timezone",
  blocked: "Blocked",
  verified: "Verified",
  active: "Active",
  actions: "Actions",

  role: {
    title: "Roles",
    add: {
      tenant: "Add tenant role",
      owner: "Add owner role",
      administrator: "Add administrator role",
    },
    remove: {
      tenant: "Remove tenant role",
      owner: "Remove owner role",
      administrator: "Remove administrator role",
    },
    added: {
      tenant: "Added tenant role",
      owner: "Added owner role",
      administrator: "Added administrator role",
    },
    removed: {
      tenant: "Removed tenant role",
      owner: "Removed owner role",
      administrator: "Removed administrator role",
    },
  },
  changeEmail: "Change email address",
  updateEmailAddress: "Update email address",
  updateEmailAddressTitle:
    "Are you sure you want to update this user's email address?",
  updateEmailAddressDescription:
    "A link to change the email address will be sent to the given email address",
};

const updateEmailPage = {
  emailNotValid: "Email is not valid",
  email: "Email*",
  updateEmailButton: "Update email",
  updateEmailSuccess: "Email has been updated",
  updateEmailError: "Error while updating email",
  updateEmailTitle: "Enter your password",
  success: "Success",
  error: "Error",
  password: "Password*",
  confirmPassword: "Repeat password*",
};

const registerPage = {
  firstNameRequired: "First name is required",
  lastNameRequired: "Last name is required",
  emailRequired: "Email is required",
  loginRequired: "Login is required",
  passwordRequired: "Password must be at least 8 characters long",
  passwordMatch: "Passwords must match",
  registerHeader: "Sign up",
  firstName: "First name*",
  lastName: "Last name*",
  email: "Email*",
  login: "Login*",
  password: "Password*",
  confirmPassword: "Confirm password*",
  registerButton: "Sign up",
  registerSuccess:
    "Link to confirm registration has been sent to the provided email address.",
  registerError: "Error while registering",
  tryAgain: "Try again",
  registerErrorIdenticalFields: "Login and email must be different",
};

const resetPasswordForm = {
  description:
    "Enter your email address and we will send you a link to reset your password",
  email: "Email*",
  emailRequired: "Email is required",
  resetPassword: "Reset password",
  loginButton: "Back to login form",
  resetUserPasswordToastTitleSuccess: "Operation successful",
  resetUserPasswordToastDescriptionSuccess:
    "Link has been sent to the provided email address",
  resetUserPasswordToastTitleFail: "Operation failed",
  resetUserPasswordToastDescriptionNotFound:
    "User with provided email address not found",
  resetUserPasswordToastDescriptionFail: "Something went wrong...",
};

const resetPasswordPage = {
  header: "Reset password",
  password: "Password*",
  confirmPassword: "Confirm password*",
  confirmButton: "Reset password",
  homeButton: "Back to home",
  changePasswordToastTitleSuccess: "Operation successful",
  changePasswordToastDescriptionSuccess: "Password has been changed",
  changePasswordToastTitleFail: "Operation failed",
  changePasswordToastDescriptionFail: "Something went wrong...",
};

const changePasswordForm = {
  oldPassword: "Old password*",
  newPassword: "New password*",
  confirmPassword: "Confirm new password*",
  submit: "Change",
  success: "Success",
  successDescription: "Password has been changed",
  errorTitle: "Error",
  errorDescriptionNotFound: "User not found",
  errorDescriptionBadRequest: "Incorrect password",
  errorDescriptionConflict:
    "The password must be unique compared to previous ones",
  alertDialogTitle: "Change password",
  errorDescriptionTokenNotValid:
    "The provided token is invalid, email resend required.",
  alertDialogDescription: "Are you sure you want to change your password?",
  alertDialogCancel: "No",
  alertDialogAction: "Yes",
};

const userListPage = {
  firstName: "First name",
  lastName: "Last name",
  login: "Login",
  email: "Email",
  actions: "Actions",
  viewDetails: "Details",
  resetUserPasswordAction: "Reset password",
  resetUserPasswordTitle: "Reset user password",
  resetUserPasswordDescription: "Are you sure you want to reset user password ",
  resetUserPasswordToastTitleSuccess: "Operation successful",
  resetUserPasswordToastDescriptionSuccess:
    "Password reset link has been sent to the user email address",
  resetUserPasswordToastTitleFail: "Operation failed",
  resetUserPasswordToastDescriptionNotFound: "Not found given user.",
  resetUserPasswordToastDescriptionForbidden:
    "User is not verified or blocked.",
  resetUserPasswordToastDescriptionFail: "Something went wrong...",
  resetUserEmailAction: "Update email",
  resetUserEmailSuccess:
    "An email for changing current address has been sent to the given email address",
  resetUserEmailError: "Error while initializing email change",
  resetUserEmailTitle: "Are you sure you want to update user email address?",
  resetUserEmailDescription:
    "A link to change the email address will be sent to the user's email address",
  updateEmailAddress: "Update email address",
};

const block = {
  blockUserAction: "Block",
  unblockUserAction: "Unblock",
  toast: {
    title: {
      success: "Operation success",
      fail: "Operation failed",
    },

    description: {
      blockSuccess: "User successfully blocked.",
      unblockSuccess: "User successfully unblocked.",
      notFound: "Users not found.",
      alreadyBlocked: "User already blocked.",
      alreadyUnblocked: "User already unblocked.",
      fail: "Something went wrong...",
    },
  },
};

const userFilter = {
  yes: "Yes",
  no: "No",
  both: "Both",
  verified: "Verified",
  blocked: "Blocked",
  login: "Login",
  email: "Email",
  submit: "Filter",
  role: "Role",
  all: "All",
  tenant: "Tenant",
  owner: "Owner",
  administrator: "Administrator",
  firstName: "First Name",
  lastName: "Last Name",
  clear: "Clear",
};

const pageChanger = {
  numberOfElements: "Number of elements",
  page: "Page",
  of: "of",
};

const common = {
  yes: "yes",
  no: "no",
  update: "Update",
  confirmDialogTitle: "Are you sure?",
};

const navLinks = {
  account: "My account",
  signOut: "Sign out",
  users: "Users",
  notApprovedActions: "Not approved actions",
  roles: "Change access level",
  locals: "Locals",
  currentRents: "Current rents",
} satisfies {
  [key in string]: string;
};

const userDataPage = {
  firstNameNotEmpty: "First name cannot be empty",
  lastNameNotEmpty: "Last name cannot be empty",
  firstName: "First name*",
  lastName: "Last name*",
  language: "Language*",
  error: "Error",
  success: "Data updated",
  updateUserData: "Update",
  emailNotValid: "Email is not valid",
  email: "Email*",
  emailNotEmpty: "Email cannot be empty",
  emailTooLong: "Email is too long",
  confirmDialogDescription: "Are you sure you want to change personal data?",
  timeZone: "Time zone",
};

const updateDataForm = {
  error: "Error during updating data",
  success: "Data updated",
  precondinationFailed: "You are not working on the latest data",
  triggerButton: "Update data",
  title: "Update user data",
  firstName: "First name",
  lastName: "Last name",
  language: "Language",
  updateButton: "Update",
  updateUserData: "Update user data",
};

const mePage = {
  accountInfo: "User data",
  updateEmailAddress: "Update email address",
  updateEmailAddressTitle:
    "Are you sure you want to update your email address?",
  updateEmailAddressDescription:
    "A link to change the email address will be sent to the user's email address",
  title: "My account",
  basicInformation: "Basic information's",
  firstNameLabel: "First name",
  lastNamelabel: "Last name",
  emailLabel: "Email",
  lastSuccessfullLoginDateLabel: "Last successful Login Date",
  lastSuccessfillLoginIPLabel: "Last successful Login IP",
  lastFailedfullLoginDateLabel: "Last failed Login Date",
  lastFailedfillLoginIPLabel: "Last failed Login IP",
  updateData: "Update your data",
  changeEmail: "Change your email address",
  changePassword: "Change your password",
  changeEmailDescription: "Click here to send email with link to change email.",
  emailInput: "Email*",
  timezone: "Timezone",
};

const registerSuccessPage = {
  title: "Thanks for creating an account",
  description:
    "We send you an email with verification link. Use this link to verify your account. Until you perform this action you won't be able to login.",
  loginButton: "Go back to login",
};

const notApprovedActionsPage = {
  roleRequests: "Requests for role",
  locals: "Locals",
  emptyRoleRequests: "No avaliable role requsts",
};

const validation = {
  characters: "character(s)",
  minLength: "Field must contain at least",
  maxLength: "Field must contain at most",
};

const roles = {
  administrator: "Administrator",
  tenant: "Tenant",
  owner: "Owner",
} satisfies {
  [key in Role]: string;
};

const homePage = {
  manageProperties: "Manage your properties with ease",
  signIn: "Sign in",
  signUp: "Create account",
  or: "or",
};

const sessionExpiredDialog = {
  title: "Session will expire soon!",
  description:
    "Your session will expire in less than 5 minutes. Do you want to extend it?",
  signOut: "Logout",
};

const errors = {
  optimisticLock: "You are not working on the latest data",
  registrationError: "Error while registering",
  identicalLoginOrEmail: "Account with this login or email already exists",
  invalidData: "Invalid data",
  invalidLoginData: "User with provided login and password not found",
  invalidPassword: "User with provided login and password not found",
  loginNotMatchToOTP: "One-time password does not match",
  passwordRepetition: "You must provide password other than the previous one",
  invalidRefreshToken: "Error while refreshing session, login required",
  signInBlocked:
    "You give incorrect data too many times, your account is blocked, check email",
  timezoneNotFound: "Timezone not found",
  userAlreadyBlocked: "User already blocked",
  userAlreadyUnblocked: "User already unblocked",
  userBlocked: "You are blocked",
  userInactive: "You have been inactive for too long, check your email",
  userNotVerified: "You are not verified, chceck your email",
  verificationTokenExpired: "Code expired",
  verificationTokenUsed: "Invalid code",
  administratorOwnRoleRemoval: "You cannot remove your own administrator role",
  administratorOwnBlock: "You cannot block yourself",
  notFound: "Not found",
  userNotFound: "User not found",
  themeNotFound: "Theme not found",
  somethingWentWrong: "Something went wrong...",
  accessDenied: "Access denied",
  jwtTokenInvalid: "Session expired",
  validationError: "Validation error",
  identicalEmail: "User with given email address already exists",
  internalServerError:
    "Something went wrong on our end. Please try again later.",
  accessLevelAssigned: "Access level aleady assigned",
  accessLevelTaken: "Access level already taken",
  undefined: "Unexpected error occurred",
} satisfies {
  [key in ExceptionCode]: string;
};

const notFoundPage = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

const ownerLocals = {
  show: "Show",
};

const allLocals = {
  show: "Show",
  localOwner: "Owner: ",
};

const localState = {
  UNAPPROVED: "Unapproved",
  ARCHIVED: "Archived",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  WITHOUT_OWNER: "Without owner",
  RENTED: "Rented",
} satisfies {
  [key in LocalState]: string;
};

const currentTenantRents = {
  startDate: "Start date",
  endDate: "End date",
  fixedFee: "Fixed fee",
  balance: "Balance",
  size: "Local size",
  owner: "Owner",
  name: "Name",
  email: "Email",
  login: "Login",
};

const currentOwnerRents = {
  title: "Owner",
  rents: "Current rents",
  startDate: "Start date",
  endDate: "End date",
  balance: "Balance",
  tenant: "Tenant",
  name: "Name",
  email: "Email",
  noRentsFound: "Currently your local has no tenants",
};

export default {
  currentOwnerRents,
  currentTenantRents,
  allLocals,
  localState,
  ownerLocals,
  notFoundPage,
  sessionExpiredDialog,
  error,
  errors,
  homePage,
  common,
  roles,
  registerSuccessPage,
  navLinks,
  loginPage,
  registerPage,
  resetPasswordForm,
  resetPasswordPage,
  changePasswordForm,
  userListPage,
  userFilter,
  block,
  userDetailsPage,
  updateDataForm,
  mePage,
  userDataPage,
  updateEmailPage,
  validation,
  pageChanger,
  notApprovedActionsPage,
  light: "Light",
  dark: "Dark",
  reactivationSuccess: "Your account has been reactivated. You can now login.",
  success: "Success",
  sessionExpired: "Session expired",
  sessionExpiredDescription: "Session expired, please login again",
  footer: "Landlord Kingdom - SSBD202402",
  logoPlaceholder: "Landlord Kingdom",
  confirm: "Confirm",
  cancel: "Cancel",
} as const;
