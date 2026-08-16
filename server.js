const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let donors = [
    {
        id: 1,
        name: "Rahul Kumar",
        bloodGroup: "O+",
        phone: "9876543210",
        location: "Mysore",
        age: 24,
        availability: "Available"
    },
    {
        id: 2,
        name: "Ananya Rao",
        bloodGroup: "A+",
        phone: "9876543211",
        location: "Bangalore",
        age: 22,
        availability: "Available"
    },
    {
        id: 3,
        name: "Kiran Shetty",
        bloodGroup: "B+",
        phone: "9876543212",
        location: "Mangalore",
        age: 28,
        availability: "Unavailable"
    }
];

let nextDonorId = 4;

let requests = [];

let nextRequestId = 1;

app.get("/", (req, res) => {
    res.send("BloodConnect API is running");
});

app.get("/api/donors", (req, res) => {
    res.json(donors);
});

app.get("/api/donors/:id", (req, res) => {

    const id = Number(req.params.id);

    const donor = donors.find(d => d.id === id);

    if (!donor) {
        return res.status(404).json({
            message: "Donor not found"
        });
    }

    res.json(donor);
});

app.post("/api/donors", (req, res) => {

    const {
        name,
        bloodGroup,
        phone,
        location,
        age,
        availability
    } = req.body;

    if (
        !name ||
        !bloodGroup ||
        !phone ||
        !location ||
        !age ||
        !availability
    ) {
        return res.status(400).json({
            message: "Please provide all donor details"
        });
    }

    const newDonor = {
        id: nextDonorId++,
        name,
        bloodGroup,
        phone,
        location,
        age,
        availability
    };

    donors.push(newDonor);

    res.status(201).json({
        message: "Donor registered successfully",
        donor: newDonor
    });
});

app.put("/api/donors/:id", (req, res) => {

    const id = Number(req.params.id);

    const donor = donors.find(d => d.id === id);

    if (!donor) {
        return res.status(404).json({
            message: "Donor not found"
        });
    }

    const {
        name,
        bloodGroup,
        phone,
        location,
        age,
        availability
    } = req.body;

    donor.name = name || donor.name;
    donor.bloodGroup = bloodGroup || donor.bloodGroup;
    donor.phone = phone || donor.phone;
    donor.location = location || donor.location;
    donor.age = age || donor.age;
    donor.availability = availability || donor.availability;

    res.json({
        message: "Donor updated successfully",
        donor: donor
    });
});

app.delete("/api/donors/:id", (req, res) => {

    const id = Number(req.params.id);

    const donor = donors.find(d => d.id === id);

    if (!donor) {
        return res.status(404).json({
            message: "Donor not found"
        });
    }

    donors = donors.filter(d => d.id !== id);

    res.json({
        message: "Donor deleted successfully"
    });
});

app.get("/api/requests", (req, res) => {
    res.json(requests);
});

app.get("/api/requests/:id", (req, res) => {

    const id = Number(req.params.id);

    const request = requests.find(r => r.id === id);

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});

app.post("/api/requests", (req, res) => {

    const {
        patientName,
        bloodGroup,
        quantity,
        hospital,
        location,
        date,
        time,
        phone,
        description
    } = req.body;

    if (
        !patientName ||
        !bloodGroup ||
        !quantity ||
        !hospital ||
        !location ||
        !date ||
        !time ||
        !phone ||
        !description
    ) {
        return res.status(400).json({
            message: "Please provide all emergency request details"
        });
    }

    const newRequest = {

        id: nextRequestId++,

        patientName,

        bloodGroup,

        quantity,

        hospital,

        location,

        date,

        time,

        phone,

        description,

        status: "Active"
    };

    requests.push(newRequest);

    res.status(201).json({
        message: "Emergency request created successfully",
        request: newRequest
    });
});

app.patch("/api/requests/:id/status", (req, res) => {

    const id = Number(req.params.id);

    const request = requests.find(r => r.id === id);

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const { status } = req.body;

    const validStatuses = [
        "Active",
        "Fulfilled",
        "Closed"
    ];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid status. Use Active, Fulfilled or Closed"
        });
    }

    request.status = status;

    res.json({
        message: "Request status updated successfully",
        request: request
    });
});

app.delete("/api/requests/:id", (req, res) => {

    const id = Number(req.params.id);

    const request = requests.find(r => r.id === id);

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests = requests.filter(r => r.id !== id);

    res.json({
        message: "Emergency request deleted successfully"
    });
});

app.listen(PORT, () => {

    console.log(
        `BloodConnect API running at http://localhost:${PORT}`
    );

});