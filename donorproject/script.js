const defaultDonors = [

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
    },

    {
        id: 4,
        name: "Sneha Patil",
        bloodGroup: "O-",
        phone: "9876543213",
        location: "Hubli",
        age: 25,
        availability: "Available"
    },

    {
        id: 5,
        name: "Arjun Sharma",
        bloodGroup: "AB+",
        phone: "9876543214",
        location: "Mysore",
        age: 30,
        availability: "Available"
    },

    {
        id: 6,
        name: "Priya Nair",
        bloodGroup: "A-",
        phone: "9876543215",
        location: "Bangalore",
        age: 26,
        availability: "Available"
    }

];

let donors =
    JSON.parse(
        localStorage.getItem("bloodDonors")
    ) || defaultDonors;


let requests =
    JSON.parse(
        localStorage.getItem("bloodRequests")
    ) || [];

function saveDonors() {

    localStorage.setItem(
        "bloodDonors",
        JSON.stringify(donors)
    );

}

function saveRequests() {

    localStorage.setItem(
        "bloodRequests",
        JSON.stringify(requests)
    );

}

function displayDonors() {

    const container =
        document.getElementById(
            "donorContainer"
        );


    const search =
        document.getElementById(
            "donorSearch"
        )
            .value
            .toLowerCase();


    const bloodGroup =
        document.getElementById(
            "bloodGroupFilter"
        ).value;


    const availability =
        document.getElementById(
            "availabilityFilter"
        ).value;


    const filteredDonors =
        donors.filter(donor => {

            const matchesSearch =

                donor.name
                    .toLowerCase()
                    .includes(search)

                ||

                donor.location
                    .toLowerCase()
                    .includes(search);


            const matchesBloodGroup =

                bloodGroup === "all"

                ||

                donor.bloodGroup === bloodGroup;


            const matchesAvailability =

                availability === "all"

                ||

                donor.availability === availability;


            return (
                matchesSearch &&
                matchesBloodGroup &&
                matchesAvailability
            );

        });


    container.innerHTML = "";


    if (filteredDonors.length === 0) {

        container.innerHTML = `

            <div class="donor-card">

                <h3>
                    No Donors Found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;
    }


    filteredDonors.forEach(donor => {

        const card =
            document.createElement("div");


        card.className =
            "donor-card";


        const availabilityClass =
            donor.availability === "Available"
                ? "available"
                : "unavailable";


        card.innerHTML = `

            <span class="blood-group">

                🩸 ${donor.bloodGroup}

            </span>


            <h3>
                ${donor.name}
            </h3>


            <p>
                📍 ${donor.location}
            </p>


            <p>
                🎂 Age: ${donor.age}
            </p>


            <p>
                📞 ${donor.phone}
            </p>


            <span class="availability ${availabilityClass}">

                ${donor.availability}

            </span>


            <div class="card-buttons">

                <button
                    class="details-btn"
                    onclick="showDonorDetails(${donor.id})"
                >
                    View
                </button>


                <button
                    class="edit-btn"
                    onclick="editDonor(${donor.id})"
                >
                    Edit
                </button>


                <button
                    class="delete-btn"
                    onclick="deleteDonor(${donor.id})"
                >
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });


    updateStatistics();

}



function showDonorDetails(id) {

    const donor =
        donors.find(
            d => d.id === id
        );


    if (!donor) {

        alert(
            "Donor record not found."
        );

        return;
    }


    document.getElementById(
        "donorDetails"
    ).innerHTML = `

        <h2>
            🩸 ${donor.name}
        </h2>

        <br>

        <p>
            <strong>Blood Group:</strong>
            ${donor.bloodGroup}
        </p>

        <p>
            <strong>Age:</strong>
            ${donor.age}
        </p>

        <p>
            <strong>Location:</strong>
            ${donor.location}
        </p>

        <p>
            <strong>Contact:</strong>
            ${donor.phone}
        </p>

        <p>
            <strong>Availability:</strong>
            ${donor.availability}
        </p>

    `;


    document.getElementById(
        "donorModal"
    ).style.display = "block";

}



function closeDonorModal() {

    document.getElementById(
        "donorModal"
    ).style.display = "none";

}



document.getElementById(
    "donorForm"
).addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "donorName"
            ).value.trim();


        const bloodGroup =
            document.getElementById(
                "donorBloodGroup"
            ).value;


        const phone =
            document.getElementById(
                "donorPhone"
            ).value.trim();


        const location =
            document.getElementById(
                "donorLocation"
            ).value.trim();


        const age =
            Number(
                document.getElementById(
                    "donorAge"
                ).value
            );


        const availability =
            document.getElementById(
                "donorAvailability"
            ).value;


        if (
            name === "" ||
            bloodGroup === "" ||
            phone === "" ||
            location === "" ||
            age === 0
        ) {

            alert(
                "Please fill all required fields."
            );

            return;
        }


        if (
            !/^[0-9]{10}$/.test(phone)
        ) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;
        }


        if (
            age < 18 ||
            age > 65
        ) {

            alert(
                "Age must be between 18 and 65."
            );

            return;
        }



        const donor = {

            id:
                Date.now(),

            name:
                name,

            bloodGroup:
                bloodGroup,

            phone:
                phone,

            location:
                location,

            age:
                age,

            availability:
                availability

        };


        donors.push(donor);

        saveDonors();

        alert(
            "Donor registered successfully!"
        );

        document.getElementById(
            "donorForm"
        ).reset();


        displayDonors();

        updateStatistics();


        document.getElementById(
            "donors"
        ).scrollIntoView();

    }
);

function editDonor(id) {

    const donor =
        donors.find(
            d => d.id === id
        );

    if (!donor) {

        alert(
            "Donor not found."
        );

        return;
    }

    const newName =
        prompt(
            "Enter donor name:",
            donor.name
        );

    if (!newName) {

        return;

    }

    const newLocation =
        prompt(
            "Enter location:",
            donor.location
        );

    if (!newLocation) {

        return;

    }

    const newPhone =
        prompt(
            "Enter phone number:",
            donor.phone
        );
    if (
        !newPhone ||
        !/^[0-9]{10}$/.test(newPhone)
    ) {

        alert(
            "Invalid phone number."
        );

        return;

    }

    donor.name =
        newName;

    donor.location =
        newLocation;

    donor.phone =
        newPhone;


    saveDonors();

    displayDonors();


    alert(
        "Donor information updated."
    );

}

function deleteDonor(id) {

    const donor =
        donors.find(
            d => d.id === id
        );

    if (!donor) {

        alert(
            "Donor not found."
        );

        return;

    }

    const confirmation =
        confirm(
            `Remove ${donor.name} from donor records?`
        );


    if (!confirmation) {

        return;

    }

    donors =
        donors.filter(
            d => d.id !== id
        );

    saveDonors();

    displayDonors();

    alert(
        "Donor removed successfully."
    );

}

document.getElementById(
    "requestForm"
).addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const patientName =
            document.getElementById(
                "patientName"
            ).value.trim();

        const bloodGroup =
            document.getElementById(
                "requiredBloodGroup"
            ).value;

        const quantity =
            Number(
                document.getElementById(
                    "bloodQuantity"
                ).value
            );

        const hospital =
            document.getElementById(
                "hospitalName"
            ).value.trim();

        const location =
            document.getElementById(
                "requestLocation"
            ).value.trim();

        const date =
            document.getElementById(
                "requiredDate"
            ).value;

        const time =
            document.getElementById(
                "requiredTime"
            ).value;

        const phone =
            document.getElementById(
                "requestPhone"
            ).value.trim();


        const description =
            document.getElementById(
                "emergencyDescription"
            ).value.trim();

        if (
            patientName === "" ||
            bloodGroup === "" ||
            quantity === 0 ||
            hospital === "" ||
            location === "" ||
            date === "" ||
            time === "" ||
            phone === "" ||
            description === ""
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }

        if (
            !/^[0-9]{10}$/.test(phone)
        ) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;

        }

        if (
            quantity < 1 ||
            quantity > 20
        ) {

            alert(
                "Quantity must be between 1 and 20 units."
            );

            return;

        }

        const request = {

            id:
                Date.now(),

            patientName:
                patientName,

            bloodGroup:
                bloodGroup,

            quantity:
                quantity,

            hospital:
                hospital,

            location:
                location,

            date:
                date,

            time:
                time,

            phone:
                phone,

            description:
                description,

            status:
                "Active"

        };

        requests.push(request);

        saveRequests();

        alert(
            "Emergency blood request created successfully!"
        );


        document.getElementById(
            "requestForm"
        ).reset();


        displayRequests();

        updateStatistics();


        document.getElementById(
            "requests"
        ).scrollIntoView();

    }
);

function displayRequests() {

    const container =
        document.getElementById(
            "requestContainer"
        );

    container.innerHTML = "";


    if (requests.length === 0) {

        container.innerHTML = `

            <div class="request-card">

                <h3>
                    No Emergency Requests
                </h3>

                <p>
                    There are currently no blood requests.
                </p>

            </div>

        `;

        return;
    }

    requests.forEach(request => {

        const card =
            document.createElement("div");


        card.className =
            "request-card";


        let statusClass =
            "active-status";


        if (
            request.status === "Fulfilled"
        ) {

            statusClass =
                "fulfilled-status";

        }

        if (
            request.status === "Closed"
        ) {

            statusClass =
                "closed-status";

        }


        card.innerHTML = `

            <h3>
                🚨 ${request.patientName}
            </h3>


            <p>

                <strong>
                    Blood Group:
                </strong>

                🩸 ${request.bloodGroup}

            </p>


            <p>

                <strong>
                    Required:
                </strong>

                ${request.quantity}
                unit(s)

            </p>


            <p>

                <strong>
                    Hospital:
                </strong>

                ${request.hospital}

            </p>


            <p>

                <strong>
                    Location:
                </strong>

                ${request.location}

            </p>


            <p>

                <strong>
                    Date:
                </strong>

                ${request.date}

            </p>


            <p>

                <strong>
                    Time:
                </strong>

                ${request.time}

            </p>

            <span
                class="request-status ${statusClass}"
            >

                ${request.status}

            </span>


            <div class="request-buttons">

                <button
                    class="view-request"
                    onclick="showRequestDetails(${request.id})"
                >
                    View Details
                </button>


                ${request.status === "Active"

                ?

                `

                    <button
                        class="status-request"
                        onclick="updateRequestStatus(${request.id})"
                    >
                        Update Status
                    </button>


                    <button
                        class="close-request"
                        onclick="closeRequest(${request.id})"
                    >
                        Close
                    </button>

                    `

                :

                ""

            }

            </div>

        `;

        container.appendChild(card);

    });

    updateStatistics();

}

function showRequestDetails(id) {

    const request =
        requests.find(
            r => r.id === id
        );

    if (!request) {

        alert(
            "Request not found."
        );

        return;

    }

    document.getElementById(
        "requestDetails"
    ).innerHTML = `

        <h2>
            🚨 Emergency Request
        </h2>

        <br>

        <p>
            <strong>Patient:</strong>
            ${request.patientName}
        </p>

        <p>
            <strong>Blood Group:</strong>
            ${request.bloodGroup}
        </p>

        <p>
            <strong>Quantity:</strong>
            ${request.quantity} unit(s)
        </p>

        <p>
            <strong>Hospital:</strong>
            ${request.hospital}
        </p>

        <p>
            <strong>Location:</strong>
            ${request.location}
        </p>

        <p>
            <strong>Date:</strong>
            ${request.date}
        </p>

        <p>
            <strong>Time:</strong>
            ${request.time}
        </p>

        <p>
            <strong>Contact:</strong>
            ${request.phone}
        </p>

        <p>
            <strong>Description:</strong>
            ${request.description}
        </p>

        <p>
            <strong>Status:</strong>
            ${request.status}
        </p>

    `;

    document.getElementById(
        "requestModal"
    ).style.display = "block";

}

function closeRequestModal() {

    document.getElementById(
        "requestModal"
    ).style.display = "none";

}

function updateRequestStatus(id) {

    const request =
        requests.find(
            r => r.id === id
        );

    if (!request) {

        alert(
            "Request not found."
        );

        return;

    }
    const newStatus =
        prompt(
            "Enter status: Active / Fulfilled / Closed",
            request.status
        );


    if (!newStatus) {

        return;

    }

    const validStatuses = [

        "Active",
        "Fulfilled",
        "Closed"

    ];

    if (
        !validStatuses.includes(newStatus)
    ) {

        alert(
            "Invalid status."
        );

        return;

    }

    request.status =
        newStatus;

    saveRequests();

    displayRequests();

    alert(
        "Request status updated successfully."
    );

}

function closeRequest(id) {

    const request =
        requests.find(
            r => r.id === id
        );

    if (!request) {

        alert(
            "Request not found."
        );

        return;

    }

    const confirmation =
        confirm(
            "Close this emergency request?"
        );

    if (!confirmation) {

        return;

    }

    request.status =
        "Closed";

    saveRequests();

    displayRequests();

    alert(
        "Emergency request closed."
    );

}

function updateStatistics() {

    document.getElementById(
        "donorCount"
    ).textContent =
        donors.length;


    const availableDonors =
        donors.filter(
            donor =>
                donor.availability ===
                "Available"
        );

    document.getElementById(
        "availableCount"
    ).textContent =
        availableDonors.length;


    const activeRequests =
        requests.filter(
            request =>
                request.status ===
                "Active"
        );


    document.getElementById(
        "requestCount"
    ).textContent =
        activeRequests.length;

}

function scrollToDonors() {

    document.getElementById(
        "donors"
    ).scrollIntoView();

}

function scrollToRequest() {

    document.getElementById(
        "request"
    ).scrollIntoView();

}

window.onclick = function (event) {

    const donorModal =
        document.getElementById(
            "donorModal"
        );

    const requestModal =
        document.getElementById(
            "requestModal"
        );

    if (
        event.target === donorModal
    ) {

        closeDonorModal();
    }

    if (
        event.target === requestModal
    ) {

        closeRequestModal();

    }

};

function setMinimumDate() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    document.getElementById(
        "requiredDate"
    ).min = today;

}

displayDonors();
displayRequests();
updateStatistics();
setMinimumDate();