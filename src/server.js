const express = require("express");
const app = express();

app.use(express.json());

let listings = [];
let bookings = [];

let listingIdCounter = 1;
let bookingIdCounter = 1;

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

app.post("/listings", (req,res) => {
  const { name } = req.body;

  if(!name) {
    return res.status(400).json({error: "Name is required."});
  }

  const newListing = {
    id: listingIdCounter++, name
  }

  listings.push(newListing);

  res.status(201).json(newListing);
})

app.get("/listings", (req, res) => {
  res.json(listings);
});

app.post("/bookings", (req, res) => {
  const {listingId, startDate, endDate} = req.body;

  if(!listingId || !startDate || !endDate) {
    return res.status(400).json({
      error: "Parameters are missing"
    });
  }

  const listingExists = listings.find(l => l.id === listingId);

  if (!listingExists) {
    return res.status(400).json({error: "Listing not found"});
  }

  const existingBookings = bookings.filter(b => b.listingId === listingId);

  const overlap = existingBookings.some(b => {
    return (
      new Date(startDate) < new Date(b.endDate) && 
      new Date(endDate) > new Date(b.startDate)
    );
  });

  if(overlap) {
    return res.status(400).json({
      error: "Listing already booked for these dates."
    });
  }

  const newBooking = {
    id: bookingIdCounter++, listingId, startDate, endDate
  };

  bookings.push(newBooking);

  res.status(201).json(newBooking);

});

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));