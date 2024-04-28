
	function search() {
			var keyword = document.getElementById("keyword").value.toLowerCase();
	var rows = document.getElementsByClassName("list-contract");
	var found = false;

	for (var i = 0; i < rows.length; i++) {
				var rowData = rows[i].textContent.toLowerCase();
	var rowDataWithoutDiacritics = removeVietnameseDiacritics(rowData);

	if (rowData.includes(keyword) || rowDataWithoutDiacritics.includes(keyword)) {
		rows[i].style.display = "table-row";
	found = true;
				} else {
		rows[i].style.display = "none";
				}
			}

	if (!found) {
		alert("Không tìm thấy kết quả.");
			}
		}

	function removeVietnameseDiacritics(str) {
		str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	return str;
		}