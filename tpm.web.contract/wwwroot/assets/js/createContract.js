

function openTab(event, tabName) {
    var i, tabcontent, tablinks;

    // Ẩn tất cả các tabcontent
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Xóa lớp active khỏi tất cả các tablinks
    tablinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Hiển thị tabcontent và đánh dấu tablink được chọn
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
