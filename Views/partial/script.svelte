<script>
  import { getContext } from "svelte";
  const { title } = getContext("global");
</script>

<h1>ini header: {title}</h1>
