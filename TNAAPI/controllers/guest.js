const Guest = require("../models/guest");

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
