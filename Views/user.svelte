<script>
  import Adduser from "./adduser.svelte";

  export let header;
  export let user;
</script>

<h1>{header}</h1>
<a href="/user/add">
  <button>tambah data</button>
</a>

<table cellspacing="0">
  <th>Nama</th>
  <th>Gender</th>
  <th>Aksi</th>
  {#each user as d}
    <tr>
      <td>{d.name}</td>
      <td>{d.gender}</td>
      <td>
        <a href="/user/edit/{d.userID}">
          <button>edit data</button>
        </a>
        <a href="/user/hapus/{d.userID}">
          <button>hapus data</button>
        </a>
      </td>
    </tr>
  {/each}
</table>

<style>
  table,
  td,
  th {
    border: 1px solid black;
  }
  table {
    margin-top: 12px;
    text-align: center;
  }
  td,
  th {
    padding: 10px;
  }
  button {
    padding: 5px;
    background-color: blueviolet;
    color: white;
  }
</style>
