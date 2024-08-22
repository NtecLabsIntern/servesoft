<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Items Dashboard</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <div id="app" class="d-flex">
        <!-- Sidebar -->
        <nav class="sidebar bg-dark text-white p-3">
            <div class="sidebar-header">
                <img src="logo.png" alt="Logo" class="img-fluid">
            </div>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Items</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Categories</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Modifiers</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Menu</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Orders</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white">Offers/Coupons</a>
                </li>
            </ul>
        </nav>

        <!-- Main Content -->
        <div class="content flex-grow-1 p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>Items</h1>
                <button class="btn btn-primary">Add New Item</button>
            </div>

            <div class="filters d-flex justify-content-between align-items-center mb-4">
                <input type="text" class="form-control mr-3" placeholder="Search Items">
                <div>
                    <button class="btn btn-outline-secondary">All Categories</button>
                    <button class="btn btn-outline-secondary">Available Items</button>
                    <button class="btn btn-outline-secondary">Popular Items</button>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-4" v-for="item in items">
                    <div class="card">
                        <img :src="item.image" class="card-img-top" alt="Item Image">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}</h5>
                            <p class="card-text">{{ item.description }}</p>
                            <p class="card-text">francs{{ item.price }}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-info">View</button>
                                <button class="btn btn-secondary">Edit</button>
                                <button class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="script.js"></script>
</body>
</html>
