const router = require("express").Router()
const { render } = require("ejs")
const knex = require("../db/client") 
const friendlyDate = require("../utils/friendlyDate")

router.get("/", (req, res) => {
  knex
    .select()
    .table("clucks")
    .then(clucks => {
      // res.render("index", { quacks: quacks })

      res.render("index", { 
        clucks,
        friendlyDate, 
      })
    })
  })

  router.get("/new", (req, res) => {
    // const username = req.cookies.username
    const { username } = req.cookies
    if ( username ) {
      res.render("new")
    } else {
      res.redirect("/sign_in")
    }
  })
  
  router.post("/", (req, res) => {
    const { username } = req.cookies
 
    if (username) {
      const cluck = {...req.body}
      cluck.username = username 

      knex("clucks")
        .insert(cluck, "*")
        .then(cluck => {
          res.redirect("/clucks")
        })
    } else {
      res.redirect("/sign_in")
    }
  })

  router.get("/:id", (req, res) => {
    const { id } = req.params
    knex("clucks")
      .where("id", id)
      .first()
      .then(cluck => {
        res.render("show", { cluck })
      })
  })

  router.delete("/:id", (req, res) => {
    const { id } = req.params
    const { username } = req.cookies

    if (username) {
      knex("clucks")
        .where("id", id)
        .del()
        .then(() => {
          res.redirect("/clucks")
        })
    } else {
      res.redirect("/sign_in")
    }
  })

  router.get("/:id/edit", (req, res) => {
    const { id } = req.params
    const { username } = req.cookies

    if (username) {
      knex("clucks")
        .where("id", id)
        .first()
        .then(cluck => {
          res.render("edit", { cluck })
        })
    } else {
      res.redirect("/sign_in")
    }
  })

  router.patch("/:id", (req, res) => {
    const { id } = req.params
    const { username } = req.cookies

    if (username) {
      const cluck = {...req.body}
      quack.username = username
      quack.updatedAt = new Date()
      
      knex("clucks")
        .where("id", id)
        .update(cluck)
        .then(() => {
          res.redirect(`/clucks/${id}`)
        })
    } else {
      res.redirect("/sign_in")
    }
  })

module.exports = router
