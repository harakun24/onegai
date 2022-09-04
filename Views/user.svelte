<script>
  import Link from "./partial/scr.svelte";
  export let user;
  const props = { user };
</script>

<a href="/user/add"><button>tambah</button></a>
<table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>gender</th>
    <th>aksi</th>
  </tr>
  {#each user as u}
    <tr>
      <td>{u.userID}</td>
      <td>{u.name}</td>
      <td>{u.gender}</td>
      <td>
        <a href="/user/edit/{u.userID}">
          <button> edit </button>
        </a>
        <a href="/user/hapus/{u.userID}"><button> hapus </button></a>
      </td>
    </tr>
  {:else}
    <tr>
      <td colspan="4">empty</td>
    </tr>
  {/each}
</table>

<Link {props}>
  <script>
  </script>
</Link>

<style>
  table {
    border: 1px solid black;
    padding: 20px;
    margin-top: 3px;
  }
  a {
    text-decoration: none;
  }
  th,
  td {
    padding: 10px;
    border-bottom: 1px solid black;
    margin: 0;
  }
  button {
    padding: 10px;
  }
  *:not(button) {
    font-size: 1.2em;
  }
</style>
