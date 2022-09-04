<script>
  export let props = null;
  const u = {};
  if (props) {
    for (const p in props)
      u[p] = JSON.stringify(props[p])
        .split("")
        .map((t) => (t.charCodeAt(0) * 1024).toString(16))
        .reduce((a, b) => `${a}'${b}`);
  }
  // props = JSON.stringify(props);
</script>

<in>
  <secret {...u} />
  <script src="/assets/js/props.js"></script>
  <slot />
</in>
