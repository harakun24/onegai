<script>
  import Adduser from "./adduser.svelte";

  export let header;
  export let user;
  let usr = user;

  import W from "./partial/scr.svelte";
</script>

<h1>{header}</h1>
<!-- <a href="/user/add">
  <button>tambah data</button>
</a> -->
<Adduser />
<input type="text" onkeyup="bundle(this)" />
<table cellspacing="0">
  <th>data enkripsi</th>
  <th>Aksi</th>
  {#each usr as d}
    <tr>
      <td>{d}</td>
      <td>
        <a href="/user/edit/{d.userID}">
          <button>lihat data</button>
        </a>
      </td>
    </tr>
  {/each}
</table>
<W {usr}>
  <script>
    function bundle(t) {
      const val = t.value;
      const td = selectAll(".nn");
      console.log(td);
      for (const d of td) {
        const parent = d.parentNode;
        parent.classList.remove("clue");
        const text = d.innerText;
        if (text.indexOf(val) == -1) parent.classList.add("clue");
      }
    }
  </script>
</W>

<style>
  :global(.clue) {
    display: none;
  }
  table,
  td,
  th {
    border: 1px solid black;
  }
  table {
    margin-top: 12px;
    text-align: center;
    width: 40%;
  }
  td,
  th {
    padding: 10px;
  }
  :global(button) {
    padding: 10px;
    background-color: blueviolet;
    color: white;
  }
  :global(input),
  :global(select) {
    padding: 10px;
  }
</style>
