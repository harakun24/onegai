<script>
  import In from "./partial/scr.svelte";
  import Header from "./partial/script.svelte";
  let total = 0;
  const props = { total };
</script>

<Header />
<h3>{total}</h3>
<button onclick="add()">add</button>
<button onclick="sub()">sub</button>
<In {props}>
  <script>
    let { total } = props();
    function add() {
      ++total;
    }
    function sub() {
      --total;
    }
    bound(() => {
      return { data: total, target: (val) => (select("h3").innerText = val) };
    });
  </script>
</In>

<style>
</style>
