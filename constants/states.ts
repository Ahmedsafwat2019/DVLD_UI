import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Found",
  message:
    "Looks like the database is taking a nap. Wake it up with some new entries.",
  button: {
    text: "Add Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Something Went Wrong",
  message: "Even our code can have a bad day. Give it another shot.",
  button: {
    text: "Retry Request",
    href: ROUTES.HOME,
  },
};

export const EMPTY_USERS = {
  title: "No Users Found",
  message: "you're ALONE. The only one here. More users are coming soon!",
};

export const EMPTY_APPLICATIONS = {
  title: "لا توجد طلبات",
  message: "لا توجد طلبات بهذه الحالة",
};
