//This si the error page
const testErrorPage = (req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
};

// testErrorPage exported
export { testErrorPage };
