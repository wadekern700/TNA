const Guest = require("../models/guest");
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kernwade@gmail.com',
    pass: 'membersonly11126'
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


  guest
    .save()
    .then(createdGuest => {
      var mailOptions2 = {
        from: 'kernwade@gmail.com',
        to: 'kernwade@gmail.com, wadekern700@hotmail.com,tiffanycarter35@hotmail.com',
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
      console.log(documents)
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
