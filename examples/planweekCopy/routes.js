// JavaScript source code

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("signIn");
    })

    app.get("/landingPage", function (req, res) {
        res.render("Plan_My_Week");
    })
}
