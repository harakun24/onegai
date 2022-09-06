<script>
  import In from "./partial/scr.svelte";
  import Header from "./partial/script.svelte";
  export let total;
  export let global;
  let { title } = global;
  const props = { total, title: 11, global };
</script>

<Header {title} />
<h3>{total}</h3>
<hr />
<button onclick="total++">add</button>
<button onclick="total--">sub</button>
<In {props}>
  <script>
    let { total, global, title } = props();
    console.log(JSON.stringify({ global }), title);
    bound(() => {
      return {
        data: total,
        dom: (val) => {
          select("h3").innerText = val;
        },
      };
    });
  </script>
</In>

<style>
</style>
