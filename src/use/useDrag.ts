import { ref } from "@vue/composition-api";

type Coordinate = {
  x: number;
  y: number;
};

export default function useDrag() {
  const selector = ref<HTMLElement | null>(null);

  const mouseTimeoutId = ref(-1);
  const isDragging = ref(false);
  const timeStamp = ref(0);
  const startCoordinate = ref<Coordinate>({
    x: 0,
    y: 0
  });

  const start = (e: MouseEvent) => {
    e.stopPropagation();
    if (e.buttons !== 1) return;

    mouseTimeoutId.value = setTimeout(() => {
      isDragging.value = true;
      startCoordinate.value.x = e.clientX;
      startCoordinate.value.y = e.clientY;
    }, 100);

    timeStamp.value = Date.now();

    if (selector.value) {
      selector.value.style.cssText = `
      display:block;
      left:${startCoordinate.value.x}px;
      top:${startCoordinate.value.y}px
      width:0;
      height:0;`;
    }
  };

  const draw = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isDragging.value) return;

    const moveX = Math.abs(e.clientX - startCoordinate.value.x);
    const moveY = Math.abs(e.clientY - startCoordinate.value.y);

    const top =
      e.clientY < startCoordinate.value.y ? e.clientY : startCoordinate.value.y;
    const left =
      e.clientX < startCoordinate.value.x ? e.clientY : startCoordinate.value.x;
  };
}
