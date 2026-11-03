// ======================================================
// AgriShare - Agricultural Equipment Sharing Prototype
// ======================================================

// -------------------- DEMO DATA --------------------

let equipment = [
    {
        id: 1,
        name: "Mahindra 575 DI Tractor",
        type: "Tractor",
        price: 1500,
        location: "Mayiladuthurai",
        distance: 3.2,
        rating: 4.8,
        owner: "Arun Kumar",
        icon: "🚜",
        description: "Reliable tractor suitable for ploughing, cultivation and general farm work."
    },
    {
        id: 2,
        name: "John Deere Harvester",
        type: "Harvester",
        price: 3000,
        location: "Sirkali",
        distance: 8.4,
        rating: 4.9,
        owner: "Ravi Farms",
        icon: "🌾",
        description: "High-performance harvester suitable for large-scale paddy harvesting."
    },
    {
        id: 3,
        name: "Power Tiller Cultivator",
        type: "Cultivator",
        price: 900,
        location: "Kuthalam",
        distance: 5.7,
        rating: 4.6,
        owner: "Selvam",
        icon: "⚙️",
        description: "Compact power tiller for soil preparation and cultivation."
    },
    {
        id: 4,
        name: "Battery Agricultural Sprayer",
        type: "Sprayer",
        price: 600,
        location: "Mayiladuthurai",
        distance: 2.1,
        rating: 4.5,
        owner: "Priya Agriculture",
        icon: "💧",
        description: "Battery-powered agricultural sprayer for efficient crop spraying."
    },
    {
        id: 5,
        name: "Diesel Water Pump",
        type: "Pump",
        price: 750,
        location: "Poompuhar",
        distance: 11.2,
        rating: 4.4,
        owner: "Murugan",
        icon: "💦",
        description: "Diesel water pump suitable for irrigation and water transfer."
    },
    {
        id: 6,
        name: "Sonalika DI Tractor",
        type: "Tractor",
        price: 1800,
        location: "Tharangambadi",
        distance: 14.5,
        rating: 4.7,
        owner: "Kannan Farms",
        icon: "🚜",
        description: "Powerful tractor suitable for field preparation and transportation."
    },
    {
        id: 7,
        name: "Mini Paddy Harvester",
        type: "Harvester",
        price: 2400,
        location: "Nagapattinam",
        distance: 18.1,
        rating: 4.8,
        owner: "Green Fields",
        icon: "🌾",
        description: "Mini harvester designed for efficient paddy harvesting."
    },
    {
        id: 8,
        name: "Rotary Cultivator",
        type: "Cultivator",
        price: 1100,
        location: "Mayiladuthurai",
        distance: 4.5,
        rating: 4.6,
        owner: "Vijay",
        icon: "⚙️",
        description: "Rotary cultivator for preparing soil quickly and efficiently."
    }
];

let myEquipment = [
    {
        id: 101,
        name: "Swaraj 744 FE Tractor",
        type: "Tractor",
        price: 1700,
        location: "Mayiladuthurai",
        distance: 0,
        rating: 4.7,
        owner: "Lathika A",
        icon: "🚜",
        description: "My tractor available for nearby farmers."
    },
    {
        id: 102,
        name: "Agricultural Sprayer",
        type: "Sprayer",
        price: 650,
        location: "Mayiladuthurai",
        distance: 0,
        rating: 4.6,
        owner: "Lathika A",
        icon: "💧",
        description: "Agricultural sprayer available for rental."
    }
];

let bookings = [
    {
        id: 1,
        equipment: "Mahindra 575 DI Tractor",
        owner: "Arun Kumar",
        date: "15 Sep 2026",
        duration: "2 days",
        amount: 3000,
        status: "Confirmed"
    },
    {
        id: 2,
        equipment: "Power Tiller Cultivator",
        owner: "Selvam",
        date: "20 Sep 2026",
        duration: "1 day",
        amount: 900,
        status: "Pending"
    },
    {
        id: 3,
        equipment: "Battery Agricultural Sprayer",
        owner: "Priya Agriculture",
        date: "02 Aug 2026",
        duration: "2 days",
        amount: 1200,
        status: "Completed"
    }
];

// -------------------- NAVIGATION --------------------

function navigate(pageName) {

    // Hide every page
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Update sidebar
    const navItems = document.querySelectorAll("[data-page]");

    navItems.forEach(function(item) {
        item.classList.remove("active");

        if (item.getAttribute("data-page") === pageName) {
            item.classList.add("active");
        }
    });

    // Page-specific rendering
    if (pageName === "equipment") {
        renderEquipment(equipment);
    }

    if (pageName === "bookings") {
        renderBookings();
    }

    if (pageName === "my-equipment") {
        renderMyEquipment();
    }

    if (pageName === "recommendations") {
        renderRecommendations();
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Make navigation available to HTML onclick attributes
window.navigate = navigate;


// -------------------- SIDEBAR --------------------

function toggleSidebar() {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

window.toggleSidebar = toggleSidebar;


// -------------------- EQUIPMENT CARD --------------------

function createEquipmentCard(item) {

    return `
        <div class="equipment-card">

            <div class="equipment-image">
                <span>${item.icon}</span>

                <span class="rating">
                    ⭐ ${item.rating}
                </span>
            </div>

            <div class="equipment-content">

                <h3>${item.name}</h3>

                <p class="equipment-type">
                    ${item.type}
                </p>

                <p class="equipment-location">
                    📍 ${item.location} • ${item.distance} km away
                </p>

                <div class="equipment-bottom">

                    <div>
                        <strong>₹${item.price}</strong>
                        <small>/day</small>
                    </div>

                    <button
                        class="btn btn-primary"
                        onclick="openEquipment(${item.id})">
                        View
                    </button>

                </div>

            </div>

        </div>
    `;
}


// -------------------- RENDER EQUIPMENT --------------------

function renderEquipment(data) {

    const grid = document.getElementById("equipmentGrid");

    if (!grid) {
        return;
    }

    if (!data || data.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No equipment found</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = data.map(createEquipmentCard).join("");
}


// -------------------- DASHBOARD EQUIPMENT --------------------

function renderDashboardEquipment() {

    const grid = document.getElementById("dashboardEquipment");

    if (!grid) {
        return;
    }

    const latest = equipment.slice(0, 4);

    grid.innerHTML = latest.map(createEquipmentCard).join("");
}


// -------------------- SEARCH & FILTER --------------------

function filterEquipment() {

    const searchInput = document.getElementById("equipmentSearch");
    const typeFilter = document.getElementById("typeFilter");
    const priceFilter = document.getElementById("priceFilter");
    const distanceFilter = document.getElementById("distanceFilter");

    const search = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    const type = typeFilter
        ? typeFilter.value
        : "";

    const price = priceFilter
        ? priceFilter.value
        : "";

    const distance = distanceFilter
        ? distanceFilter.value
        : "";

    let filtered = equipment.filter(function(item) {

        const matchesSearch =
            item.name.toLowerCase().includes(search) ||
            item.type.toLowerCase().includes(search) ||
            item.location.toLowerCase().includes(search);

        const matchesType =
            !type || item.type === type;

        let matchesPrice = true;

        if (price === "1000") {
            matchesPrice = item.price <= 1000;
        }

        if (price === "2000") {
            matchesPrice = item.price > 1000 && item.price <= 2000;
        }

        if (price === "3000") {
            matchesPrice = item.price > 2000;
        }

        let matchesDistance = true;

        if (distance === "5") {
            matchesDistance = item.distance <= 5;
        }

        if (distance === "10") {
            matchesDistance = item.distance <= 10;
        }

        if (distance === "20") {
            matchesDistance = item.distance <= 20;
        }

        return (
            matchesSearch &&
            matchesType &&
            matchesPrice &&
            matchesDistance
        );
    });

    renderEquipment(filtered);
}

window.filterEquipment = filterEquipment;


// -------------------- SORT --------------------

function sortEquipment() {

    const sortElement = document.getElementById("sortEquipment");

    if (!sortElement) {
        return;
    }

    const value = sortElement.value;

    let sorted = [...equipment];

    if (value === "price-low") {
        sorted.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (value === "price-high") {
        sorted.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    if (value === "distance") {
        sorted.sort(function(a, b) {
            return a.distance - b.distance;
        });
    }

    if (value === "rating") {
        sorted.sort(function(a, b) {
            return b.rating - a.rating;
        });
    }

    renderEquipment(sorted);
}

window.sortEquipment = sortEquipment;


// -------------------- EQUIPMENT DETAILS --------------------

function openEquipment(id) {

    const item = equipment.find(function(equipmentItem) {
        return equipmentItem.id === id;
    });

    if (!item) {
        return;
    }

    const modal = document.getElementById("equipmentModal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) {
        return;
    }

    modalContent.innerHTML = `
        <div class="modal-equipment">

            <div class="modal-icon">
                ${item.icon}
            </div>

            <h2>${item.name}</h2>

            <p class="equipment-type">
                ${item.type}
            </p>

            <div class="modal-details">

                <p>
                    <strong>Owner:</strong>
                    ${item.owner}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    <strong>Distance:</strong>
                    ${item.distance} km
                </p>

                <p>
                    <strong>Rating:</strong>
                    ⭐ ${item.rating}
                </p>

                <p>
                    <strong>Rental Price:</strong>
                    ₹${item.price}/day
                </p>

                <p>
                    <strong>Description:</strong>
                    ${item.description}
                </p>

            </div>

            <button
                class="btn btn-primary"
                onclick="requestRental(${item.id})">
                Request Rental
            </button>

        </div>
    `;

    modal.classList.add("show");
}

window.openEquipment = openEquipment;


// -------------------- CLOSE MODAL --------------------

function closeModal() {

    const modal = document.getElementById("equipmentModal");

    if (modal) {
        modal.classList.remove("show");
    }
}

window.closeModal = closeModal;


// -------------------- RENTAL REQUEST --------------------

function requestRental(id) {

    const item = equipment.find(function(equipmentItem) {
        return equipmentItem.id === id;
    });

    if (!item) {
        return;
    }

    const newBooking = {
        id: Date.now(),
        equipment: item.name,
        owner: item.owner,
        date: "Pending confirmation",
        duration: "1 day",
        amount: item.price,
        status: "Pending"
    };

    bookings.unshift(newBooking);

    saveData();

    closeModal();

    updateBookingCount();

    showToast(
        "Rental request sent to " + item.owner + "!"
    );

    setTimeout(function() {
        navigate("bookings");
    }, 700);
}

window.requestRental = requestRental;


// -------------------- BOOKINGS --------------------

function renderBookings() {

    const list = document.getElementById("bookingList");

    if (!list) {
        return;
    }

    if (bookings.length === 0) {

        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📅</div>
                <h3>No bookings yet</h3>
                <p>Find equipment and request a rental.</p>
            </div>
        `;

        return;
    }

    list.innerHTML = bookings.map(function(booking) {

        const statusClass =
            booking.status.toLowerCase();

        return `
            <div class="booking-card">

                <div class="booking-icon">
                    🚜
                </div>

                <div class="booking-info">

                    <h3>${booking.equipment}</h3>

                    <p>
                        Owner: ${booking.owner}
                    </p>

                    <p>
                        📅 ${booking.date}
                        &nbsp; • &nbsp;
                        ${booking.duration}
                    </p>

                </div>

                <div class="booking-price">
                    <strong>₹${booking.amount}</strong>
                </div>

                <span class="status ${statusClass}">
                    ${booking.status}
                </span>

            </div>
        `;

    }).join("");
}


// -------------------- MY EQUIPMENT --------------------

function renderMyEquipment() {

    const grid = document.getElementById("myEquipmentGrid");

    if (!grid) {
        return;
    }

    if (myEquipment.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🚜</div>
                <h3>No equipment listed</h3>
                <p>Add your equipment to start earning.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML =
        myEquipment.map(createEquipmentCard).join("");
}


// -------------------- LIST EQUIPMENT FORM --------------------

function setupEquipmentForm() {

    const form = document.getElementById("equipmentForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("equipmentName").value.trim();

        const type =
            document.getElementById("equipmentType").value;

        const price =
            Number(document.getElementById("equipmentPrice").value);

        const location =
            document.getElementById("equipmentLocation").value.trim();

        const description =
            document.getElementById("equipmentDescription").value.trim();

        if (!name || !type || !price || !location) {

            showToast("Please fill all required fields.");

            return;
        }

        let icon = "🚜";

        if (type === "Harvester") {
            icon = "🌾";
        }

        if (type === "Sprayer") {
            icon = "💧";
        }

        if (type === "Pump") {
            icon = "💦";
        }

        if (type === "Cultivator") {
            icon = "⚙️";
        }

        const newItem = {
            id: Date.now(),
            name: name,
            type: type,
            price: price,
            location: location,
            distance: 0,
            rating: 5.0,
            owner: "Lathika A",
            icon: icon,
            description: description || "Equipment available for rental."
        };

        myEquipment.unshift(newItem);

        // Also add it to marketplace
        equipment.unshift({
            ...newItem,
            distance: 0
        });

        saveData();

        updateEquipmentCount();

        form.reset();

        showToast(
            "Equipment listed successfully!"
        );

        setTimeout(function() {
            navigate("my-equipment");
        }, 700);
    });
}


// -------------------- AI RECOMMENDATIONS --------------------

function renderRecommendations() {

    const grid =
        document.getElementById("recommendationGrid");

    if (!grid) {
        return;
    }

    const recommendations = [...equipment]
        .sort(function(a, b) {

            const scoreA =
                (a.rating * 2) -
                (a.distance * 0.1) -
                (a.price * 0.0002);

            const scoreB =
                (b.rating * 2) -
                (b.distance * 0.1) -
                (b.price * 0.0002);

            return scoreB - scoreA;
        })
        .slice(0, 4);

    grid.innerHTML =
        recommendations.map(createEquipmentCard).join("");
}


// -------------------- NOTIFICATIONS --------------------

function markNotificationsRead() {

    const badge =
        document.querySelector(".notification-badge");

    if (badge) {
        badge.style.display = "none";
    }

    showToast("Notifications marked as read.");
}

window.markNotificationsRead =
    markNotificationsRead;


// -------------------- TOAST --------------------

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    if (!toast || !toastMessage) {
        alert(message);
        return;
    }

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

window.showToast = showToast;


// -------------------- LOCAL STORAGE --------------------

function saveData() {

    try {

        localStorage.setItem(
            "agriShareBookings",
            JSON.stringify(bookings)
        );

        localStorage.setItem(
            "agriShareMyEquipment",
            JSON.stringify(myEquipment)
        );

        localStorage.setItem(
            "agriShareEquipment",
            JSON.stringify(equipment)
        );

    } catch (error) {

        console.log(
            "Could not save data:",
            error
        );
    }
}


function loadData() {

    try {

        const savedBookings =
            localStorage.getItem(
                "agriShareBookings"
            );

        const savedMyEquipment =
            localStorage.getItem(
                "agriShareMyEquipment"
            );

        const savedEquipment =
            localStorage.getItem(
                "agriShareEquipment"
            );

        if (savedBookings) {
            bookings =
                JSON.parse(savedBookings);
        }

        if (savedMyEquipment) {
            myEquipment =
                JSON.parse(savedMyEquipment);
        }

        if (savedEquipment) {
            equipment =
                JSON.parse(savedEquipment);
        }

    } catch (error) {

        console.log(
            "Could not load saved data:",
            error
        );
    }
}


// -------------------- COUNTERS --------------------

function updateBookingCount() {

    const elements =
        document.querySelectorAll(
            ".booking-count"
        );

    elements.forEach(function(element) {
        element.textContent = bookings.length;
    });
}


function updateEquipmentCount() {

    const elements =
        document.querySelectorAll(
            ".equipment-count"
        );

    elements.forEach(function(element) {
        element.textContent =
            equipment.length;
    });
}


// -------------------- MODAL CLICK --------------------

function setupModal() {

    const modal =
        document.getElementById("equipmentModal");

    if (!modal) {
        return;
    }

    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {
                closeModal();
            }

        }
    );
}


// -------------------- NAVIGATION BUTTONS --------------------

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            "[data-page]"
        );

    navItems.forEach(function(item) {

        item.addEventListener(
            "click",
            function() {

                const page =
                    item.getAttribute(
                        "data-page"
                    );

                if (page) {
                    navigate(page);
                }

            }
        );

    });
}


// -------------------- INITIALIZATION --------------------

function init() {

    loadData();

    setupNavigation();

    setupEquipmentForm();

    setupModal();

    renderDashboardEquipment();

    renderEquipment(equipment);

    renderBookings();

    renderMyEquipment();

    renderRecommendations();

    updateBookingCount();

    updateEquipmentCount();

    console.log(
        "AgriShare loaded successfully!"
    );
}


// Start application
document.addEventListener(
    "DOMContentLoaded",
    init
);