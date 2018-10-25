const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWTkey = require("../../config/keys").JWTkey;
const validateRegisterInput = require("../../validation/register");
//@route   GET api/users/test
//@desc    Test users route
//@access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "users work" });
});

//@route   POST api/users/register
//@desc    Register user
//@access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "user"
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              user.password = null;
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route   POST api/users/login
//@desc    Login User / Returning JWT Token
//@access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, role: user.role };
        jwt.sign(payload, JWTkey, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

//@route   GET api/users/current
//@desc    Return current user
//@access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user;
    const dashboard = {
      routines: user.routines,
      usefulsites: user.usefulsites,
      projects: user.projects,
      memos: user.memos
    };
    res.json(dashboard);
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/routine/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { item, listname } = req.body;
    const { _id } = req.user;
    const newroutine = req.user.routines.map(list => {
      if (list.name === listname) {
        const newcontent = list.content.concat(item);
        console.log(newcontent);
        return { ...list, content: newcontent };
      }
      return list;
    });
    User.findByIdAndUpdate(
      _id,
      { $set: { routines: newroutine } },
      { new: true },
      (err, user) => {
        if (err) console.log(err);
        res.json(newroutine);
      }
    );
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/routines/updatestatus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { itemkey, listkey, status } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newroutine = user.routines.map((list, id) => {
          if (id === listkey) {
            const newcontent = list.content.map((item, id) => {
              if (id === itemkey) {
                return { ...item, status };
              }
              return item;
            });
            //console.log(newcontent);
            return { ...list, content: newcontent };
          }
          return list;
        });
        user.routines = newroutine;
        user.save();
        res.json(newroutine);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/routines/removeitem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { itemkey, listkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newroutine = user.routines.map((list, id) => {
          if (id === listkey) {
            const newcontent = list.content.filter(
              (item, id) => id !== itemkey
            );
            //console.log(newcontent);
            return { ...list, content: newcontent };
          }
          return list;
        });
        user.routines = newroutine;
        user.save();
        res.json(newroutine);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/routines/additem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { item, listkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newroutine = user.routines.map((list, id) => {
          if (id === listkey) {
            const newcontent = list.content.concat(item);
            //console.log(newcontent);
            return { ...list, content: newcontent };
          }
          return list;
        });
        user.routines = newroutine;
        user.save();
        res.json(newroutine);
      } catch (error) {
        res.json(error);
      }
    });
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/usefulsites/addtab",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { category } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newusefulsites = user.usefulsites.concat(category);
        user.usefulsites = newusefulsites;
        user.save();
        res.json(newusefulsites);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/usefulsites/removeitem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { urlkey, tabkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newusefulsites = user.usefulsites.map((tab, id) => {
          if (id === tabkey) {
            const newcontent = tab.content.filter((item, id) => id !== urlkey);
            //console.log(newcontent);
            return { ...tab, content: newcontent };
          }
          return tab;
        });
        user.usefulsites = newusefulsites;
        user.save();
        res.json(newusefulsites);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/usefulsites/addsite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { site, tabkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newusefulsites = user.usefulsites.map((tab, id) => {
          if (id === tabkey) {
            const newcontent = tab.content.concat(site);
            //console.log(newcontent);
            return { ...tab, content: newcontent };
          }
          return tab;
        });
        user.usefulsites = newusefulsites;
        user.save();
        res.json(newusefulsites);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/usefulsites/edittab",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { category, tabkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newusefulsites = user.usefulsites.map((tab, id) => {
          if (id === tabkey) {
            //console.log(newcontent);
            return {
              ...tab,
              name: category.name,
              description: category.description
            };
          }
          return tab;
        });
        user.usefulsites = newusefulsites;
        user.save();
        res.json(newusefulsites);
      } catch (error) {
        res.json(error);
      }
    });
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/memos/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { memos } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        user.memos = memos;
        user.save();
        res.json(memos);
      } catch (error) {
        res.json(error);
      }
    });
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/projects/updatestatus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { projectkey, status } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newprojects = user.projects.map((project, id) => {
          if (id === projectkey) {
            return { ...project, status };
          }
          return project;
        });
        user.projects = newprojects;
        user.save();
        res.json(newprojects);
      } catch (error) {
        res.json(error);
      }
    });
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/projects/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { project } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newprojects = user.projects;
        newprojects.unshift(project);
        user.projects = newprojects;
        user.save();
        res.json(newprojects);
      } catch (error) {
        res.json(error);
      }
    });
  }
);

//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/projects/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { project, projectkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newprojects = user.projects.map((proj, id) => {
          if (id === projectkey) {
            return {
              ...proj,
              name: project.name,
              description: project.description,
              urls: project.urls
            };
          } else {
            return proj;
          }
        });
        user.projects = newprojects;
        user.save();
        res.json(newprojects);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
//@route   GET api/users/dashboard
//@desc    Return user dashboard
//@access  Private
router.post(
  "/projects/updatenote",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { projectnote, projectkey } = req.body;
    const { _id } = req.user;
    User.findById(_id, (err, user) => {
      try {
        const newprojects = user.projects.map((proj, id) => {
          if (id === projectkey) {
            return {
              ...proj,
              note: projectnote
            };
          } else {
            return proj;
          }
        });
        user.projects = newprojects;
        user.save();
        res.json(newprojects);
      } catch (error) {
        res.json(error);
      }
    });
  }
);
module.exports = router;
