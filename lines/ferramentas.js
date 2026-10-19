const { spring, stepS, disposer, mk, pointer, register } = HL;
const PATHS = ["M 4.7 0.4 C 6.7 0.8 8.6 2.4 9.3 4.3 C 10 6.1 9.5 8 8.2 9.2 C 7.4 9.9 6.2 10.3 5 10.1 C 2.7 9.8 1 8.3 0.5 6.1 M 8.2 9.2 C 11.3 12 14.2 15.2 17.4 18.2 C 18.1 18.9 19.4 20.1 19.8 20.1 C 20.6 20 20.7 19.3 20.2 18.5 C 19.4 17 17.4 15 15.6 13.3 L 9.3 7.5 M 5.5 1.8 L 6.5 4.8 L 4.9 6.1 L 2.3 4.9","M 11.2 13.4 C 9.5 15.9 8.3 17.5 7 19.5 C 6.4 20.4 6.1 21.4 6.7 21.9 C 7.5 22.8 8.6 21.9 9.4 20.8 C 10.4 19.4 11.3 17.5 12 16 M 12.7 10.6 L 14.5 7.5 M 14.4 7.5 C 13.5 6.9 13 6.3 13.2 5.5 L 13.4 4.8 M 13.4 4.8 C 14.6 5.6 16 6.2 17.4 6.8 L 22.8 9.2 M 13.4 4.8 L 13.3 2.4 C 13.3 1.8 13.7 1.1 14.1 0.6 C 14.4 0.3 15 0.4 15.5 0.6 L 18 1.8 C 19.8 2.7 21 3.8 21.5 5.3 C 22.6 5.8 23.5 6.6 24 7.6 M 17.4 6.8 C 16 7.2 15.1 8.1 14.4 9.4 M 13.3 2.4 C 12.8 2.5 12 2.3 12.1 1.9 C 12.2 1.4 12.8 0.5 13.3 0.4"];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let intensity = value;
  const scaled = mk('g', { transform: 'translate(75 50) scale(10)' }, svg);
  const items = PATHS.map((d, i) => {
    const group = mk('g', {}, scaled);
    mk('path', { d, style: 'fill:none;stroke:var(--hl-edge);stroke-width:0.22px;vector-effect:none;stroke-linejoin:round;stroke-linecap:round' }, group);
    const angle = spring(i === 0 ? -3 : 3);
    const offset = spring(i === 0 ? -0.65 : 0.65);
    angle.t = 0; offset.t = 0;
    return { group, angle, offset, center: i === 0 ? [165, 135] : [220, 155] };
  });
  const loop = register(stage, dt => {
    let moving = false;
    for (const item of items) {
      const a = stepS(item.angle, dt), b = stepS(item.offset, dt);
      item.group.setAttribute('transform', 'translate(' + item.offset.x + ' ' + (item.offset.x * 0.45) + ') rotate(' + item.angle.x + ' 12.5 11.5)');
      moving = a || b || moving;
    }
    return moving;
  });
  bag.add(loop.unregister);
  let lastPoint = null;
  function respond(point) {
    lastPoint = point;
    let active = false;
    items.forEach((item, i) => {
      const distance = point ? Math.hypot(point[0] - item.center[0], point[1] - item.center[1]) : Infinity;
      const proximity = Math.max(0, 1 - distance / 155);
      item.angle.t = (i ? 1 : -1) * intensity * proximity;
      active = active || proximity > 0;
    });
    read.textContent = active ? 'ferramentas' : 'rest';
    loop.wake();
  }
  bag.add(pointer(stage, { move: respond, leave: () => respond(null) }));
  bag.add(() => svg.replaceChildren());
  loop.wake();
  return { set: v => { intensity = v; if (lastPoint) respond(lastPoint); }, destroy: bag.dispose };
}

hairline({ name: 'ferramentas', means: 'Duas ferramentas cruzadas respondem suavemente ao cursor.', rules: [1,3,7,8], range: [0.5,1.5,2.5], tour: [[155,120],[240,145],[200,190],null], mount });
