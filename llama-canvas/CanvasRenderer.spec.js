import { mount } from '@vue/test-utils';
import CanvasRenderer from '@/components/CanvasRenderer.vue';

jest.mock('@trbn/jsoncanvas', () => {
  return {
    JSONCanvas: jest.fn().mockImplementation(() => {
      return {
        draw: jest.fn()
      };
    })
  };
});

describe('CanvasRenderer', () => {
  it('draws on the canvas when mounted', () => {
    const wrapper = mount(CanvasRenderer);
    const canvas = wrapper.vm.$refs.canvasContainer;
    expect(canvas).toBeDefined();
    expect(JSONCanvas).toHaveBeenCalledWith(canvas);
    expect(JSONCanvas.prototype.draw).toHaveBeenCalled();
  });
});