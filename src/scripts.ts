interface Specifications {
    size: string;
    pages: number;
    cover_type: string;
    year_published: number;
    distributor: string;
    publisher: string;
}

interface Book {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    author: string;
    specifications: Specifications;
    img_detail: Record<number, string>;
    diff: string;
}
let hotBooks: Book[] = [];
let books: Book[] = []

async function Books() {
    try {
        const response = await fetch('/src/db/book.json');
        const data = await response.json();
        books = data.books;
        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function fetchBooks() {
    try {
        const response = await fetch('/src/db/book.json');
        const data = await response.json();
        books = data.books;
        const specialBooks = books.filter(book => book.diff === "special");
        hotBooks = books.filter(book => book.diff === "hot");
        displayHotBook(hotBooks);
        displaySpecialBooks(specialBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}


function shortenTitle(title: string, maxLength = 30) {
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    }
    return title;
}

function displaySpecialBooks(books: Book[]) {
    const bookListElement = document.querySelector('.category-product');

    books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'vertical');

        bookItem.innerHTML = `
        <div class="position-relative">
          <span class="discount">20%</span>
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div>
          <div>
            <h6>${shortenTitle(book.title)}</h6>
            <span class="author">${book.author}</span>
          </div>
          <p class="mt-3">
            <span class="price">${book.price.toLocaleString()} đ</span>
            <span class="old-price">289,000 đ</span>
          </p>
        </div>
      `;


        if (bookListElement) {
            bookListElement.appendChild(bookItem);
        }
    });
}

let currentPage = 1;
const itemsPerPage = 6;

function displayHotBook(books: Book[]) {
    const bookListElement = document.querySelector('.product-hot');
    const totalPages = Math.ceil(books.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Lấy danh sách sách cần hiển thị cho trang hiện tại
    const booksToDisplay = books.slice(startIndex, endIndex);

    // Xóa nội dung hiện tại
    if (bookListElement) {
        bookListElement.innerHTML = ''; // Xóa danh sách sản phẩm trước đó
    }

    // Hiển thị sách cho trang hiện tại
    booksToDisplay.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('col-4', 'p-3', 'mb-3', 'align-items-center');
        bookItem.innerHTML = `
            <div class="book-item horizontal">
                <a class="text-decoration-none text-black" href="productDetail.html?id=${book.id}">
                    <div class="position-relative">
                        <img src="${book.image}" alt="${book.title}">
                    </div>
                    <div>
                        <h6>${shortenTitle(book.title)}</h6>
                        <span class="author">${book.author}</span>
                    </div>
                    <p class="mt-3">
                        <span class="price">${book.price.toLocaleString()} đ</span>
                        <span class="old-price">${book.price.toLocaleString()}đ</span>
                    </p>
                </a>
            </div>
        `;
        if (bookListElement) {
            bookListElement.appendChild(bookItem);
        }
    });

    // Hiển thị các nút phân trang
    displayPagination(totalPages);
}

function displayPagination(totalPages: number) {
    const paginationElement = document.querySelector('.pagination'); // Tìm phần tử phân trang
    if (paginationElement) {
        paginationElement.innerHTML = ''; // Xóa phân trang trước đó

        // Nút Previous
        const prevButton = document.createElement('li');
        prevButton.classList.add('page-item');
        prevButton.innerHTML = `
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayHotBook(hotBooks);
            }
        });
        paginationElement.appendChild(prevButton);

        // Nút trang
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('li');
            pageButton.classList.add('page-item');
            pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i; // Cập nhật trang hiện tại
                displayHotBook(hotBooks); // Gọi lại hàm để hiển thị lại sách
            });
            paginationElement.appendChild(pageButton);
        }

        // Nút Next
        const nextButton = document.createElement('li');
        nextButton.classList.add('page-item');
        nextButton.innerHTML = `
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayHotBook(hotBooks);
            }
        });
        paginationElement.appendChild(nextButton);
    }
}

function getBookIdFromUrl(): number | null {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id)
    return id ? parseInt(id) : null;
}

// Hiển thị thông tin sách
async function displayBookDetail(bookId: number) {
    const books = await Books();
    if (!books) {
        console.error("Books not found!");
        return;
    }
    const book = books.filter(b => b.id === bookId)[0]
    if (book) {
        // Hiển thị hình ảnh chính
        const imgPro = document.querySelector('.imgPro img') as HTMLImageElement;
        if (imgPro) {
            imgPro.src = book.image;
            imgPro.alt = book.title;
        }

        // Hiển thị các hình ảnh chi tiết khác
        const imgDetail = document.querySelector('.imgDetail') as HTMLElement;
        if (imgDetail) {
            imgDetail.innerHTML = ''; // Xóa tất cả hình ảnh cũ
        }

        Object.keys(book.img_detail).forEach((key) => {
            const imgSrc = book.img_detail[parseInt(key, 10)]; // Truy cập hình ảnh
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = book.title;
            img.width = 100;
            img.height = 110;

            // Tạo thẻ chứa hình ảnh
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('border', 'p-2', 'text-center', 'me-3', 'rounded-4'); // Để không tạo lớp 'imgDetail' ở đây
            imgWrapper.style.width = '120px';

            const link = document.createElement('a');
            link.href = ''; // Liên kết có thể dẫn tới đâu đó

            link.appendChild(img);
            imgWrapper.appendChild(link);

            imgDetail.appendChild(imgWrapper); // Thêm hình ảnh vào DOM
        });


        // Hiển thị tiêu đề sách
        const titleDetail = document.querySelector('.title-detail') as HTMLElement;
        if (titleDetail) {
            titleDetail.textContent = book.title;
        }

        // Hiển thị tác giả
        const authorDetail = document.querySelector('.author') as HTMLElement;
        if (authorDetail) {
            authorDetail.textContent = `${book.author}`;
        }

        // Hiển thị giá
        const priceElement = document.querySelector('.price') as HTMLElement;
        const oldPriceElement = document.querySelector('.old-price') as HTMLElement;
        if (priceElement && oldPriceElement) {
            priceElement.textContent = `${book.price.toLocaleString()} đ`;
            oldPriceElement.textContent = `${book.price.toLocaleString()} đ`;
        }

        // Hiển thị mô tả
        const descriptionElement = document.querySelector('.description') as HTMLElement;
        if (descriptionElement) {
            descriptionElement.textContent = book.description;
        }
        
        const tableContainer = document.getElementById('specification-table');
        if (tableContainer) {
            // Tạo bảng
            const table = document.createElement('table');
            table.className = 'table table-striped mt-4 border p-3 border-top-0';
            table.style.borderCollapse = 'separate';
            table.style.borderSpacing = '0 10px';
            table.style.maxWidth = '500px';

            // Tạo tiêu đề bảng
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.className = 'table-primary';

            const headerCell = document.createElement('th');
            headerCell.colSpan = 2;
            headerCell.className = 'text-center text-uppercase';
            headerCell.style.fontSize = '18px';
            headerCell.style.padding = '12px';
            headerCell.textContent = 'Thông số kỹ thuật';

            headerRow.appendChild(headerCell);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Tạo thân bảng
            const tbody = document.createElement('tbody');

            const keys = Object.keys(book.specifications) as Array<keyof Specifications>;

            keys.forEach((key, index) => {
                const value = book.specifications[key];
                const row = document.createElement('tr');
                if (index % 2 === 0) {
                    row.style.backgroundColor = '#f9f9f9'; // Hàng lẻ
                }
            
                const th = document.createElement('th');
                th.scope = 'row';
                th.className = 'text-start';
                th.style.padding = '15px';
                th.style.fontWeight = '600';
                th.style.color = '#4a4a4a';
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '); // Đổi gạch dưới thành khoảng trắng
            
                const td = document.createElement('td');
                td.className = 'text-start';
                td.style.padding = '15px';
                td.style.color = '#707070';
                td.textContent = value.toString(); // Chuyển đổi giá trị thành chuỗi
            
                row.appendChild(th);
                row.appendChild(td);
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            console.log(tableContainer)
        }
    } else {
        console.error('Không tìm thấy sách với ID:', bookId);
    }
}

// Khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    const bookId = getBookIdFromUrl();
    if (bookId !== null) {
        displayBookDetail(bookId);
    } else {
        console.error('Không có ID sách trong URL');
    }
});

fetchBooks();
