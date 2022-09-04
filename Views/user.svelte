<script>
  import Link from "./partial/scr.svelte";
  export let user;
  export let header;
  const props = { user };
</script>

<svelte:head>
  <title>{header}</title>
</svelte:head>
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
