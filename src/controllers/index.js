// This is the homepage
const showHomePage = async (req, res) => {
  const title = "Home";
  res.render("home", { title });
};
// showHomePage exported
export { showHomePage };
