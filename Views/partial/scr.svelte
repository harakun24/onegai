<script>
  export let props;
  for (const k in props) {
    props[k] = `${props[k]}`
      .split("")
      .map((t) => t.charCodeAt(0) / 1024)
      .reduce((a, b) => `${a}'${b}`);
  }
  // props = JSON.stringify(props);
</script>

<in>
  <secret {...props} />
  <script src="/assets/js/props.js"></script>
  <slot />;
</in>
