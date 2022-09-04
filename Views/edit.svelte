<script>
  export let id;
  export let user;
  import Scr from "./partial/scr.svelte";
</script>

{#if true}
  <form action="/user/update/{id}?_method=PUT" method="post">
    <input required type="text" name="name" id="" value={user.name} />
    <select name="gender" id="">
      {#if user.gender == "male"}
        <option value="male" selected>laki-laki</option>
        <option value="female">perempuan</option>
      {:else}
        <option value="male">laki-laki</option>
        <option value="female" selected>perempuan</option>
      {/if}
    </select>
    <input type="submit" value="post" />
  </form>
{:else}
  <h1>id tidak ditemukan</h1>
  <Scr>
    <script>
      setTimeout(() => {
        window.location.href = "/user";
      }, 4000);
    </script>
  </Scr>
{/if}
