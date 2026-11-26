import { jest } from "@jest/globals";

import { satoshiRcUiMock } from "@/test/mocks";

/**
 * @description Registra el mock compartido de @satoshi/rc-ui para una suite.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function mockSatoshiRcUi(): void {
  jest.mock("@satoshi/rc-ui", () => satoshiRcUiMock);
}
