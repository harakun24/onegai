<script>
  export let total;
  import In from "./partial/scr.svelte";
</script>

<h1>{total}</h1>

<button onclick="add()">tambah</button>
<input type="text" value={total} onkeyup="keyUP(this)" />

<In>
  <secret key={total} />
  <script>
    let t = props("key") - 0;
    function add() {
      t++;
    }
    let temp = t;
    bound(() => {
      if (temp != t) {
        temp = t;
        select("h1").innerHTML = t;
        select("input").value = t;
      }
    });
    function keyUP(tt) {
      t = tt.value;
    }
  </script>
</In>
