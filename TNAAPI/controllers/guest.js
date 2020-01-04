const Guest = require("../models/guest");
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vanmeertiffany481@gmail.com',
    pass: 'Milo69!!'
  }
});

var mailOptions = {
  from: 'kernwade@gmail.com',
  to: 'kernwade@gmail.com, wadekern700@hotmail.com,tiffanycarter35@hotmail.com',
  subject: 'Sending Email using Node.js',
  text: `Hi Smartherd, thank you for your nice Node.js tutorials.
          I will donate 50$ for this course. Please send me payment options.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
};





exports.createGuest = (req, res, next) => {
  const guest = new Guest({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    foodOption: req.body.foodOption
  });
  console.log(req.body);

  // tiffanycarter35@hotmail.com
  guest
    .save()
    .then(createdGuest => {
      console.log(createdGuest)
      var mailOptions2 = {
        from: 'vanmeertiffany481@gmail.com',
        to: 'kernwade@gmail.com, wadekern700@hotmail.com',
        subject: 'Sending test email for you wedding website',
        text: 'yellow Tiff and Andrew ' + createdGuest.firstName + ' ' + createdGuest.lastName + ' has registered for yalls wedding they want the meatloaf but actually they want ' + createdGuest.foodOption
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
      };

      transporter.sendMail(mailOptions2, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(201).json({
        message: "Guest added successfully",
        guest: {
          ...createdGuest,
          id: createdGuest._ids
        }
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Creating a guest failed!"
      });
    });
};
exports.updateGuest = (req, res, next) => {
  console.log("in update")
  const guest = new Guest({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    foodOption: req.body.foodOption,
    _id: req.body.id
  });
  console.log(req.body)
  console.log("in update2")
  Guest.updateOne({ _id: req.params.id }, guest)
    .then(result => {
      console.log("in update3")
      console.log(result)
      if (result.n > 0) {
        console.log(result)
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Couldn't udpate Guest!"
      });
    });
};

exports.deleteAll = (req, res, next) => {
  Guest.deleteMany({}).then(result => console.log('all deleted'))
}

exports.deleteGuest = (req, res, next) => {
  // console.log('delete post')
  // Guest.deleteMany({}).then(result => console.log('all deleted'))
  Guest.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};
exports.getGuests = (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
  const guestsQuery = Guest.find();
  let fetchedGuests;
  // if (pageSize && currentPage) {
  //   postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  // }
  guestsQuery
    .then(documents => {
      fetchedGuests = documents;

      return Guest.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Guests fetched successfully!",
        guests: fetchedGuests,
        maxGuests: count
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Fetching Guests failed!"
      });
    });
};
