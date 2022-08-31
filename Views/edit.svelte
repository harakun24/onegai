<script>
  export let id;
  export let user;
</script>

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
