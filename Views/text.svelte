<script>
  import In from "./partial/scr.svelte";
  import Header from "./partial/script.svelte";
  export let total;
  const props = { total };
</script>

<Header />
<h3>{total}</h3>
<hr />
<button onclick="total++">add</button>
<button onclick="total--">sub</button>
<In {props}>
  <script>
    let { total } = props();
    bound(() => {
      return { data: total, target: (val) => (select("h3").innerText = val) };
    });
  </script>
</In>

<style>
</style>
