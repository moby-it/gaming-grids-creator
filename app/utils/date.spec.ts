import { describe, expect, it } from "vitest";

describe('Date utils', () => {
  it('should get correct grid area', () => {
    expect(getGridArea(1, 7, 2024)).toEqual('thu1');
    expect(getGridArea(15, 7, 2024)).toEqual('thu3');
    expect(getGridArea(1, 11, 2024)).toEqual('sun1');
    expect(getGridArea(1, 8, 2024)).toEqual('sun1');
    expect(getGridArea(30, 8, 2024)).toEqual('mon6');
  });
});