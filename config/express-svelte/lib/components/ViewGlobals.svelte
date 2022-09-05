<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let component;
  export let props = {};
  export let global = {};
  export let stores = {};

  /**
   * Create stores for the first level of key-values
   * @param {Object} props
   * @return {Object}
   * @private
   */
  function _createStores(props) {
    const entries = Object.entries(props);
    const output = {};
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      output[key] = writable(value);
    }
    return output;
  }

  setContext("global", global);
  setContext("stores", _createStores(stores));
  props = { ...props, global };
</script>

<svelte:component this={component} {...props} />
