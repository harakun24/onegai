/** @format */

function rm_row(t, url) {
  del(url, t);
}
function rm_all(url) {
  del(url, null);
}
function del(url, t) {
  const parent = document.querySelector("#tbody");
  Swal.fire({
    title: "Peringatan",
    text: "yakin ingin menghapus data?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Yakin",
    icon: "warning",
    denyButtonText: `Batal`,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, { method: "DELETE" })
        .then((res) => res.text())
        .then((res) => {
          Swal.fire({
            position: "top",
            icon: "success",
            text: "data berhasil dihapus",
            showConfirmButton: false,
            timer: 800,
          });
          parent.innerHTML = res;
        });
    }
  });
}
