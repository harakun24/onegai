<script>
  export let props = null;
  const u = {};
  function a0_0x4f0c() {
    const _0x22f263 = [
      "9znGDzr",
      "6924EkIoAx",
      "charCodeAt",
      "27FFxwUG",
      "2647385imIWDH",
      "5100iFcdoD",
      "split",
      "1952LPsGgw",
      "26qwtwgq",
      "reduce",
      "1549048ifCYeT",
      "64805CzMJPh",
      "6692LoWIDO",
      "4752341aRkuoT",
      "256068cOuMaT",
      "40nRgIUe",
    ];
    a0_0x4f0c = function () {
      return _0x22f263;
    };
    return a0_0x4f0c();
  }
  function a0_0xe61c(_0x33964d, _0x185a21) {
    const _0x4f0ccb = a0_0x4f0c();
    return (
      (a0_0xe61c = function (_0xe61c1e, _0x1da06b) {
        _0xe61c1e = _0xe61c1e - 0x118;
        let _0x3a1e31 = _0x4f0ccb[_0xe61c1e];
        return _0x3a1e31;
      }),
      a0_0xe61c(_0x33964d, _0x185a21)
    );
  }
  const a0_0x3ab2c5 = a0_0xe61c;
  (function (_0x3c477e, _0x1dab0c) {
    const _0x5f04c6 = a0_0xe61c,
      _0xbf7694 = _0x3c477e();
    while (!![]) {
      try {
        const _0x22357d =
          (parseInt(_0x5f04c6(0x120)) / 0x1) *
            (-parseInt(_0x5f04c6(0x121)) / 0x2) +
          (parseInt(_0x5f04c6(0x119)) / 0x3) *
            (parseInt(_0x5f04c6(0x127)) / 0x4) +
          -parseInt(_0x5f04c6(0x11d)) / 0x5 +
          (-parseInt(_0x5f04c6(0x11a)) / 0x6) *
            (-parseInt(_0x5f04c6(0x125)) / 0x7) +
          (parseInt(_0x5f04c6(0x123)) / 0x8) *
            (parseInt(_0x5f04c6(0x11c)) / 0x9) +
          (parseInt(_0x5f04c6(0x118)) / 0xa) *
            (parseInt(_0x5f04c6(0x126)) / 0xb) +
          (-parseInt(_0x5f04c6(0x11e)) / 0xc) *
            (parseInt(_0x5f04c6(0x124)) / 0xd);
        if (_0x22357d === _0x1dab0c) break;
        else _0xbf7694["push"](_0xbf7694["shift"]());
      } catch (_0x313004) {
        _0xbf7694["push"](_0xbf7694["shift"]());
      }
    }
  })(a0_0x4f0c, 0xe33fe);
  if (props) {
    for (const p in props)
      u[p] = JSON["stringify"](props[p])
        [a0_0x3ab2c5(0x11f)]("")
        ["map"]((_0x57d0fa) =>
          (_0x57d0fa[a0_0x3ab2c5(0x11b)](0x0) * 0x400)["toString"](0x1e)
        )
        [a0_0x3ab2c5(0x122)](
          (_0x3dcdc9, _0xeb7bc6) => _0x3dcdc9 + "y" + _0xeb7bc6
        );
  }

  // props = JSON.stringify(props);
</script>

<in>
  <secret {...u} />
  <script src="/assets/dist/js/props.js"></script>
  <slot />
</in>
