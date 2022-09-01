<script>
  export let user;

  // import W from "./partial/scr.svelte";
</script>

<table cellspacing="0">
  <th>ID</th>
  <th>Nama</th>
  <th>Gender</th>
  <th>Aksi</th>
  {#each user as d}
    <tr>
      <td>usr-{d.userID}</td>
      <td class="nn">{d.name}</td>
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
