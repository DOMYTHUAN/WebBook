var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var hotBooks = [];
var books = [];
function Books() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/src/db/book.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    books = data.books;
                    return [2 /*return*/, books];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching books:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, specialBooks, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/src/db/book.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    books = data.books;
                    specialBooks = books.filter(function (book) { return book.diff === "special"; });
                    hotBooks = books.filter(function (book) { return book.diff === "hot"; });
                    displayHotBook(hotBooks);
                    displaySpecialBooks(specialBooks);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error fetching books:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function shortenTitle(title, maxLength) {
    if (maxLength === void 0) { maxLength = 30; }
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    }
    return title;
}
function displaySpecialBooks(books) {
    var bookListElement = document.querySelector('.category-product');
    books.forEach(function (book) {
        var bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'vertical');
        bookItem.innerHTML = "\n        <div class=\"position-relative\">\n          <span class=\"discount\">20%</span>\n          <img src=\"".concat(book.image, "\" alt=\"").concat(book.title, "\">\n        </div>\n        <div>\n          <div>\n            <h6>").concat(shortenTitle(book.title), "</h6>\n            <span class=\"author\">").concat(book.author, "</span>\n          </div>\n          <p class=\"mt-3\">\n            <span class=\"price\">").concat(book.price.toLocaleString(), " \u0111</span>\n            <span class=\"old-price\">289,000 \u0111</span>\n          </p>\n        </div>\n      ");
        if (bookListElement) {
            bookListElement.appendChild(bookItem);
        }
    });
}
var currentPage = 1;
var itemsPerPage = 6;
function displayHotBook(books) {
    var bookListElement = document.querySelector('.product-hot');
    var totalPages = Math.ceil(books.length / itemsPerPage);
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    // Lấy danh sách sách cần hiển thị cho trang hiện tại
    var booksToDisplay = books.slice(startIndex, endIndex);
    // Xóa nội dung hiện tại
    if (bookListElement) {
        bookListElement.innerHTML = ''; // Xóa danh sách sản phẩm trước đó
    }
    // Hiển thị sách cho trang hiện tại
    booksToDisplay.forEach(function (book) {
        var bookItem = document.createElement('div');
        bookItem.classList.add('col-4', 'p-3', 'mb-3', 'align-items-center');
        bookItem.innerHTML = "\n            <div class=\"book-item horizontal\">\n                <a class=\"text-decoration-none text-black\" href=\"productDetail.html?id=".concat(book.id, "\">\n                    <div class=\"position-relative\">\n                        <img src=\"").concat(book.image, "\" alt=\"").concat(book.title, "\">\n                    </div>\n                    <div>\n                        <h6>").concat(shortenTitle(book.title), "</h6>\n                        <span class=\"author\">").concat(book.author, "</span>\n                    </div>\n                    <p class=\"mt-3\">\n                        <span class=\"price\">").concat(book.price.toLocaleString(), " \u0111</span>\n                        <span class=\"old-price\">").concat(book.price.toLocaleString(), "\u0111</span>\n                    </p>\n                </a>\n            </div>\n        ");
        if (bookListElement) {
            bookListElement.appendChild(bookItem);
        }
    });
    // Hiển thị các nút phân trang
    displayPagination(totalPages);
}
function displayPagination(totalPages) {
    var paginationElement = document.querySelector('.pagination'); // Tìm phần tử phân trang
    if (paginationElement) {
        paginationElement.innerHTML = ''; // Xóa phân trang trước đó
        // Nút Previous
        var prevButton = document.createElement('li');
        prevButton.classList.add('page-item');
        prevButton.innerHTML = "\n            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n            </a>\n        ";
        prevButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayHotBook(hotBooks);
            }
        });
        paginationElement.appendChild(prevButton);
        var _loop_1 = function (i) {
            var pageButton = document.createElement('li');
            pageButton.classList.add('page-item');
            pageButton.innerHTML = "<a class=\"page-link\" href=\"#\">".concat(i, "</a>");
            pageButton.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage = i; // Cập nhật trang hiện tại
                displayHotBook(hotBooks); // Gọi lại hàm để hiển thị lại sách
            });
            paginationElement.appendChild(pageButton);
        };
        // Nút trang
        for (var i = 1; i <= totalPages; i++) {
            _loop_1(i);
        }
        // Nút Next
        var nextButton = document.createElement('li');
        nextButton.classList.add('page-item');
        nextButton.innerHTML = "\n            <a class=\"page-link\" href=\"#\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n            </a>\n        ";
        nextButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayHotBook(hotBooks);
            }
        });
        paginationElement.appendChild(nextButton);
    }
}
function getBookIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    console.log(id);
    return id ? parseInt(id) : null;
}
// Hiển thị thông tin sách
function displayBookDetail(bookId) {
    return __awaiter(this, void 0, void 0, function () {
        var books, book, imgPro, imgDetail_1, titleDetail, authorDetail, priceElement, oldPriceElement, descriptionElement, tableContainer, table, thead, headerRow, headerCell, tbody_1, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Books()];
                case 1:
                    books = _a.sent();
                    if (!books) {
                        console.error("Books not found!");
                        return [2 /*return*/];
                    }
                    book = books.filter(function (b) { return b.id === bookId; })[0];
                    if (book) {
                        imgPro = document.querySelector('.imgPro img');
                        if (imgPro) {
                            imgPro.src = book.image;
                            imgPro.alt = book.title;
                        }
                        imgDetail_1 = document.querySelector('.imgDetail');
                        if (imgDetail_1) {
                            imgDetail_1.innerHTML = ''; // Xóa tất cả hình ảnh cũ
                        }
                        Object.keys(book.img_detail).forEach(function (key) {
                            var imgSrc = book.img_detail[parseInt(key, 10)]; // Truy cập hình ảnh
                            var img = document.createElement('img');
                            img.src = imgSrc;
                            img.alt = book.title;
                            img.width = 100;
                            img.height = 110;
                            // Tạo thẻ chứa hình ảnh
                            var imgWrapper = document.createElement('div');
                            imgWrapper.classList.add('border', 'p-2', 'text-center', 'me-3', 'rounded-4'); // Để không tạo lớp 'imgDetail' ở đây
                            imgWrapper.style.width = '120px';
                            var link = document.createElement('a');
                            link.href = ''; // Liên kết có thể dẫn tới đâu đó
                            link.appendChild(img);
                            imgWrapper.appendChild(link);
                            imgDetail_1.appendChild(imgWrapper); // Thêm hình ảnh vào DOM
                        });
                        titleDetail = document.querySelector('.title-detail');
                        if (titleDetail) {
                            titleDetail.textContent = book.title;
                        }
                        authorDetail = document.querySelector('.author');
                        if (authorDetail) {
                            authorDetail.textContent = "".concat(book.author);
                        }
                        priceElement = document.querySelector('.price');
                        oldPriceElement = document.querySelector('.old-price');
                        if (priceElement && oldPriceElement) {
                            priceElement.textContent = "".concat(book.price.toLocaleString(), " \u0111");
                            oldPriceElement.textContent = "".concat(book.price.toLocaleString(), " \u0111");
                        }
                        descriptionElement = document.querySelector('.description');
                        if (descriptionElement) {
                            descriptionElement.textContent = book.description;
                        }
                        tableContainer = document.getElementById('specification-table');
                        if (tableContainer) {
                            table = document.createElement('table');
                            table.className = 'table table-striped mt-4 border p-3 border-top-0';
                            table.style.borderCollapse = 'separate';
                            table.style.borderSpacing = '0 10px';
                            table.style.maxWidth = '500px';
                            thead = document.createElement('thead');
                            headerRow = document.createElement('tr');
                            headerRow.className = 'table-primary';
                            headerCell = document.createElement('th');
                            headerCell.colSpan = 2;
                            headerCell.className = 'text-center text-uppercase';
                            headerCell.style.fontSize = '18px';
                            headerCell.style.padding = '12px';
                            headerCell.textContent = 'Thông số kỹ thuật';
                            headerRow.appendChild(headerCell);
                            thead.appendChild(headerRow);
                            table.appendChild(thead);
                            tbody_1 = document.createElement('tbody');
                            keys = Object.keys(book.specifications);
                            keys.forEach(function (key, index) {
                                var value = book.specifications[key];
                                var row = document.createElement('tr');
                                if (index % 2 === 0) {
                                    row.style.backgroundColor = '#f9f9f9'; // Hàng lẻ
                                }
                                var th = document.createElement('th');
                                th.scope = 'row';
                                th.className = 'text-start';
                                th.style.padding = '15px';
                                th.style.fontWeight = '600';
                                th.style.color = '#4a4a4a';
                                th.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '); // Đổi gạch dưới thành khoảng trắng
                                var td = document.createElement('td');
                                td.className = 'text-start';
                                td.style.padding = '15px';
                                td.style.color = '#707070';
                                td.textContent = value.toString(); // Chuyển đổi giá trị thành chuỗi
                                row.appendChild(th);
                                row.appendChild(td);
                                tbody_1.appendChild(row);
                            });
                            table.appendChild(tbody_1);
                            tableContainer.appendChild(table);
                            console.log(tableContainer);
                        }
                    }
                    else {
                        console.error('Không tìm thấy sách với ID:', bookId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    var bookId = getBookIdFromUrl();
    if (bookId !== null) {
        displayBookDetail(bookId);
    }
    else {
        console.error('Không có ID sách trong URL');
    }
});
fetchBooks();
